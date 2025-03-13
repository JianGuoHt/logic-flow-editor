import { dynamicGroup } from '@logicflow/extension';
import { merge } from 'es-toolkit/compat';

import {
  getNodeCustomDefaultProperties,
  getRectNodeDefaultProperties,
} from '#/components/help/reset-custom-properties';

import {
  formatSvgShapeStyleMapping,
  formatSvgShapeTextStyleMapping,
} from '../utils/transform-style';

class CusDynamicGroupModel extends dynamicGroup.model {
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

class CusDynamicGroupView extends dynamicGroup.view {}

export default {
  model: CusDynamicGroupModel,
  type: 'cus-dynamic-group',
  view: CusDynamicGroupView,
};
