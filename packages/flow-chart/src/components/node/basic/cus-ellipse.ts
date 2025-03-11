import { EllipseNode, EllipseNodeModel } from '@logicflow/core';
import { merge } from 'es-toolkit/compat';

import {
  getCircleNodeDefaultProperties,
  getNodeCustomDefaultProperties,
} from '#/components/help/reset-custom-properties';

import {
  formatSvgShapeStyleMapping,
  formatSvgShapeTextStyleMapping,
} from '../utils/transform-style';

class CusEllipseModel extends EllipseNodeModel {
  /**
   * 支持重写 获取当前节点样式
   */
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();

    const formatStyle = merge(style, formatSvgShapeStyleMapping(properties));

    return formatStyle;
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

    this.setProperties(
      merge(
        {},
        getNodeCustomDefaultProperties(),
        getCircleNodeDefaultProperties(),
        data.properties,
      ),
    );
  }
}

class CusEllipseView extends EllipseNode {}

export default {
  model: CusEllipseModel,
  type: 'cus-ellipse',
  view: CusEllipseView,
};
