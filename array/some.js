Array.prototype.mSome=function(fn){
  
  let flag=false
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      flag=true
      break;
    }
  }
  return flag


}

let arrNum=[1,2,3,121,323]

let getNum=arrNum.mSome((item,index,ArrItea)=>{
return item>1000
})
console.log(getNum)