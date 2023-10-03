<template>
    <div>
        <div class="content" v-if="!isEmpty(treeData)">
            <a-tree v-model:selectedKeys="selectedKeys" :tree-data="treeData" show-icon showLine>
                <template #title="{ title, key, children }">
                    <div :flagKey="key">
                        {{ title }}

                        <span  v-if="children">
                             <a-tooltip title="添加一个文件夹" @click="addI18nDir(key)" >
                                 <FolderAddOutlined style="margin-left: 20px" />
                             </a-tooltip>
                             <a-tooltip title="添加一个I18n Key" @click="addI18n(key)">
                                <PlusCircleOutlined style="margin-left: 20px" />
                             </a-tooltip>
                        </span>
                        <span  v-else>
                             <a-tooltip title="编辑" @click="editI18n(key)" >
                                 <EditOutlined style="margin-left: 20px"/>
                             </a-tooltip>
                        </span>
                    </div>
                </template>
            </a-tree>
        </div>
    </div>
    <a-modal v-model:open="modalVisible" title="输入文件夹名称" @ok="handleOk" @cancel="handleCancel" size="small">
        {{ modalVisible }}
        <a-input v-model:value="modalInputValue"></a-input>
    </a-modal>
    <EditI18n v-model:open="drawerVisible" :editKey="editKey"/>
</template>

<script setup>
import {message} from "ant-design-vue";
import {useStorage} from "../../store/storage.js";
import {onMounted, ref, toRaw, watch, h, nextTick} from "vue";
import {get, find, isEmpty, set} from "lodash";
import {handleData} from "../../util/utils.js";
import {PlusCircleOutlined, FolderAddOutlined, EditOutlined} from "@ant-design/icons-vue";
import EditI18n from "./editI18n.vue";

const storage = useStorage();
const treeData = ref({})
const selectedKeys = ref(['']);
const modalVisible = ref(false);
const modalInputValue = ref('')
const isAddDir = ref(false)
const drawerVisible = ref(false)
const editKey = ref('')

onMounted(() => {
    initData()
})

function initData() {
    let value = find(storage.fileList, {key: 'en'}) || {}
    if (isEmpty(value)) return;
    let parsedValue = handleData(toRaw(value.content))
    console.log(parsedValue)
    treeData.value = parsedValue
}

function addI18n(e) {
    drawerVisible.value = true;
    editKey.value = e
}

function addI18nDir(e){
    modalVisible.value = e;
}

function handleOk() {
    let value = modalInputValue.value;
    let key = modalVisible.value;
    let langList = toRaw(storage.fileList);
    langList = langList.map(item => {
        let {content} = item;
        set(content, `${key}.${value}`, {});
        return {
            ...item,
            content
        }
    })
    console.log(langList)
    storage.$patch({
        fileList: langList
    })
    nextTick(() => {
        initData()
        modalVisible.value = false;
    })
}

function handleCancel() {
    modalVisible.value = false;
    modalInputValue.value = '';
}

function editI18n(e){
    drawerVisible.value = true;
    editKey.value = e
}




</script>

<style lang="less" scoped>


</style>
