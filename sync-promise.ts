// promise(sync version)
// more in other files, wait plz
interface OnfulfilledType<T = unknown> {
  (v?: T): unknown
}
interface OnrejectedType<T = unknown> {
  (e?: T): unknown
}
interface ExecutorType<T = unknown> {
  (resolve: OnfulfilledType<T>, reject?: OnrejectedType): void
}

type StatusTypes = 'PENDING' | 'FULFILLED' | 'REJECTED'

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class syncPromise<T = unknown> {
  private status: StatusTypes
  private resolve_value: OnfulfilledType | unknown
  private reject_value: OnrejectedType | unknown
  constructor(executor: ExecutorType<T>) {
    this.status = PENDING
    this.resolve_value = undefined
    this.reject_value = undefined

    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
    // constructor end
  }
  public resolve: OnfulfilledType<T> = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED
      this.resolve_value = val
    }
  }
  public reject: OnrejectedType = (val) => {
    if (this.status === PENDING) {
      this.status = REJECTED
      this.reject_value = val
    }
  }
  public then: ExecutorType = (
    onFulfilled?: OnfulfilledType,
    onRejected?: OnrejectedType
  ) => {
    if (this.status === FULFILLED && onFulfilled) {
      onFulfilled(this.resolve_value)
    }
    if (this.status === REJECTED && onRejected) {
      onRejected(this.reject_value)
    }
  }
}
const p = new syncPromise<string>((resolve, reject) => {
  resolve('resolve success')
})
p.then((res) => {
  console.log(res)
})
