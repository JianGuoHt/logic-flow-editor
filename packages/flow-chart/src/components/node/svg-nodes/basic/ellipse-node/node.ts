/**
 * 椭圆
 */

import type { CustomNodeLayerProperty } from '#/components/types/custom-properties';

import { merge } from 'es-toolkit';

import { CusEllipse } from '../../../basic';

class EllipseNodeModel extends CusEllipse.model {
  override initNodeData(data: any) {
    super.initNodeData(data);

    this.setProperties(
      merge(
        {
          _cus_layer: { name: '椭圆' } as CustomNodeLayerProperty,
          rx: 60,
          ry: 30,
        },
        data.properties,
      ),
    );
  }
}

class EllipseNodeView extends CusEllipse.view {}

export default {
  model: EllipseNodeModel,
  type: 'svg-ellipse',
  view: EllipseNodeView,
};
