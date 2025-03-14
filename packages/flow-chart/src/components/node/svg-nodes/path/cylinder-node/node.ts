import type { CustomNodeLayerProperty } from '#/components/types/custom-properties';

/**
 * 圆柱体
 */
import { h } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { CusRect } from '../../../basic';
import { getShapeImage } from '../../../utils/shape-image';

class CylinderNodeModel extends CusRect.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 60;
    this.height = 80;

    this.setProperties(
      merge(
        {
          _cus_layer: { name: '圆柱体' } as CustomNodeLayerProperty,
        },
        data.properties,
      ),
    );
  }
}

class CylinderNodeView extends CusRect.view {
  override getShape() {
    const { height, width, x, y } = this.props.model;
    const style = this.props.model.getNodeStyle();
    // 圆柱体顶部椭圆
    const ellipseAAttrs = {
      ...style,
      cx: x,
      cy: y - (1 / 3) * height,
      height,
      rx: (1 / 2) * width,
      ry: (1 / 6) * height,
      width,
    };
    // 圆柱体左直线
    const pathAAttrs = {
      ...style,
      d: `M ${x - (1 / 2) * width} ${y - (1 / 3) * height} L ${x - (1 / 2) * width} ${
        y + (1 / 3) * height
      }`,
    };
    // 圆柱体右直线
    const pathBAttrs = {
      ...style,
      d: `M ${x + (1 / 2) * width} ${y - (1 / 3) * height} L ${x + (1 / 2) * width} ${
        y + (1 / 3) * height
      }`,
    };
    // 圆柱体下椭圆
    const ellipseBAttrs = {
      ...style,
      cx: x,
      cy: y + (1 / 3) * height,
      height,
      rx: (1 / 2) * width,
      ry: (1 / 6) * height,
      width,
    };
    // 圆柱体中间填充部分
    const rectAttrs = {
      ...style,
      height: (2 / 3) * height,
      stroke: 'transparent',
      width,
      x: x - (1 / 2) * width,
      y: y - (1 / 3) * height,
    };
    const doms = [
      h('ellipse', {
        ...ellipseBAttrs,
      }),
      h('rect', {
        ...rectAttrs,
      }),
      h('path', {
        ...pathAAttrs,
      }),
      h('path', {
        ...pathBAttrs,
      }),
      h('ellipse', {
        ...ellipseAAttrs,
      }),
    ];

    return h('g', {}, getShapeImage(doms, this.props));
  }
}

export default {
  model: CylinderNodeModel,
  type: 'svg-cylinder',
  view: CylinderNodeView,
};
