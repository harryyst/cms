<template>
  <div class="login-account">
    <el-form
      :model="account"
      label-width="70px"
      ref="accountForm"
      :rules="accountRules"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { h, reactive, ref } from 'vue'
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
import STRequest from '@/service'
import useLoginStore from '@/stores/login/login'
const account = reactive({ name: '', password: '' })
const accountForm = ref<InstanceType<typeof ElForm>>()
const accountRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9A-Z]{5,20}$/,
      message: '必须是5~20数字或字母组成~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

const loginStore = useLoginStore()
const loginAction = () => {
  accountForm.value?.validate((valid, fields) => {
    if (valid) {
      loginStore.accountLoginAction(account)
    } else {
      ElMessage.error('请输入正确的格式')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style scoped></style>
