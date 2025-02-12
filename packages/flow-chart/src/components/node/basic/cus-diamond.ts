import { DiamondNode, DiamondNodeModel } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { getNodeCustomDefaultProperties } from '#/components/help/reset-custom-properties';

import {
  formatShapeStyleMapping,
  formatShapeTextStyleMapping,
} from '../utils/transform-style';

class CusDiamondModel extends DiamondNodeModel {
  /**
   * 支持重写 获取当前节点样式
   */
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return merge(style, formatShapeStyleMapping(properties));
  }

  /**
   * 支持重写 获取当前节点文本样式
   */
  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return merge(style, formatShapeTextStyleMapping(properties));
  }

  /**
   * 初始化节点数据
   */
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;

    this.setProperties({
      ...getNodeCustomDefaultProperties(),
    });
  }
}

class CusDiamondView extends DiamondNode {}

export default {
  model: CusDiamondModel,
  type: 'cus-ellipse',
  view: CusDiamondView,
};
