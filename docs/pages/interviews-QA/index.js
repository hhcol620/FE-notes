// instanceof

// new
function newOperator(fn, ...args){
    if(typeof fn !== 'function') {
        throw new Error(fn + 'is not function')
    }
    const obj = Object.create(fn.prototype);
    const res = fn.call(obj, ...args);
    const isObjcet = typeof res === 'object' && res !== null
    const isFunction = typeof res === 'function'
    return isFunction || isObjcet ? res : obj;
}