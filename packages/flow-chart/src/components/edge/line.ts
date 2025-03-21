/**
 * 直线
 */

import LogicFlow, { LineEdge, LineEdgeModel } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { formatSvgShapeStyleMapping } from '../node/utils/transform-style';
import { EdgeEndShapeStyle, getActiveEdgeEndShapeType } from './help';
import { EdgeTypeEnum } from './types';

/**
 * edge 直线 -- Model
 */
class ProLineEdgeModel extends LineEdgeModel {
  override getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return merge(style, formatSvgShapeStyleMapping(properties));
  }

  override initEdgeData(data: LogicFlow.EdgeConfig<LogicFlow.PropertiesType>) {
    super.initEdgeData(data);
    this.setProperties({
      arrowType: getActiveEdgeEndShapeType(),
    });
  }
}

/**
 * edge 直线 -- View
 */
class ProLineEdge extends LineEdge {
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
  model: ProLineEdgeModel,
  type: EdgeTypeEnum.PRO_LINE,
  view: ProLineEdge,
};
