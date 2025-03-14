/**
 * 圆角矩形
 */
import type { CustomNodeLayerProperty } from '#/components/types/custom-properties';

import { merge } from 'es-toolkit';

import { CusRect } from '../../../basic';

class RectRadiusModel extends CusRect.model {
  override initNodeData(data: any): void {
    super.initNodeData(data);
    this.setProperties(
      merge(
        {
          _cus_layer: { name: '圆角矩形' } as CustomNodeLayerProperty,
        },
        data.properties,
      ),
    );
  }

  override setAttributes() {
    super.setAttributes();
    this.radius = 20;
  }
}

class RectRadiusView extends CusRect.view {}

export default {
  model: RectRadiusModel,
  type: 'svg-rect-radius',
  view: RectRadiusView,
};
