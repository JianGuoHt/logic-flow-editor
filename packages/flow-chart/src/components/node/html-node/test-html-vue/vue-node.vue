<script setup lang="ts">
const props = defineProps<{ properties: Record<string, unknown> }>();
</script>

<template>
  <div>
    <p>test-vue-html</p>
    <pre>{{ props.properties }}</pre>
  </div>
</template>
