import type pageContent from '@/components/page-content/page-content.vue'
import { ref } from 'vue'

export default function usePageContent() {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  const handleQueryClick = (formData: any) => {
    contentRef.value?.fetchPageListData(formData)
  }
  const handleResetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  return { contentRef, handleQueryClick, handleResetClick }
}
