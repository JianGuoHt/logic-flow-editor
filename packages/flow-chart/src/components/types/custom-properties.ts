/**
 * 自定义节点样式通用属性
 */
export type CustomNodeCommonStyleProperty = {
  // [key: string]: any;
  /** 背景色 */
  backgroundColor?: string;
  /** 边框颜色 */
  borderColor?: string;
  /** 边框类型 */
  borderType?: 'dashed' | 'dotted' | 'solid';
  /** 边框宽度 */
  borderWidth?: number;
  // /** 文字字体 */
  // fontFamily?: string;
  // /** 文字大小 */
  // fontSize?: number;
  // /** 文字斜体 */
  // fontStyle?: 'italic' | 'normal';
  // /** 文字加粗 */
  // fontWeight?: 'bold' | 'normal';
  // /** 文字对齐方式 */
  // textAlign?: 'end' | 'middle' | 'start';
  // /** 文字背景色 */
  // textBackgroundColor?: string;
  // /** 文字颜色 */
  // textColor?: string;
  // /** 文字行高 */
  // textLineHeight?: number;
  /** x */
  x?: number;
  /** y */
  y?: number;
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
