<script setup lang="ts">
    import log from '@/assets/utils/log'

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
    
</script>

<template>
    <div>
        <div class="search">

        </div>
        <div class="list">

        </div>
        <div></div>
    </div>
</template>

<style scoped lang="scss">
    
</style>