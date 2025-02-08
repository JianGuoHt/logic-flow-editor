import { h } from '@logicflow/core';
import { RectResize } from '@logicflow/extension';

import { getShapeImage } from '../utils/shape-image';
import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

class TriangleNodeModel extends RectResize.model {
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  // 设置调整边框样式
  override getResizeOutlineStyle() {
    return {
      fill: 'transparent',
      stroke: '#000000',
      strokeDasharray: '3,3',
      strokeWidth: 1,
    };
  }

  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();
    return transformTextStyleMapping(style, properties);
  }
}

class TriangleNodeView extends RectResize.view {
  override getResizeShape() {
    const { model } = this.props;
    const { height, width, x, y } = model;
    const style = model.getNodeStyle();
    const attrs = {
      ...style,
      height,
      points: [
        [x - width / 2, y + height / 2],
        [x - width / 2, y - height / 2],
        [x + width / 2, y],
      ],
      width,
      x,
      y,
    };

    const doms = [h('polygon', { ...attrs })];

    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: TriangleNodeModel,
  type: 'pro-triangle',
  view: TriangleNodeView,
};
