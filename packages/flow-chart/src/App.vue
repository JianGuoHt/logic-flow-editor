<script setup lang="ts">
import { unmountGlobalLoading } from '@clsy/utils';

setTimeout(() => {
  unmountGlobalLoading();
}, 500);
</script>

<template>
  <div class="test-body">
    <diagram />
  </div>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
