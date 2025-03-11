import ArrowRight from '#/components/assets/icons/arrow-right.vue';
import Bezier from '#/components/assets/icons/bezier.vue';
import Curve from '#/components/assets/icons/curve.vue';
import HalfArrowRight from '#/components/assets/icons/half-arrow-right.vue';
import HorizontalLine from '#/components/assets/icons/horizontalLine.vue';
import LineSegment from '#/components/assets/icons/line-segment.vue';

import { EdgeArrowTypeEnum, EdgeTypeEnum } from '../edge/types';
/**
 * 获取边初始配置
 */
export const getEdgeConfig = () => {
  return {
    /**
     * 默认线的结束端显示样式
     */
    defaultEdgeEndShapeType: EdgeArrowTypeEnum.FULL,

    /**
     * 默认线的类型
     */
    defaultEdgeLineType: EdgeTypeEnum.PRO_POLYLINE,

    defaultLineWidth: 4,

    /**
     * 线的结束端显示样式
     */
    lineEndArrowTypes: [
      {
        icon: ArrowRight,
        label: '全箭头',
        value: EdgeArrowTypeEnum.FULL,
      },
      {
        icon: ArrowRight,
        label: '空心',
        value: EdgeArrowTypeEnum.HOLLOW,
      },
      {
        icon: HalfArrowRight,
        label: '半箭头',
        value: EdgeArrowTypeEnum.HALF,
      },
    ],

    /**
     * 线的类型
     */
    lineTypes: [
      {
        icon: Bezier,
        label: '曲线',
        value: EdgeTypeEnum.PRO_BEZIER,
      },
      {
        icon: HorizontalLine,
        label: '直线',
        value: EdgeTypeEnum.PRO_LINE,
      },
      {
        icon: LineSegment,
        label: '线段',
        value: EdgeTypeEnum.PRO_POLYLINE,
      },
      {
        icon: Curve,
        label: '圆角线段',
        value: EdgeTypeEnum.PRO_CURVED,
      },
    ],
  };
};
