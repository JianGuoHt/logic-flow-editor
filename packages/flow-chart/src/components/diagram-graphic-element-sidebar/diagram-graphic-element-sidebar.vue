<script setup lang="ts">
import { lfProvideKey } from '../types/lf-token';

const emits = defineEmits(['dragInNode']);

const injectedRootStore = inject(lfProvideKey);

const activeCollapseNames = ref<string[]>([]);

const registerCustomNodes = computed(() => {
  return injectedRootStore?.registerCusNodes.value || [];
});

watch(
  () => registerCustomNodes.value,
  (n) => {
    if (n.length > 0 && activeCollapseNames.value.length === 0) {
      activeCollapseNames.value = n.map((v) => v.type);
    }
  },
  {
    deep: true,
    immediate: true,
    // once: true,
  },
);

function dragInNode(type: string) {
  emits('dragInNode', type);
}
</script>

<template>
  <div class="diagram-graphic-element-sidebar">
    <el-scrollbar style="height: 100%">
      <el-collapse v-model="activeCollapseNames">
        <template v-for="group in registerCustomNodes" :key="group.type">
          <el-collapse-item :name="group.type" :title="group.name">
            <div class="node-category-list">
              <div
                v-for="node in group.nodes"
                :key="node.type"
                class="node-item"
                @mousedown="dragInNode(node.type)"
              >
                <component :is="node.icon" class="svg-node" />
              </div>
            </div>
          </el-collapse-item>
        </template>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.diagram-graphic-element-sidebar {
  @apply select-none;

  padding: 0 10px;
}

.node-category-list {
  @apply grid grid-cols-5 gap-2;

  .node-item {
    text-align: center;
    cursor: pointer;
  }

  .svg-node,
  .image-node {
    display: block;
    width: 32px;
    height: 32px;
    overflow: hidden;
  }
}

::v-deep(.el-collapse) {
  border-top: none;
}
</style>
