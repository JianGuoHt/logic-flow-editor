import type { CustomNodeLayerProperty } from '#/components/types/custom-properties';

/**
 * 三角形
 */
import { h } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { CusRect } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class TriangleNodeModel extends CusRect.model {
  override initNodeData(data: any): void {
    super.initNodeData(data);

    this.setProperties(
      merge(
        {
          _cus_layer: { name: '三角形' } as CustomNodeLayerProperty,
        },
        data.properties,
      ),
    );
  }
}

class TriangleNodeView extends CusRect.view {
  override getShape() {
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
  type: 'svg-triangle',
  view: TriangleNodeView,
};
