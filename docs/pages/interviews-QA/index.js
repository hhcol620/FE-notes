function arrFlat (arr, deep = 1) {
    const result  = [];
    (function flat(arr, deep) {
        arr.forEach(item => {
            if(Array.isArray(item) && deep > 0) {
                flat(item, deep - 1)
            } else {
                result.push(item)
            }
        });
    })(arr, deep)
    return result;
}

let arr = [1,3,4,5,[2,4,5,2,1,[3,5,3,[3,1,1]]]]

console.log(arrFlat(arr, 2))