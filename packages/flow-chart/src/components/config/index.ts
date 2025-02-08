// 默认 edge 类型
export const defaultEdgeType = 'pro-polyline';

export const headerHeight = 40;

// 线条样式
export const borderStyles = [
  {
    label: '实线',
    value: 'solid',
  },
  {
    label: '虚线',
    value: 'dashed',
  },
  {
    label: '点虚线',
    value: 'dotted',
  },
];

export const fontFamilyList = [
  {
    label: 'Arial',
    value: 'Arial',
  },
  {
    label: 'Verdana',
    value: 'Verdana',
  },
  {
    label: 'Georgia',
    value: 'Georgia',
  },
  {
    label: 'Times New Roman',
    value: 'Times New Roman',
  },
];

export const imageAlign = [
  {
    getCoordinate(x: number, y: number, width: number, height: number) {
      return {
        x: x - width / 2,
        y: y - height / 2,
      };
    },
    label: '居中',
    value: 'center',
  },
  {
    getCoordinate(x: number, y: any, width: number) {
      return {
        x: x - width / 2,
        y,
      };
    },
    label: '上',
    value: 'top',
  },
  {
    getCoordinate(x: number, y: number, width: number, height: number) {
      return {
        x: x - width / 2,
        y: y - height / 2,
      };
    },
    label: '下',
    value: 'bottom',
  },
  { label: '左', value: 'left' },
  { label: '右', value: 'right' },
  { label: '左上', value: 'lt' },
  { label: '右上', value: 'rt' },
  { label: '左下', value: 'lb' },
  { label: '右下', value: 'rb' },
];
