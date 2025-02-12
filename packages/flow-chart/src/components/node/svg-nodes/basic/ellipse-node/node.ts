/**
 * 椭圆
 */

import { CusEllipse } from '../../../basic';

class EllipseNodeModel extends CusEllipse.model {
  override initNodeData(data: any) {
    super.initNodeData(data);

    this.setProperties({
      rx: 60,
      ry: 30,
    });
  }
}

class EllipseNodeView extends CusEllipse.view {}

export default {
  model: EllipseNodeModel,
  type: 'svg-ellipse',
  view: EllipseNodeView,
};
