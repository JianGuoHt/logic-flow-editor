<script setup lang="ts">
import { unmountGlobalLoading } from '@clsy/utils';

import { Diagram } from './components';

setTimeout(() => {
  unmountGlobalLoading();
}, 500);
</script>

<template>
  <div class="test-body">
    <Diagram />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
