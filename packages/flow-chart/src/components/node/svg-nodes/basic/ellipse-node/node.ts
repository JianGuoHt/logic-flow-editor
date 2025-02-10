/**
 * 椭圆
 */

import { CusEllipse } from '../../../basic';

class EllipseNodeModel extends CusEllipse.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 60;
    this.ry = 30;
  }
}

class EllipseNodeView extends CusEllipse.view {}

export default {
  model: EllipseNodeModel,
  type: 'pro-ellipse',
  view: EllipseNodeView,
};
