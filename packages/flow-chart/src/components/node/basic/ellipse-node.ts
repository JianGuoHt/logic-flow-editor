import CircleNode from './circle-node';

class EllipseNodeModel extends CircleNode.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 60;
    this.ry = 30;
  }
}

export default {
  model: EllipseNodeModel,
  type: 'pro-ellipse',
  view: CircleNode.view,
};
