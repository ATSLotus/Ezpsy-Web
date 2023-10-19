<script setup lang="ts">
    import log from "@/assets/utils/log"
    import EzpsyMenu from "@/components/ezpsy/Menu.vue";
    import { onMounted, reactive, watch, shallowRef, onBeforeMount, onBeforeUnmount } from "vue";
    import { useRoute } from 'vue-router';
    import router from "@/router/router";
    import Production from "@/components/ezpsy/Production.vue"
    import Image from "@/components/ezpsy/Image.vue"
    import Codes from "@/components/ezpsy/Codes.vue"
    import Datas from "@/components/ezpsy/Datas.vue"
    import { EzpsyMenuStore, UserStore } from "@/store/store";
    import EzpsyBlock from "@/components/ezpsy/EzpsyBlock.vue";
    import { getCurrentUser } from "@/assets/index/auth";
    import { setContainer } from "@/assets/utils/popup";

    const route = useRoute()

    const data = reactive({
        store: EzpsyMenuStore(),
        currentMenu: "",
    })

    const menus = shallowRef([
        { key: "production", component: Production, icon: 'file-code',title: '个人项目', isSelected: true },
        { key: "image", component: Image, icon: 'image', title: '图床图片', isSelected: false }, 
        { key: "ezpsy-block", component: EzpsyBlock, icon: "puzzle-piece", title: '实验设计', isSelected: false },
        { key: "codes", component: Codes, icon: 'list', title: '实验列表', isSelected: false },
        { key: "datas", component: Datas, icon: 'file-excel', title: '实验数据', isSelected: false }
    ])

    data.store.set(menus.value)

    onMounted(async () => {
        setContainer("spacial")
        const user = await getCurrentUser()
        log.info(user)
        if(!user.isSuccess) {
            router.push("/index/login")
        } else {
            const userStorage = UserStore()
            userStorage.set(user.data.user)
        }
        if(!route.query?.menu) {
            router.replace({
                query: { menu: "production" }
            })
        }
        data.currentMenu = route.query.menu as string
    })

    watch(router.currentRoute, () => {
        data.currentMenu = route.query?.menu as string
    })

    onBeforeUnmount(async () => {
        setContainer("normal")
    })
    
    
</script>

<template>
    <div class="console">
        <EzpsyMenu></EzpsyMenu>
        <div class="content-box">
            <div class="header"></div>
            <div
                class="box"
                v-for="item in menus"
                v-show="item.key === data.currentMenu"
            >
                <component
                    v-if="item.key === data.currentMenu"
                    :is="item.component"
                    class="content"
                ></component>
            </div>
        </div>
        
    </div>
</template>

<style scoped lang="scss">
    @import "@/scss/ezpsy-menu.scss";
    @import "@/scss/app.scss";
    .console {
        width: 100%;
        height: 100vh;
        display: flex;
        .content-box {
            width: calc(100% - $EzpsyMenuWidth);
            height: 100%;
            .header {
                width: 100%;
                height: 60px;
            }
            .box {
                width: 100%;
                height: calc(100% - 60px);
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #f4f8fa;
                position: relative;
                .content {
                    width: 90%;
                    height: 90%;
                    background-color: white;
                }
            }
            
        }
        
    }
</style>