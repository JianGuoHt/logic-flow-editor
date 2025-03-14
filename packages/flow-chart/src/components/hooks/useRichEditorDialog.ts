import { lfProvideKey } from '../types/lf-token';

/**
 * 获取 富文本编辑器 实例
 */
export function useRichEditorDialog() {
  const rootStore = inject(lfProvideKey);
  const richEditDialog = unref(rootStore?.richEditDialog);

  if (!richEditDialog) {
    throw new Error(
      'richEditDialog 实例不存在,请确保在 richEditDialog 初始化后使用',
    );
  }

  return richEditDialog;
}
