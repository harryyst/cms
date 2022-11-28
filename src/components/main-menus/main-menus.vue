<template>
  <div class="menus">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">YsT管理系统</h2>
    </div>
    <el-menu
      active-text-color="#ffd04b"
      background-color="#001529"
      class="el-menu"
      :default-active="defaultActive"
      text-color="#fff"
      :collapse="isFold"
    >
      <template v-for="submenu in userMenus" :key="submenu.id">
        <el-sub-menu :index="submenu.id + ''">
          <template #title>
            <el-icon>
              <component :is="submenu.icon.split('-icon-')[1]" />
            </el-icon>
            <span>{{ submenu.name }}</span>
          </template>

          <template v-for="item in submenu.children" :key="item.id">
            <el-menu-item
              :index="item.id + ''"
              @click="handleItemClick(item)"
              >{{ item.name }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})
const router = useRouter()
const route = useRoute()
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})

const handleItemClick = (subitem: any) => {
  router.push(subitem.url)
}
</script>

<style scoped lang="less">
.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

/deep/ .el-menu {
  border-right: 0;
}
/deep/ .el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
