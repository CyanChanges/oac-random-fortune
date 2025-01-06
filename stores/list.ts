import { defineStore } from 'pinia'
import type {} from 'pinia-plugin-persistedstate'

export const useNameListStore = defineStore('namelist', () => {
  const list = ref<string[]>([])
  const rollMaxCount = ref<number>(100)
  const darkside = ref<string>()

  return { list, rollMaxCount, darkside }
}, {
  persist: true
})
