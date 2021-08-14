function sum(a, b, c, d, e) {
  return a+b+c+d+e;
};


const curring = (fn, arr = []) => {
  let len = fn.length;
  console.log(len)
  return function (...args) {
    arr = [...arr, ...args];
    if (arr.length < len) {
      return curring(fn, arr);
    } else {
      return fn(...arr);
    }
  };
};
let a = curring(sum)(1,2)(3,4)(5);
console.log(a)