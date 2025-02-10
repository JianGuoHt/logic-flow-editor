/**
 * 自定义可缩放菱形
 */

import { DiamondResize } from '@logicflow/extension';

import { getNodeCustomDefaultProperties } from '#/components/help/reset-custom-properties';

import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

class CusDiamondResizeModel extends DiamondResize.model {
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

class CusDiamondResizeView extends DiamondResize.view {}

export default {
  model: CusDiamondResizeModel,
  type: 'cus-diamond-resize',
  view: CusDiamondResizeView,
};
