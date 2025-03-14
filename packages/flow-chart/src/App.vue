<script setup lang="ts">
import { unmountGlobalLoading } from '@clsy/utils';

import zhCn from 'element-plus/es/locale/lang/zh-cn';

import { Diagram } from './components';

setTimeout(() => {
  unmountGlobalLoading();
}, 500);
</script>

<template>
  <div class="">
    <ElConfigProvider :locale="zhCn">
      <Diagram />
    </ElConfigProvider>
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
