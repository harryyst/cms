<template>
  <div class="search">
    <el-form
      :model="searchForm"
      :label-width="searchConfig.labelWidth ?? '80px'"
      size="large"
      ref="formRef"
    >
      <el-row>
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'date-picker'"
                ><el-date-picker
                  v-model="searchForm[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                />
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button icon="Search" type="primary" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref, watch } from 'vue'

interface searchProps {
  searchConfig: any
}
const props = defineProps<searchProps>()
const emit = defineEmits(['queryClick', 'resetClick'])
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
}
const searchForm: any = reactive(initialForm)
const formRef = ref<InstanceType<typeof ElForm>>()

const handleResetClick = () => {
  for (const key in searchForm) {
    searchForm[key] = ''
  }
  emit('resetClick')
}

const handleQueryClick = () => {
  emit('queryClick', searchForm)
}
</script>

<style scoped lang="less">
.btns {
  text-align: right;
  // padding: 0 50px 10px 0;

  .el-button {
    height: 36px;
  }
}
</style>
