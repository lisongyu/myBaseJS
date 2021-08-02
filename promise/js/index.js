class KPromise {
  constructor(handler){
    // 数组队列-先注册的，在调用resolve方法的时候，先执行FIFO
    this.resolveHandler=[]
    handler(this._resolve.bind(this),this._reject.bind(this))
  }

  // 
  _resolve(){
    setTimeout(()=>{
      console.log('_resolve')
      let handler;
      // 因为每一个独立的Promise只处理一次任务，所以注册的回调取出以后就不在需要了
      while(handler=this.resolveHandler.shift()){
        handler();
      }
    },0)
   
    
  }
  _reject(){
    console.log('_reject')
  }
  then(resolveHandler){
    /** then 方法并不会立即执行传入的函数
     * 而是需要等待当前KPromise调用resolve方法，确认前置任务一级执行成功了才能调用
     * 为了满足这个需求，我们需要先把传入的resolveHandler保存到一个指定的位置，在KPromise调用
     * resolve方法以后再去执行-事件注册
     */
    // resolveHandler()
    this.resolveHandler.push(resolveHandler)
  }
}