import RectNode from './rect-node';

class RectRadiusModel extends RectNode.model {
  override setAttributes() {
    super.setAttributes();
    this.radius = 20;
  }
}

export default {
  model: RectRadiusModel,
  type: 'pro-rect-radius',
  view: RectNode.view,
};
