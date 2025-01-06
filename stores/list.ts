import { defineStore } from 'pinia'
import type {} from 'pinia-plugin-persistedstate'

export const useNameListStore = defineStore('namelist', () => {
  const list = ref<string[]>([])
  return { list }
}, {
  persist: true
})
