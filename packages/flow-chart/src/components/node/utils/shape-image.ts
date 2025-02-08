import { h } from '@logicflow/core';

export function getShapeImage(doms: any, props: any, callback = () => {}) {
  const { model } = props;
  const {
    height,
    properties: { imageHeight, imageHref, imageWidth, imageZIndex },
    width,
    x,
    y,
  } = model;

  // 存在图片
  if (imageHref) {
    const defaultWidth = width;
    const defaultHeight = height;
    const style = model.getNodeStyle();
    const imgAttrs = {
      ...style,
      height: imageHeight === undefined ? defaultHeight : imageHeight,
      href: imageHref,

      width: imageWidth === undefined ? defaultWidth : imageWidth,
      x: x - width / 2,
      xlinkHref: imageHref,
      y: y - height / 2,
      // preserveAspectRatio: "none",
    };
    const imgDom = h('image', { ...imgAttrs });

    if (imageZIndex === 'bottom') {
      doms.unshift(imgDom);
    } else {
      doms.push(imgDom);
    }

    callback();
  }

  return doms;
}
