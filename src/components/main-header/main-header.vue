<template>
  <div class="main-header">
    <div class="menu-icon" @click="handleMenuIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div><headerCrumb /></div>
      <div><headerInfo /></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerCrumb from './c-cpns/header-crumb.vue'
import headerInfo from './c-cpns/header-info.vue'
const emit = defineEmits(['foldChange'])
const isFold = ref(false)

const handleMenuIconClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main-header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
