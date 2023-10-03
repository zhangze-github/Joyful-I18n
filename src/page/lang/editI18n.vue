<template>
    <a-drawer
            v-model:open="props.open"
            class="custom-class"
            root-class-name="root-class-name"
            title="设置I18n"
            destroyOnClose
            :closable="false"
            :maskClosable="false"
            width="50%"
    >
        <div class="item">
            <div class="left">key</div>
            <div class="center">
                <a-input v-model:value="keyValue"/>
            </div>
            <div class="right">

            </div>
        </div>
        <div class="item" v-for="item in storage.fileList" v-if="!isEmpty(langValue)">
            <div class="left">{{item.key}}</div>
            <div class="center">
                <a-input v-model:value="langValue[item.key]"/>
            </div>
            <div class="right">

            </div>
        </div>


        <template #footer>
            <a-button type="primary" @click="handleOk">
                确定
            </a-button>
            <a-button @click="handleCancel" danger style="margin-left: 20px">
                取消
            </a-button>
        </template>
    </a-drawer>
</template>

<script setup>
import {defineProps, onMounted, ref} from 'vue'
import {useStorage} from "../../store/storage.js";
const storage = useStorage();
const keyValue = ref('')
const langValue = ref({})
import {isEmpty} from "lodash";

const props = defineProps({
    open: Boolean
})

const emit = defineEmits(['update:open'])

onMounted(() => {
    console.log(storage.fileList)
    let obj = {};
    storage.fileList.forEach(item => {
        obj[item.key] = ''
    })
    langValue.value = obj
})

function handleCancel() {
    emit('update:open', false)
}

function handleOk(){
    console.log(langValue)
}


</script>

<style lang="less" scoped>

.item{
    display: flex;
    align-content: center;
    justify-content: center;
    margin-bottom: 10px;
    .left{
        width: 20%;
        line-height: 30px;
        text-align: center;
        font-weight: 600;
    }
    .center{
        width: 60%;
    }
    .right{
        width: 20%;
    }
}

</style>
