let user = require('./User');//common 规范获取，require在node加载的，所以这里不可以直接用require；

console.log(`userName:${user.userName}`)
console.log(`I'm ${user.userName} ${user.sayHello()}`)

let  http = require('http');
let url = require('url');
let util = require('util');
let server=http.createServer((req,res)=>{ //http模块本身没有listen这个方法的，http.createServer这里可以创建一个服务，二这个服务就会有listen的方法；
  res.statusCode=200;
  res.setHeader("Content-Type","text/plain;charset=utf-8");
  //res.end("Hello,Node.js");
 // res.end(util.inspect(url.parse(req.url)));// res.end(url.parse(req.url))报错是因为在输出的必须是字符串
  //res.end(util.inspect(url.parse('http://localhost:3000/index.html?a=123#tag')))//这里就能解析得到hash值 #tag
 // parse 是将url转移成对象
  res.end(util.inspect(url.parse(req.url)))
})

server.listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请打开浏览，输入http://17.0.0.1:3000/浏览")
})
/*let server=http.createServer((req,res)=>{ //http模块本身没有listen这个方法的，http.createServer这里可以创建一个服务，二这个服务就会有listen的方法；
  res.statusCode=200;
  res.setHeader("Content-Type","text/plain;charset=utf-8");
  res.end("Hello,Node.js");
}).listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请打开浏览，输入http://17.0.0.1:3000/浏览")
})*/
