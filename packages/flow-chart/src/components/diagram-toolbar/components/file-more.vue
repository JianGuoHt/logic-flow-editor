<script setup lang="ts">
import { Folder } from '@element-plus/icons-vue';
import FileSaver from 'file-saver';

import { useLf } from '#/components/hooks/useLf';

const lf = useLf();

function handleEdgeType(command: string) {
  switch (command) {
    case 'exportJson': {
      exportJson();
      break;
    }
    case 'openFile': {
      break;
    }
  }
}

function exportJson() {
  const jsonData = lf.getGraphData();
  const blob = new Blob([JSON.stringify(jsonData)], {
    type: 'application/json;charset=utf-8',
  });
  FileSaver.saveAs(blob, 'flow.json');
}
</script>

<template>
  <div class="tool-item">
    <ElDropdown @command="handleEdgeType">
      <div class="tool-item-content" style="width: 50px">
        <ElIcon :size="14">
          <Folder />
        </ElIcon>
        <div class="" style="line-height: 18px">文件</div>
      </div>

      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem command="openFile">打开文件</ElDropdownItem>
          <ElDropdownItem command="exportJson">导出为json文件</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
