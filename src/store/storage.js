import { defineStore } from 'pinia'

export const useStorage = defineStore('storage', {
    state: () => ({
        fileList: [],
    }),
})
