<script setup lang="ts">
import Revoke from '#/components/assets/icons/revoke.vue';
import { useLf } from '#/components/hooks/useLf';

const lf = useLf();

function handleUndo() {
  lf.undo();
}

function handleRedo() {
  lf.redo();
}
</script>

<template>
  <div class="tool-item">
    <div class="tool-item-content" @click="handleUndo">
      <ElIcon :size="14">
        <Revoke />
      </ElIcon>
      <div class="" style="line-height: 18px">撤销</div>
    </div>
  </div>

  <div class="tool-item">
    <div class="tool-item-content" @click="handleRedo">
      <ElIcon :size="14" class="" style="transform: rotateY(180deg)">
        <Revoke />
      </ElIcon>
      <div class="" style="line-height: 18px">恢复</div>
    </div>
  </div>
</template>
