<template>
  <div class="content">
    <div class="content-header">
      <div class="header-name">
        {{ contentConfig.header.title }}
      </div>
      <div class="btn">
        <el-button type="primary" @click="handleNewUserClick">{{
          contentConfig.header.btnTitle
        }}</el-button>
      </div>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  size="small"
                  icon="Edit"
                  type="primary"
                  text
                  @click="handleEditBtnClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  size="small"
                  icon="Delete"
                  type="danger"
                  text
                  @click="handleDeleteBtnClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                  hName="why"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="sizes, prev, pager, next"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatUTC } from '@/utils/formats'
import useSystemStore from '@/stores/main/system/system'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
interface IProps {
  contentConfig: {
    pageName: string
    header: {
      title: string
      btnTitle: string
    }
    propsList: any[]
  }
}
const props = defineProps<IProps>()

const emit = defineEmits(['newClick', 'editClick'])

const currentPage = ref(1)
const pageSize = ref(10)

const systemStore = useSystemStore()

const { pageList, pageTotalCount } = storeToRefs(systemStore)

fetchPageListData()

function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}

const handleEditBtnClick = (item: any) => {
  emit('editClick', item)
}
function handleNewUserClick() {
  emit('newClick')
}
const handleDeleteBtnClick = (id: number) => {
  systemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}

function fetchPageListData(formData: any = {}) {
  // 1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const pageInfo = { size, offset }

  // 2.发起网络请求
  const queryInfo = { ...pageInfo, ...formData }
  systemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}

defineExpose({ fetchPageListData })
</script>

<style scoped lang="less">
.content {
  padding-top: 40px;
}
.content-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.content-header {
  padding-bottom: 20px;
}
.table {
  :deep(.el-table__cell) {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
