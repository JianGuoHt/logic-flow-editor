import { h } from '@logicflow/core';

export class ArrowType {
  arrowType = '';
  attr = {};

  constructor(attr = {}, arrowType = 'default') {
    this.attr = attr;
    this.arrowType = arrowType;
  }

  getAttr() {
    return this.attr || {};
  }

  // 默认箭头
  getDefaultShape() {
    return {
      icon: 'icon-arrow-right',
      label: '默认',
      shape: h('path', {
        d: 'M 0 0 -10 -5 -10 5 z',
        ...this.getAttr(),
      }),
      value: 'default',
    };
  }

  // 空心箭头
  getEmptyShape() {
    return {
      icon: '',
      label: '空心',
      shape: h('path', {
        d: 'M -10 0  -20 -5 -30 0 -20 5 z',
        fill: '#FFF',
        ...this.getAttr(),
      }),
      value: 'empty',
    };
  }

  // 半箭头
  getHalfShape() {
    return {
      icon: 'icon-jiantou_qiehuanyou',
      label: '半箭头',
      shape: h('path', {
        b: 'bb',
        d: 'M 0 0 -10 5',
        ...this.getAttr(),
      }),
      value: 'half',
    };
  }

  getShape() {
    const shapeArr = this.getShapeArr();
    const shape = shapeArr.find((item) => item.value === this.arrowType);
    return shape?.shape || this.getDefaultShape().shape;
  }

  getShapeArr() {
    return [
      this.getDefaultShape(),
      // this.getEmptyShape(),
      this.getHalfShape(),
    ];
  }
}
