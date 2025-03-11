/**
 * 生成所有key调用链
 * 例：
 * 'rx' | 'ry' | 'style.backgroundColor' | 'style.borderColor' | 'style.borderType'
 */
export type DeepObjectKeys<T> = T extends object
  ? {
      [K in keyof T & (number | string)]: `${K}.${DeepObjectKeys<T[K]>}` | K;
    }[keyof T & (number | string)]
  : never;
