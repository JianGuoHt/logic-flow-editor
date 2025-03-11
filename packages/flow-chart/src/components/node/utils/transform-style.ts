import type LogicFlow from '@logicflow/core';

import type {
  CustomNodeAllStyleProperty,
  CustomNodeProperty,
} from '#/components/types/custom-properties';

/**
 * 形状样式处理
 */
export function formatSvgShapeStyleMapping(
  properties: Partial<CustomNodeProperty>,
) {
  const style: Record<string, any> = {};

  // 背景色
  if (properties._cus_style?.backgroundColor) {
    style.fill = properties._cus_style?.backgroundColor;
  }

  // 边框颜色
  if (properties._cus_style?.borderColor) {
    style.stroke = properties._cus_style?.borderColor;
  }

  // 边框宽度
  if (properties._cus_style?.borderWidth) {
    style.strokeWidth = properties._cus_style?.borderWidth;
  }

  // 形状边框样式
  if (properties._cus_style?.borderType) {
    if (properties._cus_style.borderType === 'solid') {
      style.strokeDashArray = '0';
      style.strokeDasharray = '0';
    }
    if (properties._cus_style.borderType === 'dashed') {
      style.strokeDashArray = '3 3';
      style.strokeDasharray = '3 3';
    }
    if (properties._cus_style.borderType === 'dotted') {
      style.strokeDashArray = '1 1';
      style.strokeDasharray = '1 1';
    }
    // if (properties.borderStyle === 'hidden') {
    //   style.stroke = style.fill;
    // }
  }

  return style;
}

// 形状字体样式处理
export function formatSvgShapeTextStyleMapping(
  _properties: CustomNodeAllStyleProperty,
) {
  const style = {} as LogicFlow.TextTheme;

  // if (properties.textColor) {
  //   style.color = properties.textColor;
  // }

  // if (properties.fontFamily) {
  //   style.fontFamily = properties.fontFamily;
  // }

  // if (properties.fontSize) {
  //   style.fontSize = properties.fontSize;
  // }

  // if (properties.textLineHeight) {
  //   style.lineHeight = properties.textLineHeight;
  // }

  // if (properties.textAlign) {
  //   style.textAnchor = properties.textAlign;
  // }

  // if (properties.fontWeight) {
  //   style.fontWeight = properties.fontWeight;
  // }

  // if (properties.fontStyle) {
  //   style.fontStyle = properties.fontStyle;
  // }

  // if (properties.textBackgroundColor) {
  //   style.background = { fill: properties.textBackgroundColor };
  // }

  return style;
}
