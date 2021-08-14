Array.prototype.mEvery=function(fn){
  
  let flag=true
  for(let i=0;i<this.length;i++){
    if(!fn(this[i],i,this)){
      flag=false
      break;
    }
  }
  return flag


}

let arrNum=[10,20,3,121,323]

let getNum=arrNum.mEvery((item,index,ArrItea)=>{
return item>20
})
console.log(getNum)