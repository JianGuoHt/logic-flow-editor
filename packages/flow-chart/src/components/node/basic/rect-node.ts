import { h } from '@logicflow/core';
import { RectResize } from '@logicflow/extension';

import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

class RectNodeModel extends RectResize.model {
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  /**
   * 设置调整边框样式
   */
  override getResizeOutlineStyle() {
    return {
      fill: 'transparent',
      stroke: 'red',
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

class RectNodeView extends RectResize.view {
  override getResizeShape() {
    const { model } = this.props;
    const { height, radius, width, x, y } = model;
    const style = model.getNodeStyle();
    const leftTopX = x - width / 2;
    const leftTopY = y - height / 2;

    const attrs = {
      height,
      rx: radius,
      ry: radius,
      width,
      x: leftTopX,
      y: leftTopY,
      ...style,
    };

    const doms = [h('rect', { ...attrs })];

    return h('g', {}, doms);
  }
}

export default {
  model: RectNodeModel,
  type: 'pro-rect',
  view: RectNodeView,
};
