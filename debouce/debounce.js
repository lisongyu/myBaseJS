let count = 1;
var container = document.getElementById('container');
function getUserAction(e) {
  console.log(this)
  console.log(e)
  container.innerHTML = count++;
}
// container.onmousemove=getUserAction

// 防抖第一版 原始版本
// function debounce(func, wait) {
//   var timeout;
//   return function () {
//     clearTimeout(timeout)
//     timeout = setTimeout(func, wait)
//   }
// }

// 防抖第二版 this指向
// function debounce(func, wait) {
//   var timeout;
//   return function () {
//     let context = this
//     clearTimeout(timeout)
//     timeout = setTimeout(function () {
//       func.apply(context)
//     }, wait)
//   }
// }

// 防抖第三版 事件指向
// function debounce(func, wait) {
//   let timeout;
//   return function () {
//     let context = this;
//     let args = arguments;
//     clearTimeout(timeout)
//     timeout = setTimeout(function () {
//       func.apply(context, args)
//     }, wait)
//   }
// }

// 防抖第四版 立刻执行
// function debounce(func, wait, immediate) {
//   let timeout;
//   return function () {
//     let context = this;
//     var args = arguments;
//     timeout && clearTimeout(timeout)
//     if (immediate) {
//       // 如果已经执行过，不再执行
//       var callNow = !timeout;
//       // 设置时间后清空，然后再进行后续操作
//       timeout = setTimeout(function () {
//         timeout = null;
//       }, wait)
//       callNow && func.apply(context, args)
//     } else {
//       timeout = setTimeout(function () {
//         func.apply(context, args)
//       }, wait)
//     }
//   }
// }

// 防抖第五版 返回值
function debounce(func, wait, immediate) {
  let timeout, result;
  return function () {
    let context = this;
    var args = arguments;
    timeout && clearTimeout(timeout)
    if (immediate) {
      console.log('我这里执行了')
      // 如果已经执行过，不再执行
      var callNow = !timeout;
      console.log(callNow)
      // 设置时间后清空，然后再进行后续操作,如果时间没到，再触发时间重新累计
      timeout = setTimeout(function () {
        timeout = null;
      }, wait)
      result = callNow && func.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args)
      }, wait)
    }

    return result
  }
}

// 防抖第六版 取消防抖





container.onmousemove = debounce(getUserAction, 1000, true)
