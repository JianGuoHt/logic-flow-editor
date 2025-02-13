/**
 * 贝塞尔曲线
 */

import LogicFlow, { BezierEdge, BezierEdgeModel } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { formatShapeStyleMapping } from '../node/utils/transform-style';
import { EdgeEndShapeStyle, getActiveEdgeEndShapeType } from './help';
import { EdgeTypeEnum } from './types';

/**
 * edge 贝塞尔曲线 -- Model
 */
class ProBezierEdgeModel extends BezierEdgeModel {
  override getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return merge(style, formatShapeStyleMapping(properties));
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
  type: EdgeTypeEnum.PRO_BEZIER,
  view: ProBezierEdge,
};
