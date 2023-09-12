<script setup lang="ts">
    import agc from '@/assets/agc/agc';
    import log from '@/assets/utils/log'
    import { showloading, tipPopup } from '@/assets/utils/popup';
import { title } from 'process';
    import { onMounted, reactive } from 'vue';

    interface LI {
        configs: Array<string>
        operations: {
            [key: string]: Function
        }
    }

    const props = defineProps({
        type: {
            type: String,
            require: true
        },
        opts: {
            type: Object,
            require: true
        }
    })

    const data = reactive({
        header: new Array<string>(),
        listBody: new Array<LI>()
    })

    onMounted(async () => {
        showloading()
        data.header = data.header.concat(props.opts?.configs, ["operations"])
        const storage = agc.storage
        const listRes = await storage.getFileListAll(props.type as string)
        if(listRes?.isSuccess) {
            const list = listRes.data.fileList 
            // data.listBody = 
        } else {
            tipPopup("error", {
                title: "获取列表失败",
                tips: "获取失败, 请稍后重试"
            })
        }
    })
    
</script>

<template>
    <div>
        <div class="search">

        </div>
        <div class="list">
            <div class="header">
                <div v-for="head in data.header">
                    
                </div>
            </div>
            <div class="list-body">

            </div>
        </div>
        <div></div>
    </div>
</template>

<style scoped lang="scss">
    
</style>