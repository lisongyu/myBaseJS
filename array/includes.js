let a = [1, 2, 3];
let b = [2, 4, 5];

let intersection =a.filter(v=>b.includes(v))

let union = a.concat(b.filter(v => !a.includes(v)));

console.log(union);
console.log(intersection)