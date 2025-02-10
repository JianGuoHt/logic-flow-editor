/**
 * 自定义节点样式通用属性
 */
export type CustomNodeCommonStyleProperty = {
  [key: string]: any;
  /** 背景色 */
  backgroundColor?: string;
};

/**
 * 自定义矩形节点属性
 */
export type CustomRectNodeProperty = {
  /** 高度 */
  height?: number;

  /** 宽度 */
  width?: number;
};

/**
 * 自定义圆形节点属性
 */
export type CustomCircleNodeProperty = {
  /** x 半径 */
  rx?: number;
  /** y 半径 */
  ry?: number;
};

export type CustomNodeAllStyleProperty = CustomCircleNodeProperty &
  CustomNodeCommonStyleProperty &
  CustomRectNodeProperty;
