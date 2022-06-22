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

5. 实现new