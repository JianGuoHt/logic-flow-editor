import { DiamondNode, DiamondNodeModel } from '@logicflow/core';
import { merge } from 'es-toolkit/compat';

import { getNodeConfig } from '#/components/config/node';
import { getNodeCustomDefaultProperties } from '#/components/help/reset-custom-properties';

import {
  formatSvgShapeStyleMapping,
  formatSvgShapeTextStyleMapping,
} from '../utils/transform-style';

class CusDiamondModel extends DiamondNodeModel {
  /**
   * 支持重写 获取当前节点样式
   */
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return merge(style, formatSvgShapeStyleMapping(properties));
  }

  /**
   * 支持重写 获取当前节点文本样式
   */
  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return merge(style, formatSvgShapeTextStyleMapping(properties));
  }

  /**
   * 初始化节点数据
   */
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;
    this.autoToFront = getNodeConfig().autoToFront;

    this.setProperties(
      merge({}, getNodeCustomDefaultProperties(), data.properties),
    );
  }
}

class CusDiamondView extends DiamondNode {}

export default {
  model: CusDiamondModel,
  type: 'cus-ellipse',
  view: CusDiamondView,
};
