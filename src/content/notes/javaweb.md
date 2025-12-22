---
title: 'javaweb'
description: 'javaweb期末'
date: '2025-12-23'
draft: false
category: '期末'
---

#### 第一章

填空

1. 表单主要由3部分组成，分别是表单控件、提示信息和**表单域**。
2. css中文译为层叠样式表。
3. javascript 是 web 中一种功能强大的脚本语言，常用来为网页添加各式各样的动态功能，它不需要进行编译，直接嵌入在html页面中，就可以把静态的页面转变成支持用户交互并响应事件的动态页面。
4. `<img/>`标签表示一个图像信息，他有一个必须要指定的`src`属性。
5. 外链式是指将javascript代码写在一个单独的`.js`文件中，在html文件中使用`<script>`标签引入。

判断

1. 调用事件处理程序主要分为在javascript中调用和在html中调用。
2. 链入式是使用频率最高，也最实用的css样式表，它将html代码与css代码分离为多个文件，实现了结构和表现的完全分离。
3. 在表格中，`<td>`标记用于定义单元格，且必须嵌套在`<tr></tr>`标记中。

选择

1. ```html
   <script language="javascript">
       var x=3;
       var y=2; 
       var z=(x+2)/y;
       alert(z);
   </script>
   ```

输出2.5

2. 设置字号大小书写正确的是：`{font-size: 24px;}`
3. 正确定义一个javascript函数：

```javascript
var x = function(a,b){return a*b;}
```

简答

Q:如何将单独的css文件引入到html页面？

A:将多个.css用`<link/>`放入`<head>`。

代码

Q:常用表单元素的写法

1、单句文本

```html
<input type="text" name="username" placeholder="请输入用户名">
<input type="password" name="password" placeholder="请输入密码">
```

2、多行文本

```html
<textarea name="message" rows="4" cols="50">
    写
    写
    写
    写
</textarea>
```

3、单选框、复选框、下拉列表

```html
<input type="radio" name="sex" value="male" checked>男           <!-- checked 默认-->
<input type="radio" name="sex" value="female">女

<input type="checkbox" name="hobby" value="reading">阅读
...

<select name="city">
    <option value="">请选择出生地</option>
    <option value="beijing">北京</option>
    <option value="shanghai">上海</option>
</select>
```

4、按钮

```html
<input type="submit" value="提交">
<input type="reset" value="重置">
<input type="button" value="点击弹出告警" onclick="alert('Hi.')">
```

Q: form的 action属性的作用？

指定表单提交的地址，没有设置则提交至当前页面。

```html
<form action="/login" method="post">
    <input ...>
    <input ...>
</form>
```

#### 第二章

填空

1. xml文档中有且仅有的一个顶层元素称为文档元素或根元素。
2. 在 xml声明中可以通过 standalone属性来声明这个文档是否是独立文档， standalone默认值是 no。
3. 在 DTD（Document Type Definition）中定义元素属性时， CDATA 是最常用的属性类型，表明是字符数据，与 #PCDATA 相同。
4. 修改 Tomcat的端口号的文件是 tomcat/conf/server.xml，默认是8080。

判断

1. 在 xml声明中，必须包含 version属性，且必须放在前面。

```xml
<? xml version="1.0" encoding="GBK" ?>
```

2. Browser并不直接与数据库服务器连接，而是通过web服务器。
3. Tomcat的 webapps目录是web应用程序的主要发布目录。

选择

1. 启动 Tomcat的 startup.bat 命令在 bin中。
2. `%JAVA_HOME%\bin`
3. xml元素不必全有 DTD。

简答

1. Tomcat安装目录中包含一系列的子目录。

（1）bin：存放可执行文件和脚本文件，如tomcat8.exe、startup.bat。

（2）conf：web.xml、server.xml。

（3）lib：存放Tomcat服务器和所有web应用程序需要访问的 jar包。

（4）logs。

（5）temp。

（6）webapps：Web应用程序的主要发布目录，通常将要发布的应用程序放到这个目录下。

（7）work：Tomcat的工作目录，JSP编译生成的Servlet源文件和字节码文件放到这个目录下。

2. jsp语法

```jsp
<%!	 %>		全局变量、全局方法
<%=  %>		jsp表达式
<%   %>		java程序片段
```

3. jsp注释与java注释（3+3）

```
<%-- -->	<!-- -->	<%  //嵌用java注释  %>

//		   /*  */           /**  *多行注释    */
```



主包表示太费劲了，不搬上来了，停更，完结。
