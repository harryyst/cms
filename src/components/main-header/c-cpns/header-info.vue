<template>
  <el-dropdown>
    <div class="header-info">
      <div class="name">{{ userInfo.name }}</div>
      <el-icon><User /></el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { LOGIN_TOKEN } from '@/global/constants'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const loginStore = useLoginStore()
const { userInfo } = storeToRefs(loginStore)
const router = useRouter()
const handleLogout = () => {
  localCache.removeCache(LOGIN_TOKEN)
  router.push('/login')
}
</script>

<style scoped>
.header-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.name {
  margin-right: 5px;
}
</style>
