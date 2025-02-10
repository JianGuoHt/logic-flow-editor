/**
 * 自定义可缩放圆形
 */

import { EllipseResize } from '@logicflow/extension';

import { getNodeCustomDefaultProperties } from '#/components/help/reset-custom-properties';

import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

class CusEllipseResizeModel extends EllipseResize.model {
  /**
   * 支持重写 获取当前节点样式
   */
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  /**
   * 支持重写 获取当前节点文本样式
   */
  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return transformTextStyleMapping(style, properties);
  }

  /**
   * 可以重写 初始化节点数据 initNodeData 和 setAttributes 的区别在于 initNodeData 只在节点初始化的时候调用，用于初始化节点的所有属性。 setAttributes 除了初始化调用外，还会在 properties 发生变化了调用。
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

class CusEllipseResizeView extends EllipseResize.view {}

export default {
  model: CusEllipseResizeModel,
  type: 'cus-ellipse-resize',
  view: CusEllipseResizeView,
};
