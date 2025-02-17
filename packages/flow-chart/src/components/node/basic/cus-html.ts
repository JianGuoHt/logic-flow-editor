import { HtmlNode, HtmlNodeModel } from '@logicflow/core';

class CusHtmlNodeModel extends HtmlNodeModel {}

class CusHtmlNodeView extends HtmlNode {}

export default {
  model: CusHtmlNodeModel,
  type: 'cus-html-node',
  view: CusHtmlNodeView,
};
