/**
 * 对应名称
 * -prototype
 * -__proto__
 * 
 * 从属关系
 * prototype-> 函数的一个属性:对象 {}
 * __proto__ -> 对象Object的一个属性:对象 {}
 * 对象的__proto__保存着该对象的构造函数的prototype
 */

function Test() {
  this.a = 1
}

const test = new Test();
Test.prototype.b = 2
Object.prototype.c = 3
console.log(Test.prototype)
console.log(test.__proto__)
console.log(Test.prototype === test.__proto__)
// Test.prototype => {__proto__}
console.log(Test.prototype.__proto__)
console.log(Object.prototype.__proto__)

console.log(test)

/**
 * test {
 *  a:1,
 *  __proto__:Test.prototype={
 *    b:2,
 *    __proto__:Object.prototype={
 *      c:3
 *    }
 *  }
 * }
 * 
 */
console.log(test.a)
console.log(test.b)

// Function Object
console.log(Test.__proto__ === Function.prototype)
console.log(Function.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.prototype)
console.log(Object.__proto__ === Function.__proto__)


console.log(test.constructor === Test)