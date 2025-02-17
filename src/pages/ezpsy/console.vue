<script setup lang="ts">
    import log from "@/assets/utils/log"
    import EzpsyMenu from "@/components/ezpsy/Menu.vue";
    import { onMounted, reactive, watch, shallowRef, onBeforeUnmount, nextTick } from "vue";
    import { useRoute } from 'vue-router';
    import router from "@/router/router";
    
    import { EzpsyMenuStore, UserStore } from "@/store/store";
    import Production from "@/components/ezpsy/Production.vue"
    import Table from "@/components/ezpsy/Table.vue";
    import Image from "@/components/ezpsy/Image.vue"
    import EzpsyBlock from "@/components/ezpsy/EzpsyBlock.vue";
    import CustomTable from "@/components/ezpsy/CustomTable.vue";
    import Codes from "@/components/ezpsy/Codes.vue"
    import Datas from "@/components/ezpsy/Datas.vue"
    import { getCurrentUser, logout, updateProfile } from "@/assets/index/auth";
    import { setContainer, tipPopup } from "@/assets/utils/popup";
    import agc from '@/assets/agc/agc'
    import { PhoneAuth } from "ezpsy-server"
    import { decrypt, encrypt } from "@/assets/utils/crypto";
    import { formatDate } from "@/assets/utils/utils";
    import { auth_default_mark } from "@/assets/utils/config";
    import { inputPopup } from "@/assets/utils/popup";
    import { getBase64, getBlob } from "@/assets/utils/image";

    interface AUTHMENU {
        text: string,
        func: ((payload: MouseEvent) => void) | undefined
    }

    const route = useRoute()
    const auth = agc.getAuth("Ezpsy_Auth") as PhoneAuth
    const storage = agc.storage

    const arrow = {
        up: "url(/src/assets/image/index/auth/up.svg)",
        down: "url(/src/assets/image/index/auth/down.svg)"
    }

    const data = reactive({
        store: EzpsyMenuStore(),
        currentMenu: "",
        auth: {
            user: {} as any,
            name: "",
            logo: "./src/assets/image/index/auth/auth_default.svg",
            time: "",
            time_text: "",
            time_show: true,
            show_menu: false,
            arrow: arrow.down,
            menus: [] as Array<AUTHMENU>
        },
        auth_show: true
    })

    const reload = async () => {
        const resp = await getCurrentUser()
        if(resp.isSuccess && !resp.isAnonymous) {
            const u = resp.data
            data.auth.user = u
            data.auth.name = u.getDisplayName()
            const avatar = u.getPhotoUrl()
            if(avatar !== "default" && !!(avatar)) {
                const avatarResp = await storage.getFileData(`/private/${u.getUid()}/ezImage/avatar.json`)
                if(avatarResp.isSuccess) {
                    data.auth.logo = getBlob(getBase64(avatarResp.data))
                }
            }
        } else {
            router.push("/index/login")
        }
    }

    const auth_menu: Array<AUTHMENU> = [
        {
            text: "修改信息",
            func: () => {
                inputPopup({
                    title: "请输入相关信息",
                    html: [
                        {
                            type: "input",
                            props: {
                                title: "用户名",
                                placeholder: "请输入",
                                default: data.auth.name,
                                require: true
                            }
                        },
                        {
                            type: "image",
                            props: {
                                default: data.auth.logo,
                                title: "头像:"
                            }
                        }
                    ],
                    preConfirm: (getValue) => {
                        return () => {
                            const res = getValue()
                            return {
                                title: res[0] as string,
                                image: res[1] as string
                            }
                        }
                    }
                }).then(res => {
                    if(res.isConfirmed) {
                        const name = data.auth.user.getDisplayName()
                        const url = data.auth.user.getPhotoUrl()
                        const obj = {
                            displayName: name,
                            photoUrl: url
                        }
                        let isUpload = false
                        if(res.value.title !== name) {
                            obj.displayName = res.value.title
                            isUpload = true
                        }
                        if(res.value.image !== "") {
                            if(url === "default") {
                                obj.photoUrl = "customize"
                                isUpload = true
                            }
                            storage.uploadString({
                                str: res.value.image,
                                folder: `private/${data.auth.user.getUid()}`,
                                name: "avatar",
                                extension: "json"
                            })
                        }
                        isUpload && updateProfile(data.auth.user, obj).then(update_resp => {
                            if(update_resp.isSuccess) {
                                reload()
                            }
                        })
                    }
                })
            }
        },
        {
            text: "重置密码",
            func: async () => {
                const phone = (await data.auth.user.getPhone()).replace("+86-", "")
                router.push({
                    path: "/index/reset",
                    query: {
                        phone: encrypt(phone, true)
                    }
                })
            }
        },
        {
            text: "注销账号",
            func: async () => {
                logout().then(res => {
                    router.push("/")
                })
            }
        }
    ]

    const menus = shallowRef([
        { key: "production", component: Production, icon: 'file-code',title: '个人项目', isSelected: true },
        // { key: "table", component: Table, icon: "file-word", title: "实验量表", isSelected: false },
        { key: "image", component: Image, icon: 'image', title: '图床图片', isSelected: false }, 
        { key: "ezpsy-block", component: EzpsyBlock, icon: "puzzle-piece", title: '实验设计', isSelected: false },
        // { key: "custom-table", component: CustomTable, icon: "file-pen", title: "表格设计", isSelected: false },
        { key: "codes", component: Codes, icon: 'list', title: '实验列表', isSelected: false },
        { key: "datas", component: Datas, icon: 'file-excel', title: '实验数据', isSelected: false }
    ])

    data.store.set(menus.value)

    onMounted(async () => {
        setContainer("spacial")
        const user = await getCurrentUser()
        log.info("USER", user)
        if(!user.isSuccess && !user.isAnonymous) {
            router.push("/index/login")
        } else {
            const userStorage = UserStore()
            userStorage.set(user.data.user)
            const u = user.data
            data.auth.user = u
            data.auth.name = u.getDisplayName()
            const avatar = u.getPhotoUrl()
            if(avatar !== "default" && !!(avatar)) {
                const avatarResp = await storage.getFileData(`/private/${u.getUid()}/avatar.json`)
                if(avatarResp.isSuccess) {
                    data.auth.logo = getBlob(getBase64(avatarResp.data))
                }
            }
            const info = await u.getUserExtra()
            data.auth.time = info.lastSignInTime
            data.auth.time_text = formatDate(parseInt(data.auth.time))
        }
        if(!route.query?.menu) {
            router.replace({
                query: { menu: "production" }
            })
        }
        data.currentMenu = route.query.menu as string
        data.auth.menus = auth_menu
        storage.setInsertFunc("reload", reload)
    })

    watch(router.currentRoute, () => {
        data.currentMenu = route.query?.menu as string
    })

    onBeforeUnmount(async () => {
        setContainer("normal")
        storage.deleteInsertFunc("reload")
    })

    const show_menu = (event: Event) => {
        if(!data.auth.show_menu) {
            data.auth.show_menu = true
            event.stopPropagation()
            nextTick(() => {
                document.body.addEventListener("click", close_menu)
            })
        }
    }

    const close_menu = () => {
        data.auth.show_menu = false
        document.body.removeEventListener("click", close_menu)
    }

    watch(() => data.auth.show_menu, value => {
        if(value) {
            data.auth.arrow = arrow.up
        } else {
            data.auth.arrow = arrow.down
        }
    })
    
