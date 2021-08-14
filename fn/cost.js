
// let cost=(function(){
//   var arg=[];
//   return function(){
//     if(arguments.length===0){
//       var money=0
//       for(var i=0;i<arg.length;i++){
//         money+=arg[i]
//       }
//       return money

//     }else{
//       [].push.apply(arg,arguments)
//     }
//   }
// })()

function cost(){
  var money=0
      for(var i=0;i<arguments.length;i++){
        money+=arguments[i]
      }
      return money
}

let currying=function(fn){
  var arg=[];
  return function(){
   
    [].push.apply(arg,arguments)
    return fn.apply(this,arg)
 
  }
}

cost=currying(cost)
cost(100)
cost(200)
console.log(cost(300))