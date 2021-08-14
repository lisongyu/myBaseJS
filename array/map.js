Array.prototype.myMap=function(fn){
  
    let arr=[]
    for(let i=0;i<this.length;i++){
      arr.push(fn(this[i],i,this))
    }
    return arr


}

let arrNum=[1,2,3]

let getNum=arrNum.myMap((item,index,ArrItea)=>{
  return item*2
})
console.log(getNum)