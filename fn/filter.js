let arr = ["banana", "apple", "orange", "lemon", "apple", "lemon"];
function removeDuplicates(data){
  return data.filter((value,index)=>{
    return data.indexOf(value)===index
  })

}
console.log(removeDuplicates(arr))