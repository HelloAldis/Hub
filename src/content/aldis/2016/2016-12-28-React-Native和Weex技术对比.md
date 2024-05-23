---
title: React Native和Weex技术对比
publishDate:  2016-12-28 14:43:06
category: iOS
tags:
  - ReactNative
  - Weex
---

# React Native 和 Weex 技术对比

React Native 和 Weex是比较流行的新一代高体验的跨平台开发框架。这个文档可以仔细分析它们之间的区别，帮助技术人员作出合适的选择。

## 目录
- [React Native 和 Weex 技术对比](#react-native-和-weex-技术对比)
  - [目录](#目录)
  - [基本简介](#基本简介)
  - [社区对比](#社区对比)
  - [内置组件对比](#内置组件对比)
    - [React Native和Weex共有组件](#react-native和weex共有组件)
    - [Weex特有UI组件](#weex特有ui组件)
    - [React Native特有UI组件](#react-native特有ui组件)
  - [Hello world对比](#hello-world对比)
    - [React Native Hello world](#react-native-hello-world)
    - [Weex Hello world](#weex-hello-world)
  - [Javascript bundle对比](#javascript-bundle对比)
    - [React Native bundle](#react-native-bundle)
    - [Weex Hello bundle](#weex-hello-bundle)
  - [总结](#总结)
    - [React Native优势总结](#react-native优势总结)
    - [Weex优势总结](#weex优势总结)

## 基本简介

React Native 和 Weex的基本原理比较相近
* 它们都是产生于在使用hybrid开发应用时，发现开发出来的应用有点不像原生应用像web，和移动端原生应用有一定的用户体验上的差距。这时另辟蹊径，打造一个能渲染出原生UI的高性能可定制的web浏览器。
* 设计思路上都使用Web的思想，用javascript作为开发语言，React Native是用React思想写native应用，Weex是用Vue思想写Native应用
* 原理上都是javascript bundle转成虚拟DOM树，然后用自己的渲染引擎，用原生的UI渲染DOM树
* 都是基于各自的JavaScriptCore来实现native 和 js 通信的

<!-- more -->

## 社区对比

| 对比 | Weex | React Native |
|-----|------|-----|
|  |  |  |
| Github星数 | 10094 | 42026 |
| Fork数 | 1387 | 9616 |
| Release版本数 | 4 | 147 |
| 维护组织 | alibaba | Facebook |
| 中文官方文档 | 有 | 无 |
| Android 支持版本| 4.1 (API 16)+ | 4.1 (API 16)+ |
| iOS 支持版本| iOS 7.0+ | iOS 8.0+ |
| javascript支持度 | ES5 | ES6 |
| 预备知识 | vue.js | react.js |
| 开发人员友好度 | 对前端开发者比较友好 | 对移动开发者比较友好 |
| npm第三方module数 | 90+ | 3000+ |
| 是否支持web调试 | 是 | 是 |
| 调试工具 | 有 | 有 |
| 性能调试工具 | 无 | 有 |
| IDE | 有 | 有 |
| 扩展UI组件 | 可以 | 可以 |
| 扩张功能模块 | 可以 | 可以 |

## 内置组件对比

### React Native和Weex共有组件

| 组件 | Weex | React Native |
|-----|------|-----|
| 普通容器 | div | View |
| 可滚动容器 | scroller | ScrollView |
| 列表容器 | list | ListView |
| 下拉刷新 | refresh | RefreshControl |
| 文本 | text | Text |
| 图片 | image | Image |
| 单行文本输入框 | input | TextInput |
| 多行文本输入框 | textarea | TextInput |
| 切换开关 | switch | Switch |
| web容器 | web | WebView |
| Tabbar | wxc-tabbar | 只支持iOS TabBarIOS，TabBarIOS.Item |
| 导航栏 | wxc-navpage | Navigator， NavigatorIOS |
| 导航控制器 | navigator | Navigator， NavigatorIOS |
| 模态窗 | modal | Modal，Alert，AlertIOS，ToastAndroid |
| picker | picker | Picker，PickerIOS，DatePickerIOS，DatePickerAndroid，TimePickerAndroid |
| 本地存储 | storage | AsyncStorage |
| 动画 | animation | Animated，LayoutAnimation |
| 网络 | stream | fetch |
| 剪贴板 | clipboard | Clipboard |

### Weex特有UI组件
| 组件 | 说明 | 
|-----|------|
| cell | 用于list每一个单元，为了回收利用，提升滑动体验 |
| loading | 用于上拉加载更多 |
| slider | 轮播图组件 |
| indicator | 轮播图的小圆点 |
| video | 视频组件 |
| a | 链接 |
| dom | 对DOM树的一些操作 |
| globalEvent | 全局事件 |

### React Native特有UI组件
| 组件 | 说明 | 
|-----|------|
| ActivityIndicator | 转转转指示器 |
| Button | 按钮 |
| DrawerLayoutAndroid | android 特有的侧边栏 |
| KeyboardAvoidingView | 实用的不被键盘遮挡容器 |
| MapView | 地图 |
| ProgressBarAndroid | android样式的进度条 |
| ProgressViewIOS | iOS样式的进度条 |
| SegmentedControlIOS | iOS特有按钮组 |
| Slider | 滑动调节器，类似音量 |
| SnapshotViewIOS | iOS特有快照view |
| StatusBar | 顶上的状态栏 |
| ToolbarAndroid | android特有的toolbar |
| TouchableHighlight | 触摸有高亮容器 |
| TouchableNativeFeedback | android特有的触摸原生反馈 |
| TouchableOpacity | 触摸有不透明容器 |
| TouchableWithoutFeedback | 一半不会使用的触摸无反馈容器 |
| ViewPagerAndroid | android特有的view pager |
| ActionSheetIOS | iOS独有的ActionSheet |
| AdSupportIOS | iOS独有广告AdSupport支持 |
| AppRegistry | App js注册组件 |
| AppState | App状态的组件 |
| BackAndroid | android特有返回键 |
| CameraRoll | 照相机 |
| Dimensions | 屏大小控制 |
| Easing | 渐进函数 |
| Geolocation | 地理定位 |
| Geolocation | 地理定位 |
| ImageEditor | 图片编辑 |
| ImagePickerIOS | 图片选择 |
| ImageStore | iOS图片存储管理 |
| InteractionManager | 连续执行task管理 |
| Keyboard | 键盘API | 
| Linking | 对deeplink的支持 |
| NativeMethodsMixin | 对原生UI视图属性访问的支持 |
| NetInfo | 网络状态 |
| PanResponder | 手势支持 | 
| PermissionsAndroid | android权限管理 |
| PixelRatio | 像素ratio支持 |
| PushNotificationIOS | iOS的推送通知组件 |
| Share | 分享菜单 | 
| StatusBarIOS | iOS样式顶上状态栏 | 
| StyleSheet | 样式 | 

## Hello world对比
总的来说
* Weex的Web代码要简单易懂些，对web人员比较友好
* Weex要写的原生代码多些，封装程度比起React Native弱些。
* Weex沿用了css写样式，而React Native用StyleSheet来写样式。

### React Native Hello world
web 代码

```javascript
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class TestRn extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Hello World!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('TestRn', () => TestRn);
```

iOS 原生代码

```objective-c
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" 
                                                                  fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"TestRn"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
```
android 原生代码

```java
public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "TestRn";
    }
}

```

<a name="hello_weex"></a>
### Weex Hello world

```html
<template>
    <div>
        <text class="text">{{text}}</text>
    </div>
</template>

<style>
    .text {
        font-size: 50;
    }
</style>

<script>
    module.exports = {
        data: {
            text: 'Hello World.'
        }
    }
</script>
```

iOS 原生代码

```objective-c
[_instance destroyInstance];
    _instance = [[WXSDKInstance alloc] init];
    _instance.viewController = self;
    _instance.frame = CGRectMake(self.view.frame.size.width-width, 0, width, _weexHeight);
    
    __weak typeof(self) weakSelf = self;
    _instance.onCreate = ^(UIView *view) {
        [weakSelf.weexView removeFromSuperview];
        weakSelf.weexView = view;
        [weakSelf.view addSubview:weakSelf.weexView];
        UIAccessibilityPostNotification(UIAccessibilityScreenChangedNotification, weakSelf.weexView);
    };
    _instance.onFailed = ^(NSError *error) {
        #ifdef UITEST
        if ([[error domain] isEqualToString:@"1"]) {
            dispatch_async(dispatch_get_main_queue(), ^{
                NSMutableString *errMsg=[NSMutableString new];
                [errMsg appendFormat:@"ErrorType:%@\n",[error domain]];
                [errMsg appendFormat:@"ErrorCode:%ld\n",(long)[error code]];
                [errMsg appendFormat:@"ErrorInfo:%@\n", [error userInfo]];
                
                UIAlertView *alertView = [[UIAlertView alloc] initWithTitle:@"render failed" message:errMsg delegate:weakSelf cancelButtonTitle:nil otherButtonTitles:@"ok", nil];
                [alertView show];
            });
        }
        #endif
    };
    
    _instance.renderFinish = ^(UIView *view) {
         WXLogDebug(@"%@", @"Render Finish...");
        [weakSelf updateInstanceState:WeexInstanceAppear];
    };
    
    _instance.updateFinish = ^(UIView *view) {
        WXLogDebug(@"%@", @"Update Finish...");
    };
    if (!self.url) {
        WXLogError(@"error: render url is nil");
        return;
    }
    NSURL *URL = [self testURL: [self.url absoluteString]];
    NSString *randomURL = [NSString stringWithFormat:@"%@%@random=%d",URL.absoluteString,URL.query?@"&":@"?",arc4random()];
    [_instance renderWithURL:[NSURL URLWithString:randomURL] options:@{@"bundleUrl":URL.absoluteString} data:nil];
```

android 原生代码

```java
  protected void createWeexInstance() {
    destoryWeexInstance();
    mInstance = new WXSDKInstance(this);
    mInstance.registerRenderListener(this);
  }

  protected void destoryWeexInstance() {
    if (mInstance != null) {
      mInstance.registerRenderListener(null);
      mInstance.destroy();
      mInstance = null;
    }
  }

  protected void renderPageByURL(String url, String jsonInitData) {
    CommonUtils.throwIfNull(mContainer, new RuntimeException("Can't render page, container is null"));
    Map<String, Object> options = new HashMap<>();
    options.put(WXSDKInstance.BUNDLE_URL, url);
    mInstance.renderByUrl(
        getPageName(),
        url,
        options,
        jsonInitData,
        CommonUtils.getDisplayWidth(this),
        CommonUtils.getDisplayHeight(this),
        WXRenderStrategy.APPEND_ASYNC);
  }
```

## Javascript bundle对比
React Native和Weex都不是在移动端的引擎上直接运行写的js代码，而是将写的js代码转换为特定格式的js bundle，包括转换ES6语法位通用语法，转换模块的定义，依赖模块的导入等等


### React Native bundle
React Native使用```react-native bundle```命令可以将整个工程打包到一个js bundle中

```bash
react-native bundle --entry-file ./index.ios.js --platform ios --dev true --bundle-output ./out/main.jsbundle
```

React Native的Hello world的js bundle 竟然有将近70000行代码，实在过于庞大. 经过测试和解读发现React Native将真个框架里的不管用没用到的组件的js代码都打包到bundle里面
这有点夸张。下面我们截取hello world 有关的js代码分析下

```javascript
global.require = _require;
global.__d = define;

var modules = Object.create(null);
if (__DEV__) {
    var verboseNamesToModuleIds = Object.create(null);
}

function define(factory, moduleId, dependencyMap) {
    if (moduleId in modules) {
        return;
    }
    modules[moduleId] = {
        dependencyMap: dependencyMap,
        exports: undefined,
        factory: factory,
        hasError: false,
        isInitialized: false
    };

    if (__DEV__) {
        modules[moduleId].hot = createHotReloadingObject();

        var _verboseName = arguments[3];
        if (_verboseName) {
            modules[moduleId].verboseName = _verboseName;
            verboseNamesToModuleIds[_verboseName] = moduleId;
        }
    }
}

function _require(moduleId) {
    if (__DEV__ && typeof moduleId === 'string') {
        var _verboseName2 = moduleId;
        moduleId = verboseNamesToModuleIds[moduleId];
        if (moduleId == null) {
            throw new Error('Unknown named module: \'' + _verboseName2 + '\'');
        } else {
            console.warn('Requiring module \'' + _verboseName2 + '\' by name is only supported for ' + 'debugging purposes and will BREAK IN PRODUCTION!');
        }
    }

    var moduleIdReallyIsNumber = moduleId;
    var module = modules[moduleIdReallyIsNumber];
    return module && module.isInitialized ? module.exports: guardedLoadModule(moduleIdReallyIsNumber, module);
}

var inGuard = false;
function guardedLoadModule(moduleId, module) {
    if (!inGuard && global.ErrorUtils) {
        inGuard = true;
        var returnValue = void 0;
        try {
            returnValue = loadModuleImplementation(moduleId, module);
        } catch(e) {
            global.ErrorUtils.reportFatalError(e);
        }
        inGuard = false;
        return returnValue;
    } else {
        return loadModuleImplementation(moduleId, module);
    }
}

function loadModuleImplementation(moduleId, module) {
    var nativeRequire = global.nativeRequire;
    if (!module && nativeRequire) {
        nativeRequire(moduleId);
        module = modules[moduleId];
    }

    if (!module) {
        throw unknownModuleError(moduleId);
    }

    if (module.hasError) {
        throw moduleThrewError(moduleId);
    }

    if (__DEV__) {
        var Systrace = _require.Systrace;
    }

    module.isInitialized = true;
    var exports = module.exports = {};
    var _module = module,
    factory = _module.factory,
    dependencyMap = _module.dependencyMap;
    try {
        if (__DEV__) {
            Systrace.beginEvent('JS_require_' + (module.verboseName || moduleId));
        }

        var _moduleObject = {
            exports: exports
        };
        if (__DEV__ && module.hot) {
            _moduleObject.hot = module.hot;
        }

        factory(global, _require, _moduleObject, exports, dependencyMap);

        if (!__DEV__) {
            module.factory = undefined;
        }

        if (__DEV__) {
            Systrace.endEvent();
        }
        return module.exports = _moduleObject.exports;
    } catch(e) {
        module.hasError = true;
        module.isInitialized = false;
        module.exports = undefined;
        throw e;
    }
}

__d(
/* TestRn/index.ios.js */
function(global, require, module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _react = require(12
    /* react */
    );
    var _react2 = babelHelpers.interopRequireDefault(_react);
    var _reactNative = require(42
    /* react-native */
    );
    var TestRn = function(_Component) {
        babelHelpers.inherits(TestRn, _Component);
        function TestRn() {
            babelHelpers.classCallCheck(this, TestRn);
            return babelHelpers.possibleConstructorReturn(this, (TestRn.__proto__ || Object.getPrototypeOf(TestRn)).apply(this, arguments));
        }
        babelHelpers.createClass(TestRn, [{
            key: 'render',
            value: function render() {
                return (_react2.default.createElement(_reactNative.View, {style: styles.container}, 
                _react2.default.createElement(_reactNative.Text, {style: styles.welcome},'Hello World!')));
            }
        }]);
        return TestRn;
    } (_react.Component);

exports.default = TestRn;

    var styles = _reactNative.StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5FCFF'
        },

        welcome: {
            fontSize: 20,
            textAlign: 'center',
            margin: 10
        }
    });

    _reactNative.AppRegistry.registerComponent('TestRn',
    function() {
        return TestRn;
    });
},
0, null, "TestRn/index.ios.js");
```

* 可以读懂React Native定义了自己的模块定义方法```function define(factory, moduleId, dependencyMap)```, 自己的模块加载方法```function _require(moduleId)```.
同时使用```__d```去定义了```TestRn```模块.
* TestRN的 主要是构造类，然后为TestRn添加方法和属性。其中render方法是一个重点，
* 其实一个核心就是将JSX的标签写法，转换成js代码
* 最后注册TestRN类

### Weex Hello bundle

Weex使用```weex  -o```或者beta Weex中的```weex compile```命令可以将整个工程的.we后缀.vue后缀的文件转换为js 文件。 相比Weex的优点就是，没有把所有内容集成到一个页面中，而只是把这个页面需要的东西加
到自己的js bundle里面，这样就比较灵活了

```bash
weex -o ./out
```

Weex的Hello world的js bundle 只会有Hello world需要的东西，所有代码很少，比较好懂。下面我们截取hello world 有关的js代码分析下

```javascript
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var __weex_template__ = __webpack_require__(1)
	var __weex_style__ = __webpack_require__(2)
	var __weex_script__ = __webpack_require__(3)

	__weex_define__('@weex-component/f5e1c456d74a6374b2c0129d79c108e1', [], function(__weex_require__, __weex_exports__, __weex_module__) {

	    __weex_script__(__weex_module__, __weex_exports__, __weex_require__)
	    if (__weex_exports__.__esModule && __weex_exports__.default) {
	      __weex_module__.exports = __weex_exports__.default
	    }

	    __weex_module__.exports.template = __weex_template__

	    __weex_module__.exports.style = __weex_style__

	})

	__weex_bootstrap__('@weex-component/f5e1c456d74a6374b2c0129d79c108e1',undefined,undefined)

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  "type": "div",
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "message"
	      ],
	      "attr": {
	        "value": function () {return this.message}
	      }
	    }
	  ]
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = {
	  "message": {
	    "fontSize": 70
	  }
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = function(module, exports, __weex_require__){'use strict';

	module.exports = {
	  data: function () {return {
	    message: 'Hello, Weex!'
	  }}
	};}
	/* generated by weex-loader */


/***/ }
/******/ ]);
```

我们贴出一部分Weex JS Framework的代码帮助理解

```javascript
/**
 * Init an app by run code witgh data
 * @param  {object} app
 * @param  {string} code
 * @param  {object} data
 */
export function init (app, code, data) {
  console.debug('[JS Framework] Intialize an instance with:\n', data)
  let result

  // prepare app env methods
  const bundleDefine = (...args) => defineFn(app, ...args)
  const bundleBootstrap = (name, config, _data) => {
    result = bootstrap(app, name, config, _data || data)
    updateActions(app)
    app.doc.listener.createFinish()
    console.debug(`[JS Framework] After intialized an instance(${app.id})`)
  }
  ...


/**
 * define(name, factory) for primary usage
 * or
 * define(name, deps, factory) for compatibility
 * Notice: DO NOT use function define() {},
 * it will cause error after builded by webpack
 */
export const defineFn = function (app, name, ...args) {
  console.debug(`[JS Framework] define a component ${name}`)

  // adapt args:
  // 1. name, deps[], factory()
  // 2. name, factory()
  // 3. name, definition{}
  let factory, definition
  if (args.length > 1) {
    definition = args[1]
  }
  else {
    definition = args[0]
  }
  if (typeof definition === 'function') {
    factory = definition
    definition = null
  }

  // resolve definition from factory
  if (factory) {
    const r = (name) => {
      if (isWeexComponent(name)) {
        const cleanName = removeWeexPrefix(name)
        return requireCustomComponent(app, cleanName)
      }
      if (isWeexModule(name)) {
        const cleanName = removeWeexPrefix(name)
        return app.requireModule(cleanName)
      }
      if (isNormalModule(name) || isNpmModule(name)) {
        const cleanName = removeJSSurfix(name)
        return app.commonModules[cleanName]
      }
    }
    const m = { exports: {}}
    factory(r, m.exports, m)
    definition = m.exports
  }

  // apply definition
  if (isWeexComponent(name)) {
    const cleanName = removeWeexPrefix(name)
    registerCustomComponent(app, cleanName, definition)
  }
  else if (isWeexModule(name)) {
    const cleanName = removeWeexPrefix(name)
    initModules({ [cleanName]: definition })
  }
  else if (isNormalModule(name)) {
    const cleanName = removeJSSurfix(name)
    app.commonModules[cleanName] = definition
  }
  else if (isNpmModule(name)) {
    const cleanName = removeJSSurfix(name)
    if (definition.template ||
        definition.style ||
        definition.methods) {
      // downgrade to old define method (define('componentName', factory))
      // the exports contain one key of template, style or methods
      // but it has risk!!!
      registerCustomComponent(app, cleanName, definition)
    }
    else {
      app.commonModules[cleanName] = definition
    }
  }
}

export function bootstrap (app, name, config, data) {
  console.debug(`[JS Framework] bootstrap for ${name}`)

  // 1. validate custom component name first
  let cleanName
  if (isWeexComponent(name)) {
    cleanName = removeWeexPrefix(name)
  }
  else if (isNpmModule(name)) {
    cleanName = removeJSSurfix(name)
    // check if define by old 'define' method
    /* istanbul ignore if */
    if (!requireCustomComponent(app, cleanName)) {
      return new Error(`It's not a component: ${name}`)
    }
  }
  else {
    return new Error(`Wrong component name: ${name}`)
  }

  // 2. validate configuration
  config = isPlainObject(config) ? config : {}
  // 2.1 transformer version check
  if (typeof config.transformerVersion === 'string' &&
    typeof global.transformerVersion === 'string' &&
    !semver.satisfies(config.transformerVersion,
      global.transformerVersion)) {
    return new Error(`JS Bundle version: ${config.transformerVersion} ` +
      `not compatible with ${global.transformerVersion}`)
  }
  // 2.2 downgrade version check
  const downgradeResult = downgrade.check(config.downgrade)
  /* istanbul ignore if */
  if (downgradeResult.isDowngrade) {
    app.callTasks([{
      module: 'instanceWrap',
      method: 'error',
      args: [
        downgradeResult.errorType,
        downgradeResult.code,
        downgradeResult.errorMessage
      ]
    }])
    return new Error(`Downgrade[${downgradeResult.code}]: ${downgradeResult.errorMessage}`)
  }

  // 3. create a new Vm with custom component name and data
  app.vm = new Vm(cleanName, null, { _app: app }, null, data)
}
```

* Weex也是利用数组ID方式来，排列模块，核心是通过函数`__webpack_require__`来加载数组的各个模块
* Weex会把自己定义的`template`, `style`, `script`都解析成js代码，我们可以清楚的看到`template`转换成了模块1也就是VDOM，样式`style`是模块2，代码`script`是模块3
* `__weex_define__`是Weex JS Framework里定义的模块定义方法他的原型就是`defineFn = function (app, name, ...args)`，
  主要功能就是定义模块，将模块加载到特定的地方，让用的时候可以正确找到它
* `__weex_bootstrap__`是Weex JS Framework定义的模块启动，主要是组件模块创建ViewModel，挂载到app中让后面可以找到。
* Weex应该是借鉴了React Native，避免了React Native把所有有用无用的依赖都打入js bundle中这个缺点。
* 预备知识`webpack`, `bable`, `weex-loader`, `vue-loader`


## 总结

### React Native优势总结
* 借助自己强大的社区，在功能和特性的完备性上React Native要比Weex有很大优势
* 在设计和现在app的使用上，weex还停留适合在一个原生app里面集成一些weex页面来实现android和ios的共用逻辑，很少有全app用weex去做的案例。
  React Native已经比较全面的特性支持让它可以满足全app用React Native技术去实现。
* 未来发展趋势上React Native因为是国外框架社区成熟，一定会打造成一个，需要些原生代码越来越少的，
  以及可以解决android和iOS整个app各个方面的解决方案。这一点上它比Weex有优势，因为国产开源很少最后能够持续更新改进的，
  更多的可能要依靠alibaba的自己需求推动。

### Weex优势总结
* 相比React Native用的React思想和自定义的一套JSX，Weex以其用到了web开发的一些标签，和css，对web开发人员比较友好，用Vue.js也很易学易懂，Weex有更好的学习曲线。
* 设计上Weex更符合中国国情，在中国app设计上android应用要和iOS应用保持一致，在美国讲究iOS app设计要符合苹果规范，android app 设计要复合谷歌规范。
  所以可以看到weex提供的UI组件都是两个平台共用的，React Native提供的UI组件很多都是平台特色的。
* 出来的比较晚，算的上借鉴了React Native的思想，摈弃了它的一些不适合中国的地方和一些前期的设计失误。
* 有中文的文档和社区，容易上手，起点很低。

总的来说 Weex比较符合中国国情，轻量级一些，学习曲线也好些，唯一就是没提供的东西可能需要自己去实现。
如果时间允许和架构上需要去实现一套自己组件的比较推荐Weex。
如果希望有一个通用完整的解决方案可以直接使用不用开发过多自己的组件，那就推荐React Native。一句话，用React Native，改Weex。