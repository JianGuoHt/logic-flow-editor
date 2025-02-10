import { h } from '@logicflow/core';

import { getShapeImage } from '../utils/shape-image';
import CusRect from './cus-rect';

// 图片-基础节点
class ImageModel extends CusRect.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 60;
  }
}

class ImageNode extends CusRect.view {
  override getShape() {
    return h('g', {}, getShapeImage([], this.props));
  }
}

export default {
  model: ImageModel,
  type: 'pro-image-node',
  view: ImageNode,
};
