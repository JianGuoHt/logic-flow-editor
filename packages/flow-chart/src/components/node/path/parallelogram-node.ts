import { h } from '@logicflow/core';
import { RectResize } from '@logicflow/extension';

import { getNodeCustomDefaultProperties } from '#/components/help/reset-custom-properties';

import { getShapeImage } from '../utils/shape-image';
import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

// 平行四边形
class ParallelogramNodeModel extends RectResize.model {
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  // 设置调整边框样式
  override getResizeOutlineStyle() {
    return {
      fill: 'transparent',
      stroke: '#000000',
      strokeDasharray: '3,3',
      strokeWidth: 1,
    };
  }

  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();
    return transformTextStyleMapping(style, properties);
  }

  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 100;
    this.height = 60;

    this.setProperties({
      ...getNodeCustomDefaultProperties(),
    });
  }
}

class ParallelogramNodeView extends RectResize.view {
  override getResizeShape() {
    const { height, width, x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const pointList = [
      [x - width / 2, y + height / 2],
      [x - width / 5, y - height / 2],
      [x + width / 2, y - height / 2],
      [x + width / 5, y + height / 2],
    ];
    const points = pointList.map((item) => {
      return `${item[0]},${item[1]}`;
    });
    const attrs = {
      ...style,
      height,
      points: points.join(' '),
      width,
      x,
      y,
    };
    const doms = [h('polygon', { ...attrs })];
    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: ParallelogramNodeModel,
  type: 'pro-parallelogram',
  view: ParallelogramNodeView,
};
