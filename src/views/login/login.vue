<template>
  <div class="login">
    <div class="login-panel">
      <div class="title">后台管理系统</div>
      <div class="tabs">
        <el-tabs v-model="activeName" type="border-card" stretch>
          <el-tab-pane name="account">
            <template #label>
              <div>账号登陆</div>
            </template>
            <loginAccountVue ref="accountForm" />
          </el-tab-pane>
          <el-tab-pane name="phone" label="手机登录">
            <login-phone />
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="setPass"></div>
      <el-button class="login-btn" type="primary" @click="handleLoginClick"
        >立即登陆</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import loginAccountVue from './c-cpns/login-account.vue'
import LoginPhone from './c-cpns/login-phone.vue'
const activeName = ref('account')
const accountForm = ref<InstanceType<typeof loginAccountVue>>()
const handleLoginClick = () => {
  // if (activeName.value === 0) {
  //   console.log(11122)
  // }
  if (activeName.value === 'account') {
    accountForm.value?.loginAction()
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-image: url('@/assets/img/login-bg.svg');
}
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;

    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
