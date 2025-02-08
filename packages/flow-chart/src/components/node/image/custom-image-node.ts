import ImageNode from './image-node';

class CustomImageNodeModel extends ImageNode.model {
  override initNodeData(data: any) {
    super.initNodeData(data);
    this.width = 128;
    this.height = 128;

    this.setProperties({});
  }
}

class CustomImageNode extends ImageNode.view {}

export default {
  model: CustomImageNodeModel,
  type: 'pro-custom-image',
  view: CustomImageNode,
};