</script>

<template>
    <div class="console">
        <EzpsyMenu></EzpsyMenu>
        <div class="content-box">
            <div class="header">
                <div class="item left"></div>
                <div class="item right" @click="show_menu">
                    <div class="auth-logo">
                        <img :src="data.auth.logo" class="logo">
                    </div>
                    <div class="name">
                        {{ data.auth.name }}
                    </div>
                    <div class="arrow"></div>
                    <div 
                        class="menu-list" 
                        v-if="data.auth.show_menu"
                    >
                        <div 
                            class="menu-item"
                            v-for="menu in data.auth.menus"
                            @click="menu.func"
                        >{{ menu.text }}</div>
                        <div class="time" v-if="data.auth.time_show">
                            上次登录:<br> 
                            <span> {{ data.auth.time_text }} </span>
                        </div>
                    </div>
                </div>
            </div>
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
        width: $ConsoleWidth !important;
        margin: auto;
        height: 100vh;
        display: flex;
        .content-box {
            width: calc(100% - $EzpsyMenuWidth);
            height: 100%;
            $HEADERWidth: 100%;$HEADERHeight: 60px;
            .header {
                width: $HEADERWidth;
                height: $HEADERHeight;
                line-height: $HEADERHeight;
                display: flex;
                justify-content: space-between;
                .item {
                    display: flex;
                    align-items: center;
                }
                .left {
                    width: 10px;
                }
                $AUTHLogoSize: 40px;
                .right {
                    height: $HEADERHeight;
                    gap: 10px;
                    position: relative;
                    cursor: pointer;
                    .auth-logo {
                        width: $AUTHLogoSize;
                        height: $AUTHLogoSize;
                        border-radius: 10px;
                        overflow: hidden;
                        .logo {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .name {
                        font-size: 14px;
                    }
                    $AUTHArrowSize: 20px;
                    .arrow {
                        width: $AUTHArrowSize;
                        height: $AUTHArrowSize;
                        background-image: v-bind("data.auth.arrow");
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        background-position: center center;
                        transition: all .5s;
                    }
                    $trangleWidth: 10px; $trangleHeight: 10px;
                    $color: #FFFFFF; $color-shadow: #0000001f;
                    .menu-list {
                        width: 100%;
                        position: absolute;
                        top: $HEADERHeight;
                        z-index: $ZIndex1;
                        background: $color;
                        border-radius: 10px;
                        filter: drop-shadow(0 2px 10px $color-shadow);
                        $MENUITEMGap: 5px;
                        $MENUITEMHieght: 32px;
                        cursor: default;
                        .menu-item {
                            width: 100%;
                            height: $MENUITEMHieght;
                            line-height: $MENUITEMHieght;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 14px;
                            margin: $MENUITEMGap 0;
                            cursor: pointer;
                        }
                        .menu-item:hover {
                            color: #0073bb;
                        }
                        .time {
                            width: fit-content;
                            height: $MENUITEMHieght;
                            line-height: 1.5;
                            font-size: 12px;
                            margin: $MENUITEMGap auto;
                            padding: 5px 0;
                            border-top: 2px solid #f5f5f5;
                            span {
                                color: #0073bb;
                            }
                        }
                    }
                    .menu-list::before {
                        content: "";
                        position: absolute;
                        width: 0;
                        height: 0;
                        border-left: $trangleWidth solid transparent;
                        border-right: $trangleWidth solid transparent;
                        border-bottom: $trangleHeight solid $color;
                        top: -$trangleHeight;
                        left: calc(50% - $trangleWidth);
                    }
                }
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