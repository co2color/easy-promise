const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class Pms {
  constructor(executor) {
    this.status = PENDING
    this.resolve_value = undefined
    this.reject_value = undefined
    this.fulfilledTasks = []
    this.rejectedTasks = []
    const resolve = (val) => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.resolve_value = val
        this.fulfilledTasks.forEach((fn) => fn())
      }
    }
    const reject = (val) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reject_value = val
        this.rejectedTasks.forEach((fn) => fn())
      }
    }
    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
    // constructor end
  }
  then(onFulfilled, onRejected) {
    if (this.status === PENDING) {
      this.fulfilledTasks.push(() => {
        onFulfilled(this.resolve_value)
      })
      this.rejectedTasks.push(() => {
        onRejected(this.reject_value)
      })
    }
    if (this.status === FULFILLED) {
      onFulfilled(this.resolve_value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reject_value)
    }
  }
}
const ps = new Pms((resolve, reject) => {
  setTimeout(() => {
    resolve('success resolve')
  }, 1000)
})
ps.then((res) => {
  console.log(res)
})