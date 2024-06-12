---
title: Spring多数据源配置
publishDate:  2012-02-22 23:47:39
image: ~/assets/images/aldis/2012/25.png
category: 编程思想
tags: 
  - Spring
---

在大型的应用中，为了提高数据库的水平伸缩性，对多个数据库实例进行管理，需要配置多数据源。在Spring框架被广泛运用的今天，可以很简单的运用Spring中的特性配置动态多数据。 

1. 首先配置一个基于c3p0.ComboPooledDataSource的数据源A，数据源B.

{% codeblock daoContext.xml lang:xml %}
	<bean id="dataSourceA" class="com.mchange.v2.c3p0.ComboPooledDataSource" destroy-method="close">
		<property name="driverClass" value="${jdbc.driver}"></property>
		<property name="jdbcUrl" value="${jdbc.ur.al}?zeroDateTimeBehavior=convertToNull&characterEncoding=utf8"></property>
		<property name="user" value="${jdbc.user}"></property>
		<property name="password" value="${jdbc.password}"></property>
		<property name="minPoolSize" value="${jdbc.miniPoolSize}" />
		<property name="maxPoolSize" value="${jdbc.maxPoolSize}"/>  
		<property name="initialPoolSize" value="${jdbc.initialPoolSize}"/>
		<property name="maxIdleTime" value="${jdbc.maxIdleTime}"/>
		<property name="acquireIncrement" value="${jdbc.acquireIncrement}"/>
		<property name="acquireRetryAttempts" value="${jdbc.acquireRetryAttempts}"/>
		<property name="acquireRetryDelay" value="${jdbc.acquireRetryDelay}"/>
		<property name="idleConnectionTestPeriod" value="${jdbc.idleConnectionTestPeriod}"/>
		<property name="checkoutTimeout" value="${jdbc.checkoutTimeout}"/>
	</bean>

	<bean id="dataSourceB" class="com.mchange.v2.c3p0.ComboPooledDataSource" destroy-method="close">
		<property name="driverClass" value="${jdbc.driver}"></property>
		<property name="jdbcUrl" value="${jdbc.url.b}?zeroDateTimeBehavior=convertToNull&characterEncoding=utf8"></property>
		<property name="user" value="${jdbc.user}"></property>
		<property name="password" value="${jdbc.password}"></property>
		<property name="minPoolSize" value="${jdbc.miniPoolSize}" />
		<property name="maxPoolSize" value="${jdbc.maxPoolSize}"/>  
		<property name="initialPoolSize" value="${jdbc.initialPoolSize}"/>
		<property name="maxIdleTime" value="${jdbc.maxIdleTime}"/>
		<property name="acquireIncrement" value="${jdbc.acquireIncrement}"/>
		<property name="acquireRetryAttempts" value="${jdbc.acquireRetryAttempts}"/>
		<property name="acquireRetryDelay" value="${jdbc.acquireRetryDelay}"/>
		<property name="idleConnectionTestPeriod" value="${jdbc.idleConnectionTestPeriod}"/>
		<property name="checkoutTimeout" value="${jdbc.checkoutTimeout}"/>
	</bean>
{% endcodeblock %}

<!-- more -->

2. 接着扩展一个Spring提供的AbstractRoutingDataSource，Override 其中的 determineCurrentLookupKey方法实现数据源的route. 
```java
package datasource;  
  
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;  
  
public class DynamicDataSource extends AbstractRoutingDataSource{  
  
    @Override  
    protected Object determineCurrentLookupKey() {  
        return CustomerContextHolder.getCustomerType();  
    }  
}  
```

3. 而其中的CustomerContextHolder这是开发人员自己实现的一个封装了ThreadLocal类型的ContextHolder。
```java
package datasource;  
  
public class CustomerContextHolder {  
  
    public static final String DATA_SOURCE_A = "dataSourceA";  
    public static final String DATA_SOURCE_B = "dataSourceB";  
      
    private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();  
      
    public static void setCustomerType(String customerType) {  
        contextHolder.set(customerType);  
    }  
      
    public static String getCustomerType() {  
        return contextHolder.get();  
    }  
      
    public static void clearCustomerType() {  
        contextHolder.remove();  
    }  
}  
```

