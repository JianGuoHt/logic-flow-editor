import { CusImage } from '../../basic';

class UserImageNodeModel extends CusImage.model {
  override initNodeData(data: any) {
    super.initNodeData(data);

    this.setProperties({
      imageHref:
        'https://dpubstatic.udache.com/static/dpubimg/-6Fd2uIoJ-/user.png',
    });
  }
}

// 图片-用户节点
class UserImageNode extends CusImage.view {}

export default {
  model: UserImageNodeModel,
  type: 'pro-image-user',
  view: UserImageNode,
};
