/*module.exports={//common规范必须是通过module.exports来输出的 第一种输出方式（输出一个object对象）
  userName:'Jack',
  sayHello:function () {
    return 'Hello';
  }
}*/
exports.userName='Tom';
exports.sayHello=function () {//common规范的另一种输出exports 第二种输出方式（输出一个值）
  return 'World';
}
