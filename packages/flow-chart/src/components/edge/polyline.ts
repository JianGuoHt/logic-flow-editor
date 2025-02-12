/**
 * 直角折线
 */

import LogicFlow, { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';
import { merge } from 'lodash-es';

import { getEdgeConfig } from '../config/edge';
import {
  formatShapeStyleMapping,
  formatShapeTextStyleMapping,
} from '../node/utils/transform-style';
import { EdgeEndShapeStyle, getActiveEdgeEndShapeType } from './help';

/**
 * edge 直角折线 -- Model
 */
class ProPolylineEdgeModel extends PolylineEdgeModel {
  override getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return merge(style, formatShapeStyleMapping(properties));
  }

  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return merge(style, formatShapeTextStyleMapping(properties));
  }

  override initEdgeData(data: LogicFlow.EdgeConfig<LogicFlow.PropertiesType>) {
    super.initEdgeData(data);
    const { defaultLineWidth } = getEdgeConfig();
    this.setProperties({
      arrowType: getActiveEdgeEndShapeType(),
      borderWidth:
        Number(localStorage.getItem('LF_edgeBorderWidth')) || defaultLineWidth,
    });
  }
}

/**
 * edge 直角折线 -- View
 */
class ProPolylineEdge extends PolylineEdge {
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
  model: ProPolylineEdgeModel,
  type: 'pro-polyline',
  view: ProPolylineEdge,
};
