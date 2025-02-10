/**
 * 平行四边形
 */
import { h } from '@logicflow/core';

import { CusRect } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class ParallelogramNodeModel extends CusRect.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 100;
    this.height = 60;
  }
}

class ParallelogramNodeView extends CusRect.view {
  override getShape() {
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
