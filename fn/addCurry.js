

function add(){
  // 将传入的不定参数转化为数组
  var _args =Array.prototype.slice.call(arguments) 
  var _adder=function(){
    _args.push(...arguments)
    return _adder
  }
  // toString隐形转换特性
  _adder.toString=function(){
    return _args.reduce(function(pre,cur){
      return pre+cur
    },0)
  }
  return _adder
}



let a=add(1,2,3)
console.log(a)
let b=add(2)(4)(6)
console.log(b)