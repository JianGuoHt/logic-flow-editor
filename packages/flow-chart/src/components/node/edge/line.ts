import LogicFlow, { LineEdge, LineEdgeModel } from '@logicflow/core';

import { defaultArrowType } from '../../config/edge';
import { transformShapeStyleMapping } from '../utils/transform-style';
import { ArrowType } from './arrow-type';

// 直线
class ProLineEdgeModel extends LineEdgeModel {
  override getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  override initEdgeData(data: LogicFlow.EdgeConfig<LogicFlow.PropertiesType>) {
    super.initEdgeData(data);
    this.setProperties({
      arrowType: localStorage.getItem('LF_endArrowType') || defaultArrowType,
    });
  }
}

class ProLineEdge extends LineEdge {
  override getEndArrow() {
    const { model } = this.props;
    const {
      properties: { arrowType },
    } = model;
    const { stroke, strokeWidth } = model.getArrowStyle();
    const pathAttr = {
      stroke,
      strokeWidth,
    };

    const cArrowType = new ArrowType(pathAttr, arrowType);
    return cArrowType.getShape();
  }
}

export default {
  model: ProLineEdgeModel,
  type: 'pro-line',
  view: ProLineEdge,
};
