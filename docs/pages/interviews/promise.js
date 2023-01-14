/**
 * 引入状态机制
 * promise 状态只能是 pending  => fulfilled 或者是 pending  => rejected
 * 状态变化不可逆
 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    this._value = '';
    this._reason = '';
    this._status = PENDING;
    this._resolveQueue = [];
    this._rejectQueue = [];

    // resolve
    const _resolve = (value) => {
      const run = () => {
        if (this._status !== PENDING) return;
        this._status = FULFILLED;
        this._value = value;
        while (this._resolveQueue.length > 0) {
          this._resolveQueue.shift()(value);
        }
      };
      setTimeout(run);
    };

    // reject
    const _reject = (reason) => {
      const run = () => {
        if (this._status !== PENDING) return;
        this._status = REJECTED;
        this._reason = reason;
        while (this._rejectQueue.length > 0) {
          this._resolveQueue.shift()(value);
        }
      };
      setTimeout(run);
    };

    executor(_resolve, _reject);
  }
  then(resolveFn, rejectFn) {
    // 根据规范，如果then的参数不是function，则我们需要忽略它, 让链式调用继续往下执行
    typeof resolveFn !== 'function' ? (resolveFn = (value) => value) : null;
    typeof rejectFn !== 'function'
      ? (rejectFn = (reason) => {
          throw new Error(reason instanceof Error ? reason.message : reason);
        })
      : null;
    // this._resolveQueue.push(resolveFn);
    // this._rejectQueue.push(rejectFn);
    // then 方法返回一个新的promise
    return new MyPromise((resolve, reject) => {
      // resolveFn, rejectFn 包装一层 对返回值进行考虑
      const fulfilledFn = (value) => {
        try {
          const res = resolveFn(value);
          if (res instanceof MyPromise) {
            res.then(resolve, reject);
          } else {
            resolve(res);
          }
        } catch (error) {
          reject(error);
        }
      };

      const rejectedFn = (error) => {
        try {
          let x = rejectFn(error);
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x);
        } catch (error) {
          reject(error);
        }
      };

      switch (this._status) {
        case PENDING:
          this._resolveQueue.push(fulfilledFn);
          this._rejectQueue.push(rejectedFn);
          break;
        case FULFILLED:
          fulfilledFn(this._value);
          break;
        case REJECTED:
          rejectedFn(this._reason);
          break;
      }
    });
  }
  catch(rejectFn) {
    return this.then(undefined, rejectFn);
  }
  finally(callback) {
    return this.then(
      (value) => {
        return MyPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) return value; // 根据规范, 如果参数是Promise实例, 直接return这个实例
    return new MyPromise((resolve) => resolve(value));
  }
  //静态的reject方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => reject(reason));
  }
  // 静态的all 方法
  static all(promiseArr) {
    let count = 0;
    let result = [];
    return new MyPromise((resolve, reject) => {
      promiseArr.forEach((item, idx) => {
        MyPromise.resolve(item).then(
          (value) => {
            result[idx] = value;
            count++;
            if (count === promiseArr.length) {
              resolve(result);
            }
          },
          (err) => {
            //有一个Promise被reject时，MyPromise的状态变为reject
            reject(err);
          }
        );
      });
    });
  }
  static race(promiseArr) {
    return new MyPromise((resolve, reject) => {
      //同时执行Promise,如果有一个Promise的状态发生改变,就变更新MyPromise的状态
      for (let p of promiseArr) {
        MyPromise.resolve(p).then(
          //Promise.resolve(p)用于处理传入值不为Promise的情况
          (value) => {
            resolve(value); //注意这个resolve是上边new MyPromise的
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }
}
