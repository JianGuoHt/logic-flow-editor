import { h } from '@logicflow/core';
import { EllipseResize } from '@logicflow/extension';

import { getShapeImage } from '../utils/shape-image';
import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

class CircleNodeModel extends EllipseResize.model {
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return transformTextStyleMapping(style, properties);
  }

  override initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;
  }
}

class CircleNodeView extends EllipseResize.view {
  override getResizeShape() {
    const { model } = this.props;
    const { rx, ry, x, y } = model;
    const style = model.getNodeStyle();

    const attrs = {
      cx: x,
      cy: y,
      rx,
      ry,
      x,
      y,
      ...style,
    };

    const doms = [h('ellipse', { ...attrs })];

    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: CircleNodeModel,
  type: 'pro-circle',
  view: CircleNodeView,
};
