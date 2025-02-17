import type LogicFlow from '@logicflow/core';

import { CurvedEdge, CurvedEdgeModel } from '@logicflow/extension';
import { merge } from 'es-toolkit';

import { formatSvgShapeStyleMapping } from '../node/utils/transform-style';
import { EdgeEndShapeStyle, getActiveEdgeEndShapeType } from './help';
import { EdgeTypeEnum } from './types';

class ProCurvedEdgeModel extends CurvedEdgeModel {
  override getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return merge(style, formatSvgShapeStyleMapping(properties));
  }

  override initEdgeData(data: LogicFlow.EdgeConfig<LogicFlow.PropertiesType>) {
    super.initEdgeData(data);
    this.radius = 10;
    this.setProperties({
      arrowType: getActiveEdgeEndShapeType(),
    });
  }
}

class ProCurvedEdge extends CurvedEdge {
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
  model: ProCurvedEdgeModel,
  type: EdgeTypeEnum.PRO_CURVED,
  view: ProCurvedEdge,
};