4. 接下来就是在我们上面的daoContext.xml将这个DynamicDataSource Bean加入进去，同时配置targetDataSources的 Map映射。 
```xml
<bean id="dynamicDataSource" class="datasource.DynamicDataSource" >  
    <!-- 通过key-value的形式来关联数据源 -->  
    <property name="targetDataSources">  
        <map key-type="java.lang.String">  
            <entry value-ref="dataSourceA" key="dataSourceA"></entry>  
            <entry value-ref="dataSourceB" key="dataSourceB"></entry>  
        </map>  
    </property>  
    <property name="defaultTargetDataSource" ref="dataSourceA" >  
    </property>  
</bean>   
```

5. 如何是用这个动态的多数据源呢？ 其实很简单，因为我们的`DynamicDataSource` 是继承与`AbstractRoutingDataSource`，而`AbstractRoutingDataSource`又是继承于`org.springframework.jdbc.datasource.AbstractDataSource`，显然的`AbstractDataSource`实现了统一的`DataSource`接口，所以我们的`DynamicDataSource` 同样可以方便的当一个`DataSource`使用，下面拿`Hibernate`做例子： 
```xml
<bean id="sessionFactory" class="org.springframework.orm.hibernate3.annotation.AnnotationSessionFactoryBean">  
     <!-- 可以看到和 普通的dataSource用法一样 -->  
    <property name="dataSource" ref="dynamicDataSource" />  
    <property name="configLocations" value="classpath:hibernate.cfg.xml" />  
    <property name="hibernateProperties">  
         <props>  
                <prop key="hibernate.dialect">${hibernate.dialect}</prop>  
         </props>   
    </property>  
</bean>  
```

可以看到我们用的仍然是一个sessionFactory，这样看来事务管理的配置也和以前一样。
```xml
<tx:annotation-driven transaction-manager="transactionManager"/>  
  
<bean id="transactionManager" class="org.springframework.orm.hibernate3.HibernateTransactionManager">  
    <property name="sessionFactory" ref="sessionFactory" />  
</bean>  
```

`DynamicDataSource Bean`也在容器中了，现在剩下的就在程序中如何控制，选择某一个想要的数据源该怎么做：
```java
//这样就将数据源动态的设置成了dataSourceB.  
CustomerContextHolder.setCustomerType(CustomerContextHolder.DATA_SOURCE_B);  
```

```java
package datasource;  
  
import org.aspectj.lang.JoinPoint;  
import org.aspectj.lang.annotation.Aspect;  
import org.aspectj.lang.annotation.Before;  
import org.aspectj.lang.annotation.Pointcut;  
  
@Aspect  
public class DynamicDataSourceAspect {  
    @Pointcut("execution (public service.impl..*.*(..))")  
    public void serviceExecution(){}  
      
    @Before("serviceExecution()")  
    public void setDynamicDataSource(JoinPoint jp) {  
        for(Object o : jp.getArgs()) {  
            //处理具体的逻辑 ，根据具体的境况CustomerContextHolder.setCustomerType()选取DataSource  
        }  
    }  
}  
```

6. 总结： 我们可以看到运用`AbstractRoutingDataSource`可以很好的实现多数据源的，而且以后扩展更多的数据源时也非常容易，只要增加数据源和修改`DynamicDataSource Bean`的`targetDataSources` 配置就好。关于选择某一个数据源，其实可以很好的用`@Aspect`在`Service`的入口加入一个切面`@Pointcut`，在`@Before`里判断JoinPoint的类容选定特定的数据源（例如更加`JoinPoint`的某个key来判断在设置`CustomerContextHolder.setCustomerType`）。   
根究实际的应用来确定。个人看法： 以前有很多应用部署了`writeDataSource`和`readDataSource`和`slaveDataBase`的实现，但现在的大部分应用在构架上已经不太适合了，越来越注重和用户的交互性使得数据库间他同步变得日益复杂和难以维护，所以在架构系统时不妨考虑使用水平切割的方法来切割数据库，当然这种开发需要需要更多的时间分析业务领域，选取如何的配置数据源其实也是和业务息息相关的。