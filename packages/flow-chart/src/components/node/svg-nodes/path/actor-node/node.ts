/**
 * 人物
 */
import { h } from '@logicflow/core';

import { CusRect } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class ActorNodeModel extends CusRect.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 40;
    this.height = 80;
  }
}

class ActorNodeView extends CusRect.view {
  override getShape() {
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
