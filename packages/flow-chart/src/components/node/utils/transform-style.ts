import type LogicFlow from '@logicflow/core';

import type { CustomNodeAllStyleProperty } from '#/components/types/custom-properties';

/**
 * 形状样式处理
 */
export function formatShapeStyleMapping(
  properties: CustomNodeAllStyleProperty,
) {
  const style: Record<string, any> = {};

  // 背景色
  if (properties.backgroundColor) {
    style.fill = properties.backgroundColor;
  }

  // 边框颜色
  if (properties.borderColor) {
    style.stroke = properties.borderColor;
  }

  // 边框宽度
  if (properties.borderWidth) {
    style.strokeWidth = properties.borderWidth;
  }

  // 形状边框样式
  if (properties.borderType) {
    if (properties.borderType === 'solid') {
      style.strokeDashArray = '0';
      style.strokeDasharray = '0';
    }
    if (properties.borderType === 'dashed') {
      style.strokeDashArray = '3 3';
      style.strokeDasharray = '3 3';
    }
    if (properties.borderType === 'dotted') {
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
export function formatShapeTextStyleMapping(
  properties: CustomNodeAllStyleProperty,
) {
  const style = {} as LogicFlow.TextTheme;

  if (properties.textColor) {
    style.color = properties.textColor;
  }

  // if (properties.fontFamily) {
  //   style.fontFamily = properties.fontFamily;
  // }

  if (properties.fontSize) {
    style.fontSize = properties.fontSize;
  }

  // if (properties.textLineHeight) {
  //   style.lineHeight = properties.textLineHeight;
  // }

  if (properties.textAlign) {
    style.textAnchor = properties.textAlign;
  }

  if (properties.fontWeight) {
    style.fontWeight = properties.fontWeight;
  }

  if (properties.fontStyle) {
    style.fontStyle = properties.fontStyle;
  }

  // if (properties.textBackgroundColor) {
  //   style.background = { fill: properties.textBackgroundColor };
  // }

  return style;
}
