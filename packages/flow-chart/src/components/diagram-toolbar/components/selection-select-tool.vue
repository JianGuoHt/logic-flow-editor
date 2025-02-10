<script setup lang="ts">
import SelectionSelect from '#/components/assets/icons/selection-select.vue';
import { useLf } from '#/components/hooks/useLf';

const lf = useLf();

const active = ref(false);

function handleChangeState() {
  active.value = !active.value;

  if (active.value) {
    lf.openSelectionSelect();
  } else {
    lf.closeSelectionSelect();
  }
}
</script>

<template>
  <div class="tool-item">
    <div
      :class="[active ? 'is-active' : '']"
      class="tool-item-content"
      @click="handleChangeState"
    >
      <ElIcon :size="14">
        <SelectionSelect />
      </ElIcon>
      <div class="" style="line-height: 18px">框选</div>
    </div>
  </div>
</template>
