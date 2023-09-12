<script setup lang="ts">
    import List from "@/components/ezpsy/List.vue"
    import log from '@/assets/utils/log'
    import { onMounted, reactive, ref } from "vue";
    import { getCurrentUser } from "@/assets/index/auth";
    import { UserStore } from "@/store/store";

    const data = reactive({
        type: "",
        opts: {}
    });
    const user = UserStore().getUser
    // @ts-ignore
    data.type = `/private/${user?.uid}/ezBlock/`
    data.opts = {
        configs: [
            "title", "description", "createTime", "creator"
        ],
        operations: {
            // ""
        } 
    }

    onMounted(async () => {
        
    })
    
    
    
</script>

<template>
    <div>
        <List :type="data.type" :opts="data.opts"></List>
    </div>
</template>

<style scoped lang="scss">
    
</style>