Array.prototype.mFind=function(fn){
  for(let i=0;i<this.length;i++){
    if(fn(this[i])){
      return this[i]
    }
  }

}

let item = [1, 2, 3].mFind((item) => {
  return item > 1;
});

console.log(item); // 2