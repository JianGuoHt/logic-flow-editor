<script setup lang="ts">
import { getLocalAllImageIcons, vueIconMaps } from '../icon';

const emits = defineEmits(['dragInNode']);

const vueIconNodes = ref(
  vueIconMaps.map((v) => ({
    component: shallowRef(v.component),
    type: v.name,
  })),
);

const imageIconNodes = ref(
  getLocalAllImageIcons().map((v) => ({
    image: v.image,
    type: v.name,
  })),
);

const activeCollapseNames = ref(['general']);

function dragInNode(type: string) {
  emits('dragInNode', type);
}
</script>

<template>
  <div class="diagram-graphic-element-sidebar">
    <el-scrollbar style="height: 100%">
      <el-collapse v-model="activeCollapseNames">
        <el-collapse-item name="general" title="General">
          <div class="node-category-list">
            <div
              v-for="node in vueIconNodes"
              :key="node.type"
              class="node-item"
              @mousedown="dragInNode(node.type)"
            >
              <component :is="node.component" class="svg-node" />
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item name="image" title="图片">
          <div class="node-category-list">
            <div
              v-for="node in imageIconNodes"
              :key="node.type"
              class="node-item"
              @mousedown="dragInNode(node.type)"
            >
              <img :src="node.image" class="image-node" />
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.diagram-graphic-element-sidebar {
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
</style>
