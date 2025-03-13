import type { App, Component, VNode } from 'vue';

import { HtmlNode, HtmlNodeModel, type IHtmlNodeProps } from '@logicflow/core';
import { merge } from 'es-toolkit/compat';

import { getNodeConfig } from '#/components/config/node';
import {
  getNodeCustomDefaultProperties,
  getRectNodeDefaultProperties,
} from '#/components/help/reset-custom-properties';

import { formatSvgShapeStyleMapping } from '../utils/transform-style';

class CusHtmlNodeModel extends HtmlNodeModel {
  /**
   * 支持重写 获取当前节点样式
   */
  override getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();

    return merge(style, formatSvgShapeStyleMapping(properties));
  }

  /**
   * 初始化节点数据
   */
  override initNodeData(data: any) {
    super.initNodeData(data);
    // this.width = 50;
    // this.height = 50;
    this.autoToFront = getNodeConfig().autoToFront;

    this.setProperties(
      merge(
        {},
        getNodeCustomDefaultProperties(),
        getRectNodeDefaultProperties(),
        data.properties,
      ),
    );
  }

  override setAttributes(): void {
    super.setAttributes();
    this.text.editable = false;
  }
}

class CusHtmlNodeView extends HtmlNode {
  vueApp!: App;
  vueIsMounted = false;
  vueRootComponent!: VNode;

  constructor(props: IHtmlNodeProps) {
    super(props);
    this.vueIsMounted = false;

    this.vueRootComponent = h(this.getVueVNode(), {
      properties: props.model.getProperties(),
    });

    this.vueApp = createApp({
      render: () => this.vueRootComponent,
    });
  }

  /**
   * 获取更新后的vue组件props
   */
  getUpdatedVueComponentProps(): Record<string, unknown> {
    return {};
  }

  getVueVNode(): Component;
  getVueVNode(): Component {
    throw new Error('子类必须实现getVueVNode方法');
  }

  override setHtml(rootEl: SVGForeignObjectElement) {
    if (this.vueIsMounted) {
      if (!this.vueRootComponent.component) {
        return;
      }

      this.vueRootComponent.component.props.properties =
        this.props.model.getProperties();

      return;
    }

    this.vueIsMounted = true;
    const node = document.createElement('div');
    rootEl.append(node);
    this.vueApp.mount(node);
  }
}

export default {
  model: CusHtmlNodeModel,
  type: 'cus-vue-html-node',
  view: CusHtmlNodeView,
};
