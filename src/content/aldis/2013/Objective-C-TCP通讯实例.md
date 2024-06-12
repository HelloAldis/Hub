---
title: Objective-C TCP通讯实例
publishDate:  2013-01-23 00:50:49
image: ~/assets/images/aldis/2013/1.png
category: 编程思想
tags:
  - TCP
  - Objective-C
---

{% codeblock Communicator.h lang:objc%}
#import <Foundation/Foundation.h>  
   
@interface Communicator : NSObject <NSStreamDelegate> {  
    @public  
      
    NSString *host;  
    int port;  
}  
   
- (void)setup;  
- (void)open;  
- (void)close;  
- (void)stream:(NSStream *)stream handleEvent:(NSStreamEvent)event;  
- (void)readIn:(NSString *)s;  
- (void)writeOut:(NSString *)s;  
   
@end
{% endcodeblock %} 

<!-- more -->

{% codeblock Communicator.m lang:objc%}
#import "Communicator.h"  
   
CFReadStreamRef readStream;  
CFWriteStreamRef writeStream;  
   
NSInputStream *inputStream;  
NSOutputStream *outputStream;  
   
@implementation Communicator  
   
- (void)setup {  
    NSURL *url = [NSURL URLWithString:host];  
      
    NSLog(@"Setting up connection to %@ : %i", [url absoluteString], port);  
      
    CFStreamCreatePairWithSocketToHost(kCFAllocatorDefault, (CFStringRef)[url host], port, &readStream, &writeStream);  
      
    if(!CFWriteStreamOpen(writeStream)) {  
        NSLog(@"Error, writeStream not open");  
          
        return;  
    }  
    [self open];   
      
    NSLog(@"Status of outputStream: %i", [outputStream streamStatus]);  
      
    return;  
}  
   
- (void)open {  
    NSLog(@"Opening streams.");  
      
    inputStream = (NSInputStream *)readStream;  
    outputStream = (NSOutputStream *)writeStream;  
      
    [inputStream retain];  
    [outputStream retain];  
      
    [inputStream setDelegate:self];  
    [outputStream setDelegate:self];  
      
    [inputStream scheduleInRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];  
    [outputStream scheduleInRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];  
      
    [inputStream open];  
    [outputStream open];  
}  
   
- (void)close {  
    NSLog(@"Closing streams.");  
      
    [inputStream close];  
    [outputStream close];  
      
    [inputStream removeFromRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];  
    [outputStream removeFromRunLoop:[NSRunLoop currentRunLoop] forMode:NSDefaultRunLoopMode];  
      
    [inputStream setDelegate:nil];  
    [outputStream setDelegate:nil];  
      
    [inputStream release];  
    [outputStream release];  
      
    inputStream = nil;  
    outputStream = nil;  
}  
   
- (void)stream:(NSStream *)stream handleEvent:(NSStreamEvent)event {  
    NSLog(@"Stream triggered.");  
      
    switch(event) {  
        case NSStreamEventHasSpaceAvailable: {  
            if(stream == outputStream) {  
                NSLog(@"outputStream is ready.");   
            }  
            break;  
        }  
        case NSStreamEventHasBytesAvailable: {  
            if(stream == inputStream) {  
                NSLog(@"inputStream is ready.");   
                  
                uint8_t buf[1024];  
                unsigned int len = 0;  
                  
                len = [inputStream read:buf maxLength:1024];  
                  
                if(len > 0) {  
                    NSMutableData* data=[[NSMutableData alloc] initWithLength:0];  
                      
                    [data appendBytes: (const void *)buf length:len];  
                      
                    NSString *s = [[NSString alloc] initWithData:data encoding:NSASCIIStringEncoding];  
                      
                    [self readIn:s];  
                      
                    [data release];  
                }  
            }   
            break;  
        }  
        default: {  
            NSLog(@"Stream is sending an Event: %i", event);  
              
            break;  
        }  
    }  
}  
   
- (void)readIn:(NSString *)s {  
    NSLog(@"Reading in the following:");  
    NSLog(@"%@", s);  
}  
   
- (void)writeOut:(NSString *)s {  
    uint8_t *buf = (uint8_t *)[s UTF8String];  
      
    [outputStream write:buf maxLength:strlen((char *)buf)];  
      
    NSLog(@"Writing out the following:");  
    NSLog(@"%@", s);  
}  
   
@end 
{% endcodeblock %} 

{% codeblock StreamExample.m lang:objc%}
#import <Foundation/Foundation.h>  
   
#import "Communicator.h"  
   
int main (int argc, const char * argv[]) {  
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];  
   
    Communicator *c = [[Communicator alloc] init];  
      
    c->host = @"http://127.0.0.1";  
    c->port = 6789;  
      
    [c setup];  
    [c open];  
      
    [pool drain];  
      
    return 0;  
}  
{% endcodeblock %} 