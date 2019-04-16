//客户端的使用 去调用第三服务
let  http = require('http');
;

http.get('http://www.imooc.com/u/card',(res)=>{
  let data ='';
  res.on("data",(chunk)=>{//用on来监听
    data += chunk;
  })

  res.on("end",function(){//用on来监听
     let result = JSON.parse('data');
     console.log(result.msg)
  })
})
