import { lfProvideKey } from '../types/lf-token';

/**
 * 获取 富文本编辑器 实例
 */
export function useRichEditorDialog() {
  const rootStore = inject(lfProvideKey);
  const richEditDialog = unref(rootStore?.richEditDialog);

  if (!richEditDialog) {
    throw new Error('logicFlow实例不存在,请确保在logicFlow初始化后使用');
  }

  return richEditDialog;
}
