Array.prototype.mfilter=function(fn){
  
  let arr=[]
  for(let i=0;i<this.length;i++){
    if(fn(this[i],i,this)){
      arr.push(this[i])
    }
   
  }
  return arr
}
let arr=[3,5,8,23,10]
let getFArr=arr.mfilter(
  (item,index,arrS)=>{
    return item>7
  }
)

console.log(getFArr)