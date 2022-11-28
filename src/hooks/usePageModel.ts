import type pageModel from '@/components/page-model/page-model.vue'
import { ref } from 'vue'

export default function usePageModel(
  newCallBack?: (data?: any) => void,
  editCallBack?: (data?: any) => void
) {
  const ModelRef = ref<InstanceType<typeof pageModel>>()

  const handleNewClick = () => {
    ModelRef.value?.setDialogState(true)
    if (newCallBack) newCallBack()
  }
  const handleEditClick = (item: any) => {
    ModelRef.value?.setDialogState(false, item)
    if (editCallBack) editCallBack
  }
  return { ModelRef, handleNewClick, handleEditClick }
}
