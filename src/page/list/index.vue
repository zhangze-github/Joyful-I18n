<template>
    <a-button @click="openDir">
        打开I18n文件夹
    </a-button>
</template>

<script setup>
import {ref} from 'vue'
import {message} from "ant-design-vue";

async function openDir() {
    let dir = null;
    try {
        dir = await showDirectoryPicker()
    } catch (e) {
        message.error('打开文件夹失败')
        return;
    }
    let fileList = await dir.entries();
    let returnList = []

    try {
        for await (let file of fileList) {
            await new Promise(async (resolve, reject) => {
                const reader = new FileReader();
                let fileObject = await file[1].getFile()
                reader.readAsText(fileObject, "utf-8");
                console.log(file[1])

                reader.onload = function (e) {
                    returnList.push({
                        name: file[0],
                        content: e.target.result,
                        file: file[1]
                    })
                    resolve()
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
    console.log(returnList)
}


// let writable = await file[1].createWritable();
// writable.write('123')
// await writable.close();

</script>


<style scoped lang="less">

</style>
