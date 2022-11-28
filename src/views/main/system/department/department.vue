<template>
  <div class="department">
    <page-search
      :searchConfig="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      :contentConfig="contentConfig"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    />
    <page-model ref="ModelRef" :modalConfig="modalConfigRef" />
  </div>
</template>

<script setup lang="ts">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModel from '@/components/page-model/page-model.vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModel from '@/hooks/usePageModel'

import { computed, nextTick, ref } from 'vue'
import useMainStore from '@/stores/main/main'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { ModelRef, handleNewClick, handleEditClick } = usePageModel()

const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})
// console.log(112233)
</script>

<style scoped></style>
