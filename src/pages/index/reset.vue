<script setup lang="ts">
    import log from '@/assets/utils/log'
    import ResetPSDBox from "@/components/index/ResetPSDBox.vue";
    import { reactive, ref } from 'vue';

    const data = reactive({
        
    })
    
</script>

<template>
    <div>
        <div class="reset">
            <ResetPSDBox></ResetPSDBox>
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