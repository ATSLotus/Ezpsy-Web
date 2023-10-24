<!-- 右键菜单 -->
<script setup lang="ts">
    import log from '@/assets/utils/log'
    import { onMounted, reactive, watch } from 'vue';

    const props = defineProps({
        list: {
            type: Object,
            require: true
        },
        position: {
            type: Object,
            require: true
        },
        item: {
            type: Object,
            require: true
        }
    })

    const data = reactive({
        list: props.list as Array<CONTEXT_MENU>,
        position: props.position as POSITION,
        item: props.item as Record<string, any>,
        style: ''
    })

    onMounted(() => {
        data.style = `left: ${data.position.x}px; top: ${data.position.y}px;`
    })
    
</script>

<template>
    <div class="ContextMenu" :style="data.style">
        <div 
            v-for="item in data.list" 
            class="contextItem"
            @click="item.func(data.item)"
        >
        {{ typeof item.title === "string" ? item.title : item.title.value[data.item[item.title.key] & 1] }}
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "../../scss/app.scss";
    .ContextMenu {
        position: fixed;
        width: 120px;
        height: auto;
        top: 0;
        left: 0;
        z-index: $ZIndexTop;
        background: #f8fdff;
        border-radius: 10px;
        padding: 5px;
        box-shadow: 
            4px 8px 5px 0px #888888;
        .contextItem {
            width: 100%;
            height: 32px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }
        .contextItem:hover {
            background: #ebf0f2;
        }
    }
</style>