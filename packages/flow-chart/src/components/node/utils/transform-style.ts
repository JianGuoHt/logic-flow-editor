// 形状样式处理
export function transformShapeStyleMapping(style: any, properties: any) {
  // 背景色
  if (properties.backgroundColor) {
    style.fill = properties.backgroundColor;
  }

  // 线条颜色
  if (properties.borderColor) {
    style.stroke = properties.borderColor;
  }

  // 线条宽度
  if (properties.borderWidth) {
    style.strokeWidth = properties.borderWidth;
  }

  // 形状线条样式
  if (properties.borderStyle) {
    if (properties.borderStyle === 'solid') {
      style.strokeDashArray = '0';
      style.strokeDasharray = '0';
    }
    if (properties.borderStyle === 'dashed') {
      style.strokeDashArray = '3 3';
      style.strokeDasharray = '3 3';
    }
    if (properties.borderStyle === 'dotted') {
      style.strokeDashArray = '1 1';
      style.strokeDasharray = '1 1';
    }
    if (properties.borderStyle === 'hidden') {
      style.stroke = style.fill;
    }
  }

  return style;
}

// 形状字体样式处理
export function transformTextStyleMapping(style: any, properties: any) {
  if (properties.fontColor) {
    style.color = properties.fontColor;
  }

  if (properties.fontFamily) {
    style.fontFamily = properties.fontFamily;
  }

  if (properties.fontSize) {
    style.fontSize = properties.fontSize;
  }

  if (properties.lineHeight) {
    style.lineHeight = properties.lineHeight;
  }

  if (properties.textAlign) {
    style.textAlign = properties.textAlign;
  }

  if (properties.fontWeight) {
    style.fontWeight = properties.fontWeight;
  }

  if (properties.fontStyle) {
    style.fontStyle = properties.fontStyle;
  }

  if (properties.fontBackgroundColor) {
    style.backgroundColor = properties.fontBackgroundColor;
  }

  return style;
}
