export function debounce(func, wait) {
  let lastTime = null
  let timeout
  // console.log('doudong')
  return function() {
    let context = this
    let now = new Date()
    // 判定不是一次抖动
    if (now - lastTime - wait > 0) {
      setTimeout(() => {
        func.apply(context, arguments)
      }, wait)
    } else {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        func.apply(context, arguments)
      }, wait)
    }
    // 注意这里lastTime是上次的触发时间
    lastTime = now
  }
}
