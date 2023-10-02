<template>
    <div class="wrapper">
        <a-button @click="openDir" type="primary">
            打开I18n文件夹
        </a-button>
        {{fileList}}
        <div class="list">
            <div class="item" v-for="i in storage.fileList">
                <div class="name">{{i.name}}</div>
                <div class="content">{{i.content}}</div>
            </div>
        </div>

    </div>

</template>

<script setup>
import {ref} from 'vue'
import {message} from "ant-design-vue";
import {useStorage} from "../../store/storage.js";

const storage = useStorage();

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
    storage.$patch({
        fileList: returnList
    })
    console.log(returnList)
}


// let writable = await file[1].createWritable();
// writable.write('123')
// await writable.close();

</script>


<style scoped lang="less">

.list{
    .item{
        border: 1px solid #ccc;
        margin: 10px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        border-radius: 10px;
        .name{
            margin-right: 20px;
        }
        .content{
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}

</style>
