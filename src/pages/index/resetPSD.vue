<script setup lang="ts">
    import log from '@/assets/utils/log'
    import ResetPSDBox from "@/components/index/ResetPSDBox.vue";
    import { reactive, ref } from 'vue';

    const title = ref("输入Ezpsy账号")
    const tips = ref("请输入注册账号的手机号")
    const step = ref(0)

    const data = reactive({
        
    })
    
</script>

<template>
    <div>
        <div class="reset">
            <ResetPSDBox 
                :title="title"
                :tips="tips"
                :step="step"
            ></ResetPSDBox>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .reset {
        width: 100%;
        height: 100%;
        background: #f1f1f1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>