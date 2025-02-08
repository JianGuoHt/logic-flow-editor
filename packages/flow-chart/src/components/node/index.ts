import type LogicFlow from '@logicflow/core';

import DownArrowNode from './arrow/down-arrow-node';
import HorizontalArrowNode from './arrow/horizontal-arrow-node';
import LeftArrow from './arrow/left-arrow';
import RightArrow from './arrow/right-arrow';
import UpArrowNode from './arrow/up-arrow-node';
import VerticalArrowNode from './arrow/vertical-arrow-node';
import CircleNode from './basic/circle-node';
import DiamondNode from './basic/diamond-node';
import EllipseNode from './basic/ellipse-node';
import RectNode from './basic/rect-node';
import RectRadiusNode from './basic/rect-radius-node';
import Bezier from './edge/bezier';
import Line from './edge/line';
import Polyline from './edge/polyline';
// import ProGroupModel from './group/pro-group';
import CustomImageNode from './image/custom-image-node';
import UserImageNode from './image/user-image-node';
import ActorNode from './path/actor-node';
import CylinderNode from './path/cylinder-node';
import ParallelogramNode from './path/parallelogram-node';
import TriangleNode from './path/triangle-node';

/**
 * 注册自定义节点
 */
export const registerCustomElement = (lf: LogicFlow) => {
  // 基础图形
  lf.register(CircleNode);
  lf.register(RectNode);
  lf.register(RectRadiusNode);
  lf.register(TriangleNode);
  lf.register(EllipseNode);
  lf.register(DiamondNode);
  lf.register(CylinderNode);
  lf.register(ActorNode);
  lf.register(ParallelogramNode);
  lf.register(DownArrowNode);
  lf.register(HorizontalArrowNode);
  lf.register(LeftArrow);
  lf.register(RightArrow);
  lf.register(UpArrowNode);
  lf.register(VerticalArrowNode);

  // 分组
  // lf.register(ProGroupModel);

  // 边
  lf.register(Line);
  lf.register(Polyline);
  lf.register(Bezier);

  // image绘制图片节点
  lf.register(UserImageNode);
  lf.register(CustomImageNode);
};
