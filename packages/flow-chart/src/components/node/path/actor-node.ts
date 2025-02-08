import { h } from '@logicflow/core';
import { RectResize } from '@logicflow/extension';

import { getShapeImage } from '../utils/shape-image';
import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';
// 人物
class ActorNodeModel extends RectResize.model {
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

  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 40;
    this.height = 80;
  }
}

class ActorNodeView extends RectResize.view {
  override getResizeShape() {
    const { height, width, x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    // 人物头部圆形
    const ellipseAttrs = {
      ...style,
      cx: x,
      cy: y - (3 / 8) * height,
      height,
      rx: (1 / 4) * width,
      ry: (1 / 8) * height,
      width,
    };
    // 人物肩膀横线
    const pathAAttrs = {
      ...style,
      d: `M ${x - (1 / 2) * width} ${y - (1 / 8) * height} L ${x + (1 / 2) * width} ${
        y - (1 / 8) * height
      }`,
    };
    // 人物身体躯干竖线
    const pathBAttrs = {
      ...style,
      d: `M ${x} ${y - (1 / 4) * height} L ${x} ${y + (1 / 5) * height}`,
    };
    // 人物左腿斜线
    const pathCAttrs = {
      ...style,
      d: `M ${x} ${y + (1 / 5) * height} L ${x - (1 / 2) * width} ${y + (1 / 2) * height}`,
    };
    // 人物右腿斜线
    const pathDAttrs = {
      ...style,
      d: `M ${x} ${y + (1 / 5) * height} L ${x + (1 / 2) * width} ${y + (1 / 2) * height}`,
    };
    // 人物透明背景板
    const bgAttrs = {
      height,
      style: 'fill: transparent',
      width: (2 / 5) * width,
      x: x - (1 / 5) * width,
      y: y - (1 / 2) * height,
    };
    const doms = [
      h('ellipse', {
        ...ellipseAttrs,
      }),
      h('path', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathBAttrs,
      }),
      h('path', {
        ...pathCAttrs,
      }),
      h('path', {
        ...pathDAttrs,
      }),
      h('rect', {
        ...bgAttrs,
      }),
    ];
    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: ActorNodeModel,
  type: 'pro-actor',
  view: ActorNodeView,
};
