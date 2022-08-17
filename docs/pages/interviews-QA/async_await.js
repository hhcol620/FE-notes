/**
 * 
 * 那么我们要如何实现一个async/await呢，首先我们要知道，async/await实际上是对Generator（生成器）的封装，是一个语法糖。由于Generator出现不久就被async/await取代了，很多同学对Generator比较陌生，因此我们先来看看Generator的用法：
 * 
 * async/await自带执行器，不需要手动调用next()就能自动执行下一步
    async函数返回值是Promise对象，而Generator返回的是生成器对象
    await能够返回Promise的resolve/reject的值
 */

function* myGenerator() {
  console.log(yield Promise.resolve(1)); //1
  console.log(yield Promise.resolve(2)); //2
  console.log(yield Promise.resolve(3)); //3
}

function run(gen) {
  var g = gen(); //由于每次gen()获取到的都是最新的迭代器,因此获取迭代器操作要放在_next()之前,否则会进入死循环

  function _next(val) {
    //封装一个方法, 递归执行g.next()
    var res = g.next(val); //获取迭代器对象，并返回resolve的值
    if (res.done) return res.value; //递归终止条件
    res.value.then((val) => {
      //Promise的then方法是实现自动迭代的前提
      _next(val); //等待Promise完成就自动执行下一个next，并传入resolve的值
    });
  }
  _next(); //第一次执行
}

run(myGenerator);
