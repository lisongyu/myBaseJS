let demo = {
  c : '123'
};
let cc = Object.create(demo);
console.log(cc.c); // 123

function create(proto) {
  function Fn() {};
  // 将Fn的原型指向传入的 proto
  Fn.prototype = proto;
  Fn.prototype.constructor = Fn;
  return new Fn();
};
