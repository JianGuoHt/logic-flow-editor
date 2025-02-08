/**
 * 贝塞尔曲线
 */

import LogicFlow, { BezierEdge, BezierEdgeModel } from '@logicflow/core';

import { transformShapeStyleMapping } from '../node/utils/transform-style';
import { EdgeEndShapeStyle, getActiveEdgeEndShapeType } from './help';

/**
 * edge 贝塞尔曲线 -- Model
 */
class ProBezierEdgeModel extends BezierEdgeModel {
  override getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  override initEdgeData(data: LogicFlow.EdgeConfig<LogicFlow.PropertiesType>) {
    super.initEdgeData(data);
    this.setProperties({
      arrowType: getActiveEdgeEndShapeType(),
    });
  }
}

/**
 * edge 贝塞尔曲线 -- View
 */
class ProBezierEdge extends BezierEdge {
  override getEndArrow() {
    const { model } = this.props;
    const {
      properties: { arrowType },
    } = model;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const shapeAttr = {
      stroke,
      strokeWidth,
    };

    const cArrowType = new EdgeEndShapeStyle(arrowType, { shapeAttr });
    return cArrowType.getShape();
  }
}

export default {
  model: ProBezierEdgeModel,
  type: 'pro-bezier',
  view: ProBezierEdge,
};
