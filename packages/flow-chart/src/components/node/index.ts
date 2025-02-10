import type LogicFlow from '@logicflow/core';

import Bezier from '../edge/bezier';
import Line from '../edge/line';
import Polyline from '../edge/polyline';
import { UserImageNode } from './image-nodes';
import { DownArrowNode, HorizontalArrowNode } from './svg-nodes';

/**
 * 注册自定义节点
 */
export const registerCustomElement = (lf: LogicFlow) => {
  // 基础图形
  lf.register(DownArrowNode);
  lf.register(HorizontalArrowNode);

  // 分组
  // lf.register(ProGroupModel);

  // 边
  lf.register(Line);
  lf.register(Polyline);
  lf.register(Bezier);

  // image绘制图片节点
  lf.register(UserImageNode);
};
