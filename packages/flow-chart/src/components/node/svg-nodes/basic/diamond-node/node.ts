/**
 * 菱形
 */

import type { CustomNodeLayerProperty } from '#/components/types/custom-properties';

import { h } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { CusDiamond } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class DiamondNodeModel extends CusDiamond.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;

    this.setProperties(
      merge(
        {
          _cus_layer: { name: '菱形' } as CustomNodeLayerProperty,
        },
        data.properties,
      ),
    );
  }
}

class DiamondNodeView extends CusDiamond.view {
  override getShape() {
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
  type: 'svg-diamond',
  view: DiamondNodeView,
};
