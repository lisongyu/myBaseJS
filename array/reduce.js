

Array.prototype.reduce=function(fn,prev){
  for(let i=0;i<this.length;i++){
    if(typeof prev==='undefined'){
      prev=fn(this[i],this[i+1],i+1,this)
    }else{
      prev=fn(prev,this[i],i,this)
    }
  }
  return prev
}

let total = [1, 2, 3].reduce((prev, next, currentIndex, array) => {
  return prev + next;
}, 0);

console.log(total)