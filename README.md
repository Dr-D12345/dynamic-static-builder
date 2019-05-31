# dynamic-static-builder

A Node js Libary for building static sites with dynamic data on the fly


## Installation 

```cmd 
npm install dynamic-static-builder
```
## Intro 
The purpose of this library is to provide a minor templating system to allow server-side node js to generate static with dynamic data. This combines the benefits of dynamically rendering with the speed of static rendering. 


Example Workflow:
Server updates with new incoming data -> Node js function uses DSB to fetch data and generate the new page to the views folder-> New data is now updated on mainsite

*This is recommended for sites with a moderate-low  data changes*
## Load

``` javascript
var dsb = require('dynamic-static-builder')()
```
*or* set the src file location on load

``` javascript
var dsb = require('dynamic-static-builder')('article.html')
```
 
## Usage
```javascript

var  dsb  =  require('dynamic-static-builder')('./test.html')

function trigger(data){

var  obj  = {
	TITLE:  data.TITLE,
	BODY:  data.BODY,
	DATE:  data.DATE
}

dsb.buildToString(obj).then(val  => {
	export_to_folder(val);
})
}
```


or export directly a file using *dsb.buildToFile()*

``` javascript
dsb.buildToFile(obj, 'new_file.html').then(val  => {
	console.log("File generated!');
	})
}
```

## Templating  

In order to mark a location for templatting currently the supported syntax is 
```
{{VALUE}}
```

*example use case*


``` html
<!-- test.html -->
<html>
<head>
	<title> {{TITLE}} </title>
</head>
<body>
	<h1>{{TITLE}}</h1>
	<p>{{DATE}}</p>
	<p  class="body">{{BODY}}</p>
</body>
</html>

```
Different optional syntax avaliable in future

## Syntax

### setSrc(element)
* **element**:
	* Type: string
	* the file location of the source template
### buildToFile(object, filename)
* **object**:
	* Type: object
	* Object uses the key value as the templating value
	* Example:
		* ```obj={KEY: value} ```
		* ``` <p>{{KEY}}</p> ```
* **filename** (optional)
	* Type: string
	* The file name and location for the generated file
	* default: uses current directory and generators file with a timestamp
### buildToString(object)
* **object**:
	* Type: object
	* Object uses the key value as the templating value
	* Example:
		* ```obj={KEY: value} ```
		* ``` <p>{{KEY}}</p> ```
	
## TODO
- provide support lower versions of Node
- provide other templating languages support
