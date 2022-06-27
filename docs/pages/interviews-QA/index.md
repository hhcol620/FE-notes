### 面试真题

1. 字符串去除两端空格
    ```js
        function strTrim(str) {
            // return str.trim();
            return str.replace(/^\s+|\s+$/g, '');
        }

    ```
2. 数组去重
    ```js
        // 第一种方法
        function removeDuplicates(arr) {
            // return Array.from(new Set(arr))
            return [...new Set(arr)];
        }

        // 第二种方法
        function removeDuplicates(arr) {
            return arr.filter((v, i) => arr.indexOf(v) === i);
        }

        // 第三种方法 使用Map
        function removeDuplicates(arr) {
            let res = [];
            let map = new Map();
            arr.forEach(item => {
                if(!map.has(item)) {
                    res.push(item)
                    map.set(item, true);
                }
            });
            return res;
        }
    
    ```

3. 数组展开/ 拍平
    ```js
        // 第一种方法
        function arrFlat (arr, depth = 1) {
            return arr.flat(depth)
        }
        // 第二种方法
        function arrFlat (arr, depth = 1) {
            return depth > 0 ? arr.reduce((acc, cur) => {
                console.log('acc', acc)
                return acc.concat(Array.isArray(cur) ? arrFlat(cur, depth - 1) : cur)
            }, []) : arr.slice();
        }
        // 第三种方法
        function arrFlat (arr, depth = 1) {
            const result  = [];
            (function flat(arr, depth) {
                arr.forEach(item => {
                    if(Array.isArray(item) && depth > 0) {
                        flat(item, depth - 1)
                    } else {
                        result.push(item)
                    }
                });
            })(arr, depth)
            return result;
        }

    ```

4. instanceof 实现
    ```js
        function instance (left, right) {
            let prototype = right.prototype;
            let proto = left.__proto__;
            while(proto !== null) {
                if(proto === prototype) {
                    return true;
                }
                proto = proto.__proto__;
            }
            return false;
        }

        let obj = {a: 10}
        console.log(instance(obj, Object)) // true

        function Parent() {
            this.a = 1;
        }
        let obj2 = new Parent();
        console.log(instance(obj2, Parent)) // true
        console.log(instance(obj2, Object)) // true
    ```

5. 实现new 执行了哪些功能呢
    * 首先创建一个对象
    * 将构造函数的原型挂载到该对象上
    * 执行构造函数，并绑定this为刚新创建的对象
    * 判断构造函数的执行结果，如果为对象或者是函数，则返回构造函数的返回值，否则返回新创建的对象
    ```js
        function newOperator(fn, ...args){
            if(typeof fn !== 'function') {
                throw new TypeError(fn + 'is not function')
            }
            const obj = Object.create(fn.prototype);
            const res = fn.call(obj, ...args);
            const isObjcet = typeof res === 'object' && res !== null
            const isFunction = typeof res === 'function'
            return isFunction || isObjcet ? res : obj;
        }

    ```