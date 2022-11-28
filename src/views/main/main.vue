<template>
  <div class="main">
    <el-container class="el-container">
      <el-aside class="el-aside" :width="isFold ? '60px' : '210px'"
        ><main-menus :isFold="isFold"
      /></el-aside>
      <el-container>
        <el-header><main-header @foldChange="handleFoldChange" /></el-header>
        <el-main><RouterView /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import mainMenus from '@/components/main-menus/main-menus.vue'
import mainHeader from '@/components/main-header/main-header.vue'
import { ref } from 'vue'

const isFold = ref(false)
const handleFoldChange = (value: boolean) => {
  isFold.value = value
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}
.el-aside,
.el-container {
  height: 100%;
}

/deep/.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */

  transition: width 0.3s ease;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
