import { h } from '@logicflow/core';
import { merge } from 'es-toolkit';

import { getEdgeConfig } from '#/components/config/edge';

import {
  type ClassEdgeEndShapeStyleOptions,
  EdgeArrowTypeEnum,
  type EdgeShapeOptions,
} from '../types';
import { EDGE_END_SHAPE_TYPE_STORAGE_KEY } from './constant';

/**
 * 获取线的结束端 当前的显示样式
 */
export function getActiveEdgeEndShapeType(): EdgeArrowTypeEnum {
  const cacheType = localStorage.getItem(
    EDGE_END_SHAPE_TYPE_STORAGE_KEY,
  ) as EdgeArrowTypeEnum | null;

  return cacheType || getEdgeConfig().defaultEdgeEndShapeType;
}

/**
 * 线的结束端显示样式
 */
export class EdgeEndShapeStyle {
  attr: Record<string, any> = {};
  shapeType = '';

  constructor(shapeType = 'default', options?: ClassEdgeEndShapeStyleOptions) {
    const __options = merge<
      Required<ClassEdgeEndShapeStyleOptions>,
      ClassEdgeEndShapeStyleOptions
    >(
      {
        shapeAttr: {},
      },
      options || {},
    );

    this.attr = __options.shapeAttr;
    this.shapeType = shapeType;
  }

  /**
   * 获取线的结束端显配置
   * @param key
   */
  getArrowType(key: EdgeArrowTypeEnum) {
    const { lineEndArrowTypes } = getEdgeConfig();
    const findConfig = lineEndArrowTypes.find((item) => item.value === key);

    if (!findConfig) {
      throw new Error(`未找到{${key}}配置`);
    }

    return findConfig;
  }

  getAttr() {
    return this.attr || {};
  }

  /**
   * 空心箭头
   */
  getEmptyArrowShape(): EdgeShapeOptions {
    const defaultConfig = this.getArrowType(EdgeArrowTypeEnum.HOLLOW);
    return {
      ...defaultConfig,
      shape: h('path', {
        d: 'M -10 0  -20 -5 -30 0 -20 5 z',
        fill: '#FFF',
        ...this.getAttr(),
      }),
    };
  }

  /**
   * 默认箭头
   */
  getFullArrowShape(): EdgeShapeOptions {
    const defaultConfig = this.getArrowType(EdgeArrowTypeEnum.FULL);

    return {
      ...defaultConfig,
      shape: h('path', {
        d: 'M 0 0 -10 -5 -10 5 z',
        ...this.getAttr(),
      }),
    };
  }

  /**
   * 半箭头
   */
  getHalfArrowShape(): EdgeShapeOptions {
    const defaultConfig = this.getArrowType(EdgeArrowTypeEnum.HALF);
    return {
      ...defaultConfig,
      shape: h('path', {
        b: 'bb',
        d: 'M 0 0 -10 5',
        ...this.getAttr(),
      }),
    };
  }

  /**
   * 获取当前的图形
   */
  getShape() {
    const shapeAll = this.getShapeAll();
    const shape = shapeAll.find((item) => item.value === this.shapeType);
    return shape?.shape || this.getFullArrowShape().shape;
  }

  /**
   * 获取所有的图形配置
   */
  getShapeAll() {
    return [
      this.getFullArrowShape(),
      this.getEmptyArrowShape(),
      this.getHalfArrowShape(),
    ];
  }
}
