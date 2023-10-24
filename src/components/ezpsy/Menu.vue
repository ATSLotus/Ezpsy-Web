<script setup lang="ts">
    import log from '@/assets/utils/log'
    import router from '@/router/router';
    import { onMounted, reactive, watch, defineComponent } from 'vue';
    import { useRoute } from 'vue-router';
    import { EzpsyMenuStore } from "@/store/store";
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    const route = useRoute()
    const store = EzpsyMenuStore()

    // defineComponent({
    //     components: {
    //         FontAwesomeIcon: () => import("@fortawesome/vue-fontawesome")
    //     }
    // })

    const removeComponent = () => {
        const newMenus = new Array()
        store.getEzpsyMenu.forEach(menu => {
            newMenus.push({
                key: menu.key,
                title: menu.title,
                icon: menu.icon,
                isSelected: menu.isSelected,
            })
        })
        return newMenus
    }
    
    const data = reactive({
        logo: './src/assets/image/logo.png',
        menus: removeComponent()
    })

    const select = (key: string) => {
        router.replace({
            query: { menu: key }
        })
    }

    const changeSelected = () => {
        data.menus.forEach(item => {
            if(item.key === route.query.menu) {
                item.isSelected = true
            } else {
                item.isSelected = false
            }
        })
    }

    onMounted( async () => {
        if(route.query?.menu) {
            changeSelected()
        }
    })

    watch(router.currentRoute, () => {
        changeSelected()
    })
    
</script>

<template>
    <div class="menus">
        <div class="logo">
            <img :src="data.logo" width="100" height="100" />
        </div>
        <div
            class="item"
            :class="item.isSelected ? 'selected' : ''"
            v-for="item in data.menus"
            @click="select(item.key)"
        >
            <!-- <i class="item-icon fa" :class=item.icon></i> -->
            <font-awesome-icon class="item-icon" :icon="item.icon" />
            <div class="item-title">{{ item.title }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    // @import "https://use.fontawesome.com/releases/v5.1.0/css/all.css";
    @import "@/scss/ezpsy-menu.scss";

    .menus {
        width: $EzpsyMenuWidth;
        height: 100%;
        background-color: #005795;
        .logo {
            display: flex;
            justify-content: center;
            img {
                filter: brightness(100);
            }
        }
        .item {
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            cursor: pointer;
            .item-icon {
                width: 20px;
                height: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
            }
        }
        .item:hover {
            background-color: #00528c;
        }
        .item-title {
            font-weight: 600;
        }
        .selected {
            background-color: #1871b3;
        }
    }
    
</style>