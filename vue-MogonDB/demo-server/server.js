//打开静态页面的方法

let  http = require('http');
let url = require('url');
let util = require('util');

let fs = require('fs') //fs 是我们的文件型

let server=http.createServer((req,res)=>{ //http模块本身没有listen这个方法的，http.createServer这里可以创建一个服务，二这个服务就会有listen的方法；

 var pathName =  url.parse(req.url).pathname;
 console.log("flie:"+pathName.substring(1))
  fs.readFile(pathName.substring(1),function(err,data){
    if(err){
      res.writeHead(404,{
        'Content-Type':'text/html'//r如果输出文件是html，输出文本（解释性语言）plain
      })
    }else{
      res.writeHead(200,{
        'Content-Type':'text/html'
      })
      res.write(data.toString())

    }
    res.end()
  })

})

server.listen(3000,'127.0.0.1',()=>{
  console.log("服务器已经运行，请打开浏览，输入http://17.0.0.1:3000/浏览")
})
