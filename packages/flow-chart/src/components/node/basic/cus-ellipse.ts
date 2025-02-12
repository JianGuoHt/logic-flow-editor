import { EllipseNode, EllipseNodeModel } from '@logicflow/core';
import { merge } from 'lodash-es';

import {
  getCircleNodeDefaultProperties,
  getNodeCustomDefaultProperties,
} from '#/components/help/reset-custom-properties';

import {
  formatShapeStyleMapping,
  formatShapeTextStyleMapping,
} from '../utils/transform-style';

class CusEllipseModel extends EllipseNodeModel {
  /**
   * 支持重写 获取当前节点样式
   */
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();

    const formatStyle = merge(style, formatShapeStyleMapping(properties, {}));

    return formatStyle;
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

    this.setProperties({
      ...getNodeCustomDefaultProperties(),
      ...getCircleNodeDefaultProperties(),
    });
  }
}

class CusEllipseView extends EllipseNode {}

export default {
  model: CusEllipseModel,
  type: 'cus-ellipse',
  view: CusEllipseView,
};
