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

3. 数组展开

4. instanceof 实现