let arr = [1, [2, 3, [4, 5]]];

function flat(arr) {
  let result = [];
  for (const item of arr) {
    item instanceof Array ? result = result.concat(flat(item)) : result.push(item)
  }
  return result;
}

let res=flat(arr);  // [1, 2, 3, 4, 5]
console.log(res)