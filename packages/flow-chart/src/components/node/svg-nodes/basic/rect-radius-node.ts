/**
 * 圆角矩形
 */
import { CusRect } from '../../basic';

class RectRadiusModel extends CusRect.model {
  override setAttributes() {
    super.setAttributes();
    this.radius = 20;
  }
}

class RectRadiusView extends CusRect.view {}

export default {
  model: RectRadiusModel,
  type: 'pro-rect-radius',
  view: RectRadiusView,
};
