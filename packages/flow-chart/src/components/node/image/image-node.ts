import { h } from '@logicflow/core';

import RectNode from '../basic/rect-node';
import { getShapeImage } from '../utils/shape-image';
import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';

// 图片-基础节点
class ImageModel extends RectNode.model {
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return transformTextStyleMapping(style, properties);
  }

  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 80;
    this.height = 60;
  }
}

class ImageNode extends RectNode.view {
  override getResizeShape() {
    return h('g', {}, getShapeImage([], this.props));
  }
}

export default {
  model: ImageModel,
  type: 'pro-image-node',
  view: ImageNode,
};
