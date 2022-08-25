/**
 * https://vue-js.com/learn-vue/
 */

/**
 * Observer类会通过递归的方式把一个对象的所有属性都转化成可观测对象
 */
class Observer {
  constructor(value) {
    this.value = value;
    // 给value新增一个__ob__属性，值为该value的Observer实例
    // 相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
    } else {
      this.work(value);
    }
  }
  work(obj) {
    const keys = Object.keys(obj);
    for (let key of keys) {
      console.log('key===', key);
      key !== '__ob__' && defineReactive(obj, key);
    }
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  // 删除一个依赖
  removeSub(sub) {
    remove(this.subs, sub);
  }
  // 添加一个依赖
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  }
  // 通知所有依赖更新
  notify() {
    const subs = this.subs.slice();
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update();
    }
  }
}

class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = parsePath(expOrFn);
    this.value = this.get();
  }
  get() {
    window.target = this;
    const vm = this.vm;
    let value = this.getter.call(vm, vm);
    window.target = undefined;
    return value;
  }
  update() {
    const oldValue = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldValue);
  }
}

const bailRE = /[^\w.$]/;
function parsePath(path) {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.');
  return function(obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}

function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
}

function def(target, key, value) {
  target[key] = value;
}

function defineReactive(obj, key, val) {
  if (arguments.length === 2) {
    val = obj[key];
  }
  if (typeof val === 'object') {
    // 如果此时val 为对象，则调用Observer 对齐递归绑定监听
    new Observer(val);
  }
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(key + '被获取了');
      dep.depend();
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      console.log(`${key} 被更新为${newVal}`);
      val = newVal;
      dep.notify();
    }
  });
}

// 监听一个对象

let car = {
  brand: 'BMW',
  price: 3000
};

new Observer(car);

car.brand = '123';
car.price = 900;
console.log(car.brand);
