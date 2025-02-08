const toString = Object.prototype.toString;

/**
 * @description: 判断值是否未某个类型
 */
export function is(val: any, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

/**
 * @description:  是否为函数
 */
export function isFunction(val: any) {
  return is(val, 'Function') || is(val, 'AsyncFunction');
}

/**
 * @description: 是否为对象
 */
export function isObject(val: null) {
  return val !== null && is(val, 'Object');
}

/**
 * @description:  是否为时间
 */
export function isDate(val: any) {
  return is(val, 'Date');
}

/**
 * @description:  是否为数值
 */
export function isNumber(val: any) {
  return is(val, 'Number');
}

/**
 * @description 是否为数组
 */
export function isArray(val: any) {
  return val && Array.isArray(val);
}
