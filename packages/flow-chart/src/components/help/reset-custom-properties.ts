import type { CustomNodeProperty } from '../types/custom-properties';

/**
 * 获取节点默认的自定义属性
 */
export function getNodeCustomDefaultProperties(): Required<CustomNodeProperty> {
  return {
    backgroundColor: 'rgba(255, 255, 215, 1)',
  };
}
