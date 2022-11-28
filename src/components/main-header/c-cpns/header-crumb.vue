<template>
  <div>
    <el-breadcrumb :separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.id">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { breadcrumbs, mapPathToMenu } from '@/utils/map-menus'
import { ArrowRight } from '@element-plus/icons-vue'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const route = useRoute()
// watch(
//   () => route,
//   () => {
//     // breadcrumbs.value = []
//     console.log(22233333, breadcrumbs.value)
//     // mapPathToMenu(route.path, userMenus)
//   }
// )
watch
</script>

<style scoped></style>
