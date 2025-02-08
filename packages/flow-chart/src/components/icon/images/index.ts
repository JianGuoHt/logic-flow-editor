import Champion from './champion.png';
import Image from './image.png';

/**
 * 获取所有本地图标
 */
export function getLocalAllImageIcons() {
  const imageIcons = [
    {
      image: Champion,
      name: 'champion',
    },
    {
      image: Image,
      name: 'image',
    },
  ];

  return imageIcons;
}
