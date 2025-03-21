/**
 * 直角折线
 */

import LogicFlow, { PolylineEdge, PolylineEdgeModel } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { getEdgeConfig } from '../config/edge';
import {
  formatSvgShapeStyleMapping,
  formatSvgShapeTextStyleMapping,
} from '../node/utils/transform-style';
import { EdgeEndShapeStyle, getActiveEdgeEndShapeType } from './help';
import { EdgeTypeEnum } from './types';

/**
 * edge 直角折线 -- Model
 */
class ProPolylineEdgeModel extends PolylineEdgeModel {
  override getEdgeStyle() {
    const style = super.getEdgeStyle();
    const properties = this.getProperties();
    return merge(style, formatSvgShapeStyleMapping(properties));
  }

  override getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();

    return merge(style, formatSvgShapeTextStyleMapping(properties));
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
  type: EdgeTypeEnum.PRO_POLYLINE,
  view: ProPolylineEdge,
};
