import {defineStore} from 'pinia'
import {toRaw} from "vue";

export const useStorage = defineStore('storage', {
    state: () => ({
        fileList: [],
    }),
    actions: {
        async updateFileList() {
            let list = toRaw(this.fileList);
            console.log(list)
            for (let i = 0; i < list.length; i++) {
                let {
                    content,
                    file,
                } = list[i];
                let writable = await file.createWritable();
                writable.write(JSON.stringify(content, null, 4))
                await writable.close();
            }
        }
    }
})