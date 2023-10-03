<template>
    <div>
        <div class="content" v-if="!isEmpty(treeData)">
            <a-tree v-model:selectedKeys="selectedKeys" :tree-data="treeData" show-icon showLine>
                <template #title="{ title, key }">
                    <div :flagKey="key">
                        {{ title }} {{ key.slice(10) && ":" }} {{ key.slice(10) }}

                        <span style="margin-left: 20px" @click="" v-if="!key.slice(10)">
                        <PlusCircleOutlined/>
                    </span>
                    </div>
                </template>
            </a-tree>
        </div>
    </div>
    <a-modal v-model:open="modalVisible" title="添加一个key" @ok="handleOk" @cancel="handleCancel">
        {{modalVisible}}
        <a-input v-model:value="modalInputValue"></a-input>
    </a-modal>
</template>

<script setup>
import {message} from "ant-design-vue";
import {useStorage} from "../../store/storage.js";
import {onMounted, ref, toRaw, watch} from "vue";
import {get, find, isEmpty} from "lodash";
import {findKeyByValue, findParentsWithFlagKey, handleData} from "../../util/utils.js";
import {PlusCircleOutlined} from "@ant-design/icons-vue";

const storage = useStorage();
const treeData = ref({})
const selectedKeys = ref(['']);
const modalVisible = ref(false);
const modalInputValue = ref('')

onMounted(() => {
    let value = find(storage.fileList, {key: 'en'}) || {}
    if (isEmpty(value)) return;
    let parsedValue = handleData(JSON.parse(toRaw(value.content)))
    console.log(parsedValue)
    treeData.value = parsedValue
})

function addI18n(e) {
    console.log(findParentsWithFlagKey(e.target, 'flagKey'))
}

watch(selectedKeys, () => {
    let {0: key} = selectedKeys.value;
    modalVisible.value = findKeyByValue(treeData.value, key)
});

function handleOk(){

}

function handleCancel() {
    modalVisible.value = false;
    modalInputValue.value = '';
}




</script>

<style lang="less" scoped>


</style>
