/* 获取多个点的外层bbox
 * 这个函数的用处
 * 1、获取起始终点相邻点(expendBboxPoint)的bbox
 * 2、polylineEdge, bezierEdge，获取outline边框，这种情况传入offset
 */
export const getBBoxOfPoints = (
  points: { x: number; y: number }[] = [],
  offset: number,
) => {
  const xList: any[] = [];
  const yList: any[] = [];
  points.forEach((p) => {
    xList.push(p.x);
    yList.push(p.y);
  });
  const minX = Math.min(...xList);
  const maxX = Math.max(...xList);
  const minY = Math.min(...yList);
  const maxY = Math.max(...yList);
  let width = maxX - minX;
  let height = maxY - minY;
  if (offset) {
    width += offset;
    height += offset;
  }
  return {
    centerX: (minX + maxX) / 2,
    centerY: (minY + maxY) / 2,
    height,
    maxX,
    maxY,
    minX,
    minY,
    width,
    x: (minX + maxX) / 2,
    y: (minY + maxY) / 2,
  };
};
