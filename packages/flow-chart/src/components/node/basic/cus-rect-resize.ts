/**
 * 自定义可缩放矩形
 */

import { RectResize } from '@logicflow/extension';

import { getNodeCustomDefaultProperties } from '#/components/help/reset-custom-properties';

import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

class CusRectResizeModel extends RectResize.model {
  // constructor(data: any, graphModel: any) {
  //   super(data, graphModel);
  // }

  /**
   * 节点样式处理
   */
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  /**
   * 设置调整边框样式
   */
  // override getResizeOutlineStyle() {
  //   return this.graphModel.theme.resizeOutline;

  //   // return {
  //   //   fill: 'transparent',
  //   //   stroke: '#1890ff',
  //   //   strokeDasharray: '3,3',
  //   //   strokeWidth: 1,
  //   // };
  // }

  /**
   * 文本样式
   */
  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return transformTextStyleMapping(style, properties);
  }

  /**
   * 初始化节点数据
   */
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 50;
    this.height = 50;
    this.setProperties({
      ...getNodeCustomDefaultProperties(),
    });
  }
}

class CusRectResizeView extends RectResize.view {}

export default {
  model: CusRectResizeModel,
  type: 'cus-rect-resize',
  view: CusRectResizeView,
};
