import cusVueHtml from '../../basic/cus-vue-html';
import VueNode from './vue-node.vue';

class VueHtmlNodeModel extends cusVueHtml.model {
  override getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = 'none';
    if (style.hover) {
      style.hover.stroke = 'none';
    }
    return style;
  }

  override initNodeData(data: any): void {
    super.initNodeData(data);
    this.setProperties({
      height: 500,
      width: 500,
    });
  }
}

class VueHtmlNode extends cusVueHtml.view {
  override getVueVNode() {
    return VueNode;
  }
}

export default {
  model: VueHtmlNodeModel,
  type: 'html-tets-vue-node',
  view: VueHtmlNode,
};
