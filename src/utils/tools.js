
export const isArray = (arr) => Object.prototype.toString.call(arr) === "[object Array]";

export const isString = (str) => Object.prototype.toString.call(str) === "[object String]";

export const isObject = (obj) => Object.prototype.toString.call(obj) === "[object Object]";

export const isNumber = (num) => Object.prototype.toString.call(num) === "[object Number]";

export const isFunction = (fn) => Object.prototype.toString.call(fn) === "[object Function]";

export const isNull = (fn) => Object.prototype.toString.call(fn) === "[object Null]";

/**
 *
 * @param {val} 判断是否为空
 * @return true 传入为空 false 不为空
 */
export const isEmpty = (val) => {
    if (isArray(val) && val.length === 0) {
        return true;
    } else if (isString(val) && val === '') {
        return true;
    } else if (isNull(val)) {
        return true;
    } else if (isObject(val) && Object.keys(val).length === 0) {
        return true
    } else if (!val) {
        return true;
    }

    return false;
}

// JSON 去重
// JSON 格式 [{ id: 1, name: 'aa' }]
export const ToRepeat = (list) => {
    for (var i = 0; i < list.length; i++) {
        for (var j = i+1; j < list.length; ) {
            if (list[i].id === list[j].id) { //通过id属性进行匹配；
               list.splice(j, 1); //去除重复的对象；
            }else {
               j++;
            }
        }
   }
   return list;
}

// 去除数组中为空的项
// 数组格式 [{ id: 1, name: 'aa' }]
export const resetArray = (list) => {
    return list.reduce((acc, v) => {
        if (v.name || v.id) {
            acc.push(v);
        }

        return acc;
    }, [])
}

/**
 *
 * url 中截取key
 * @param keyValue 需要截取的 key
 */
export const getQuery = (keyValue) => {
    var search = location.search.slice(1);
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == keyValue) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
