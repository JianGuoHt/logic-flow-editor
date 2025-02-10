import { h } from '@logicflow/core';
import { DiamondResize } from '@logicflow/extension';

import { getNodeCustomDefaultProperties } from '#/components/help/reset-custom-properties';

import { getShapeImage } from '../utils/shape-image';
import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

// 菱形
class DiamondNodeModel extends DiamondResize.model {
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

    this.setProperties({
      ...getNodeCustomDefaultProperties(),
    });
  }
}

class DiamondNodeView extends DiamondResize.view {
  override getResizeShape() {
    const { model } = this.props;
    const { points, x, y } = model;
    const style = model.getNodeStyle();

    const attrs = {
      points,
      x,
      y,
      ...style,
    };
    const doms = [h('polygon', { ...attrs })];

    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: DiamondNodeModel,
  type: 'pro-diamond',
  view: DiamondNodeView,
};
