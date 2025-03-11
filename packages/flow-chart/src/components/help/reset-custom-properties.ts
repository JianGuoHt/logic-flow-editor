import type {
  CustomCircleNodeProperty,
  CustomNodeProperty,
  CustomRectNodeProperty,
} from '../types/custom-properties';

import { merge } from 'es-toolkit/compat';

/**
 * 获取节点默认的自定义属性
 */
export function getNodeCustomDefaultProperties(): CustomNodeProperty {
  return {
    _cus_style: {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      borderColor: 'rgba(0, 0, 0, 1)',
      borderType: 'solid',
      borderWidth: 1,
      // fontFamily: 'Arial',
      // fontSize: 12,
      // fontStyle: 'normal',
      // fontWeight: 'normal',
      // textAlign: 'middle',
      // textBackgroundColor: 'rgba(255, 255, 255, 1)',
      // textColor: 'rgba(0, 0, 0, 1)',
      // textLineHeight: 12,
    },
    x: 0,
    y: 0,
  };
}

/**
 * 获取矩形节点默认的自定义属性
 */
export function getRectNodeDefaultProperties(): Required<CustomRectNodeProperty> {
  return {
    height: 100,
    width: 100,
  };
}

/**
 * 获取圆形节点默认的自定义属性
 */
export function getCircleNodeDefaultProperties(): Required<CustomCircleNodeProperty> {
  return {
    rx: 50,
    ry: 50,
  };
}

/**
 * 获取节点的所有默认属性
 */
export function getNodeDefaultProperties(): CustomNodeProperty {
  return merge(
    {},
    getNodeCustomDefaultProperties(),
    getRectNodeDefaultProperties(),
    getCircleNodeDefaultProperties(),
  );
}
