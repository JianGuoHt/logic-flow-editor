import LogicFlow, { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';

import { defaultArrowType, defaultLineWidth } from '../../config/edge';
import {
  transformShapeStyleMapping,
  transformTextStyleMapping,
} from '../utils/transform-style';
import { ArrowType } from './arrow-type';

// 直角折线
class ProPolylineEdgeModel extends PolylineEdgeModel {
  override getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return transformShapeStyleMapping(style, properties);
  }

  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return transformTextStyleMapping(style, properties);
  }

  override initEdgeData(data: LogicFlow.EdgeConfig<LogicFlow.PropertiesType>) {
    super.initEdgeData(data);
    this.setProperties({
      arrowType: localStorage.getItem('LF_endArrowType') || defaultArrowType,
      borderWidth:
        Number(localStorage.getItem('LF_edgeBorderWidth')) || defaultLineWidth,
    });
  }
}

class ProPolylineEdge extends PolylineEdge {
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
  model: ProPolylineEdgeModel,
  type: 'pro-polyline',
  view: ProPolylineEdge,
};
