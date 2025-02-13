/**
 * 边 -- 箭头类型
 */
export enum EdgeArrowTypeEnum {
  /**
   * 全箭头
   */
  FULL = 'full-arrow',

  /**
   * 半箭头
   */
  HALF = 'half',

  /**
   * 空心箭头
   */
  HOLLOW = 'hollow',
}

/**
 * 边 -- 连线类型
 */
export enum EdgeTypeEnum {
  /**
   * 曲线
   */
  PRO_BEZIER = 'pro-bezier',

  /**
   * 圆角线段
   */
  PRO_CURVED = 'pro-curved',

  /**
   * 直线
   */
  PRO_LINE = 'pro-line',

  /**
   * 线段
   */
  PRO_POLYLINE = 'pro-polyline',
}

export type EdgeShapeOptions = {
  label: string;
  shape: any;
  value: EdgeArrowTypeEnum;
};

export type ClassEdgeEndShapeStyleOptions = {
  shapeAttr?: Record<string, any>;
};
