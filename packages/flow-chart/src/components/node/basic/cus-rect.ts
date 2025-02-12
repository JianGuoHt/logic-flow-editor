import { RectNode, RectNodeModel } from '@logicflow/core';
import { merge } from 'lodash-es';

import {
  getNodeCustomDefaultProperties,
  getRectNodeDefaultProperties,
} from '#/components/help/reset-custom-properties';

import {
  formatShapeStyleMapping,
  formatShapeTextStyleMapping,
} from '../utils/transform-style';

class CusRectModel extends RectNodeModel {
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
    // this.width = 50;
    // this.height = 50;
    this.setProperties({
      ...getNodeCustomDefaultProperties(),
      ...getRectNodeDefaultProperties(),
    });
  }
}

class CusRectView extends RectNode {}

export default {
  model: CusRectModel,
  type: 'cus-rect',
  view: CusRectView,
};
