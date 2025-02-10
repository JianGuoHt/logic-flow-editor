import type {
  CustomCircleNodeProperty,
  CustomNodeAllStyleProperty,
  CustomNodeCommonStyleProperty,
  CustomRectNodeProperty,
} from '../types/custom-properties';

/**
 * 获取节点默认的自定义属性
 */
export function getNodeCustomDefaultProperties(): Required<CustomNodeCommonStyleProperty> {
  return {
    backgroundColor: 'rgba(255, 255, 215, 1)',
  };
}

/**
 * 获取矩形节点默认的自定义属性
 */
export function getRectNodeDefaultProperties(): Required<CustomRectNodeProperty> {
  return {
    height: 50,
    width: 50,
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
export function getNodeDefaultProperties(): Required<CustomNodeAllStyleProperty> {
  return {
    ...getNodeCustomDefaultProperties(),
    ...getRectNodeDefaultProperties(),
    ...getCircleNodeDefaultProperties(),
  };
}
