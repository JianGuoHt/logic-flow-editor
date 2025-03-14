import type { CustomNodeProperty } from '#/components/types/custom-properties';

import { RectNode, RectNodeModel } from '@logicflow/core';
import { merge } from 'es-toolkit/compat';

import { getNodeConfig } from '#/components/config/node';
import {
  getNodeCustomDefaultProperties,
  getRectNodeDefaultProperties,
} from '#/components/help/reset-custom-properties';

import {
  formatSvgShapeStyleMapping,
  formatSvgShapeTextStyleMapping,
} from '../utils/transform-style';

class CusRectModel extends RectNodeModel<CustomNodeProperty> {
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
    // this.width = 50;
    // this.height = 50;
    this.autoToFront = getNodeConfig().autoToFront;
    this.setProperties(
      merge(
        {},
        getNodeCustomDefaultProperties(),
        getRectNodeDefaultProperties(),
        data.properties,
      ),
    );
  }
}

class CusRectView extends RectNode {}

export default {
  model: CusRectModel,
  type: 'cus-rect',
  view: CusRectView,
};
