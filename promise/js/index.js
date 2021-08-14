class KPromise {
  static PENDING = 'PENDING'
  static REJECTED = 'REJECTED'
  static RESOLVED = 'RESOLVED'
  constructor(handler) {
    if (typeof handler !== 'function') {
      throw new TypeError('Promise resolver undefind is  not a gunction')
    }
    // 数组队列-先注册的，在调用resolve方法的时候，先执行FIFO

    this.status = KPromise.PENDING
    //定义收集解决数组
    this.resolvedQueues = [];
    //定义收集拒绝数组
    this.rejectedQueues = [];
    // 都执行
    this.finallyQueues=[]

    this.value
    handler(this._resolve.bind(this), this._reject.bind(this))
  }

  // 
  _resolve(val) {
    window.addEventListener('message', _ => {
      if (this.status !== KPromise.PENDING) {
        return false
      }
      this.value = val
      this.status = KPromise.RESOLVED
      let handler;
      // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不在需要了
      while (handler = this.resolvedQueues.shift()) {
        handler(val);
      }
      this._finally()
    })
    window.postMessage('')
  }
 static resolve(val){
    return new Promise(reslove=>{
      reslove(val)
    })
  }

  static reject(err){
    return new Promise((reslove,reject)=>{
      reject(err)
    })
  }
  static all(iterator){
    let len=iterator.length
    let i=0;
    let vals=[]
    return new KPromise((resolve,reject)=>{
      iterator.forEach(it=>{
        it.then(val=>{
          vals.push(val)
          i++;
          if(i==len){
            resolve(vals)
          }
        }).catch(e=>{
          reject(e)
        })
      })
     
    })


  }
  //race方法实现
  static race(iterator) {
    return new KPromise((resolve, reject) => {
      iterator.forEach(it => {
        it.then(val => {
         
            resolve(val)
          
        }).catch(e => {
          reject(e)
        })
      })
      
    })
  }
  static allSettled(iterator){
    let len=iterator.length
    let i=0;
    let vals=[]
    return new KPromise((resolve,reject)=>{
      iterator.forEach(it=>{
        it.finally(val=>{
          vals.push(val)
          i++;
          if(i==len){
            resolve(vals)
          }
        })
      })
     
    })

  }
  _finally() {
      let handler;
      // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不在需要了
      while (handler = this.finallyQueues.shift()) {
        handler(this.value);
      }
  
  }
  catch(rejectHandler) {
    return this.then(undefined, rejectHandler)
  }
  finally(finallyHandler){
    this.finallyQueues.push(finallyHandler)
  }
  _reject(val) {
    //拒绝收集
    window.addEventListener('message', _ => {
      if (this.status != KPromise.PENDING) {
        return;
      }
      this.value = val;
      this.status = KPromise.REJECTED;

      let handler;
      while (handler = this.rejectedQueues.shift()) {
        handler(this.value)
      }
      this._finally()

    })
    window.postMessage('')
  }

  then(reslovedHandler, rejectedHandler) {
    console.log(rejectedHandler)
    /** then 方法并不会立即执行传入的函数
     * 而是需要等待当前KPromise调用resolve方法，确认前置任务一级执行成功了才能调用
     * 为了满足这个需求，我们需要先把传入的resolveHandler保存到一个指定的位置，在KPromise调用
     * resolve方法以后再去执行-事件注册
     */
    return new KPromise((resolve, reject) => {
      // resolve()

      //解决方法
      function newResolveHandler(val) {
        //判断是不是fn，有时reject,不需要
        if (typeof reslovedHandler === 'function') {

          let result = reslovedHandler(val);
          //返回值，如果返回的是promise方法
          if (result instanceof KPromise) {
            //继续调用then方法收集
            result.then(resolve, reject);
          } else {
            //如果不是直接进行处理
            resolve(result);
          }
        } else {
          //当只有reject时,reslove为undefined时
          resolve(val);
        }
      }
      function newRejectHandler(val) {
        if (typeof rejectedHandler === 'function') {
          let result = rejectedHandler(val);
          if (result instanceof KPromise) {
            result.then(resolve, reject);
          } else {
            reject(result);
          }
        } else {
          reject(val);
        }

      }
      this.resolvedQueues.push(newResolveHandler)
      console.log(rejectedHandler)
      this.rejectedQueues.push(newRejectHandler)
    })
  }
}