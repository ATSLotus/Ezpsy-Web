<script setup lang="ts">
    import agc from '@/assets/agc/agc';
    import { getCurrentUser, logout, updateProfile } from '@/assets/index/auth';
    import { decrypt, encrypt } from '@/assets/utils/crypto';
    import { getBase64, getBlob } from '@/assets/utils/image';
    import log from '@/assets/utils/log'
    import { inputPopup, setContainer, tipPopup } from '@/assets/utils/popup';
    import { formatDate } from '@/assets/utils/utils';
    import router from '@/router/router';
    import { UserStore } from '@/store/store';
    import { onMounted, reactive, nextTick, watch } from 'vue';
    import { loginAnonymously } from "@/assets/index/auth"

    interface AUTHMENU {
        text: string,
        func: ((payload: MouseEvent) => void) | undefined
    }

    const arrow = {
        up: "url(/src/assets/image/index/auth/up.svg)",
        down: "url(/src/assets/image/index/auth/down.svg)"
    }

    const reload = async () => {
        const resp = await getCurrentUser()
        data.isAuth = resp.isSuccess && !resp.isAnonymous
        if(resp.isSuccess && !resp.isAnonymous) {
            const u = resp.data
            data.auth.user = u
            data.auth.name = u.getDisplayName()
            const avatar = u.getPhotoUrl()
            if(avatar !== "default" && !!(avatar)) {
                const avatarResp = await storage.getFileData(`/private/${u.getUid()}/ezImage/avatar.json`)
                if(avatarResp.isSuccess) {
                    data.auth.logo = getBlob(getBase64(avatarResp.data as string))
                }
            }
        } else if(resp.isAnonymous) {
            
        } else {
            const resp = await loginAnonymously()
            log.info("Anonymously", resp)
        }
    }

    const auth_menu: Array<AUTHMENU> = [
        {
            text: "控制台",
            func: () => {
                router.push("/ezpsy/console")
            }
        },
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
                    if(res) {
                        tipPopup("success", {
                            title: "注销成功",
                            tips: "已成功登出账户",
                            timer: 1000
                        }).then(reload)
                    }
                })
            }
        }
    ]

    const data = reactive({
        logo: './src/assets/image/logo.png',
        isAuth: false,
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
        banner: "./src/assets/image/index/banner/banner1.png",
        experiments: [] as Array<any>,
        defaultDescription: "该实验未提供任何描述。"
    })

    const storage = agc.storage
    
    onMounted(async () => {
        setContainer("fullscreen")
        const user = await getCurrentUser()
        log.info("USER", user)
        data.isAuth = user.isSuccess && !user.isAnonymous
        if(data.isAuth) {
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
            data.auth.menus = auth_menu
        } else if(user.isAnonymous) {

        } else {
            const resp = await loginAnonymously()
            log.info("Anonymously", resp)
        }
        const public_path = `public/`
        const all_list = await storage.getFileListAll(public_path)
        if(all_list.isSuccess) {
            const dir_list = all_list.data.dirList.filter((dir: any) => dir.name !== public_path)
            log.info("DIRS", dir_list)
            Promise.all(dir_list.map(async (dir: any) => {
                const path = `${dir.path}ezExperiment/`
                log.info("PATH", path)
                const files_resp = await storage.getFileListAll(path)
                log.info("FILE RESP", files_resp)
                if(files_resp.isSuccess) {
                    const file_lists = files_resp.data.fileList
                    const len = file_lists.length
                    for(let i = 0; i < len; i++) {
                        const list = file_lists[i]
                        const title = list.name.split('.')[0]
                        const fileRes = await storage.getFileData(list.path)
                        log.info("FILE RES", fileRes)
                        if(fileRes.isSuccess) {
                            const json = fileRes.data
                            json.data = JSON.parse(decrypt(json.data))
                            data.experiments.push({
                                path: list.path,
                                title: title,
                                description: json.data.description,
                                code: json.data.code
                            })
                        }
                    }
                }
            }))
        }
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

    const logIn = () => {
        router.push("/index/login")
    }

    const signUp = () => {
        router.push("/index/register")
    }

    const gotoExperiment = (title: string, path: string) => {
        const routeData = router.resolve({
            path: "/ezpsy/experiment",
            query: {
                // code: encrypt(code),
                path: encrypt(path),
                experiment: title
            }
        })
        window.open(routeData.href, "_blank")
    }

</script>

<template>
    <div>
        <div id="header" class="header">
            <div class="logo">
                <div class="logoIcon">
                    <img :src="data.logo" alt="" />
                </div>
                <div class="logoText">Ezpsy</div>
            </div>
            <div class="Auth">
                <div class="isAuth" v-if="data.isAuth" @click="show_menu">
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
                <div class="isNoAuth" v-if="!data.isAuth">
                    <div class="item logIn" @click = "logIn">登录</div>
                    <div class="item SignUp" @click="signUp">注册</div>
                </div>
            </div>
        </div>
        <div class="body">
            <div class="banner-container">
                <img :src="data.banner" alt="" >
            </div>
            <div class="experiments-container">
                <div class="experiments-title">
                    <div class="title-span">在线实验</div>
                </div>
                <div class="experiments-box">
                    <div class="experiments">
                        <div class="experiment" v-for="experiment in data.experiments" @click="gotoExperiment(experiment.title, experiment.path)">
                            <div class="experiment-title">{{ experiment.title }}</div>
                            <div class="experiment-description">
                                {{ 
                                    !!(experiment.description) ? 
                                    experiment.description :
                                    data.defaultDescription
                                }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "@/scss/app.scss";
    $HEADER_HEIGHT: 60px;
    $LOGOSIZE: 60px;
    .header {
        width: 100%;
        padding: 0 10%;
        box-sizing: border-box;
        height: $HEADER_HEIGHT;
        box-shadow: 2px 5px 5px #cccccc;
        display: flex;
        justify-content: space-between;
        position: fixed;
        top: 0;
        z-index: $ZIndexLessTop;
        background: #FFFFFF;
        .logo {
            // width: 200px;
            height: $HEADER_HEIGHT;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .logoIcon {
                width: $LOGOSIZE;
                height: $LOGOSIZE;
                img {
                    width: $LOGOSIZE;
                    height: $LOGOSIZE;
                }
            }
            .logoText {
                font-size: 24px;
                font-weight: bold;
                margin-left: 20px;
            }
        }
        $AUTHLogoSize: 40px;
        .Auth {
            height: $HEADER_HEIGHT;
            .isAuth {
                height: $HEADER_HEIGHT;
                gap: 10px;
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
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
                    top: $HEADER_HEIGHT;
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
            .isNoAuth {
                height: $HEADER_HEIGHT;
                display: flex;
                align-items: center;
                gap: 20px;
                .item {
                    cursor: pointer;
                }
                .item:hover {
                    color: #0073bb;
                }
            }
        }
    }
    .body {
        width: 100%;
        overflow: hidden;
        position: relative;
        top: $HEADER_HEIGHT;
        .banner-container {
            overflow: hidden;
            width: 100%;
            img {
                width: 100%;
                height: auto;
                cursor: pointer;
            }
        }
        $EXPERIMENT_TITLE_HEIGHT: 60px;
        .experiments-container {
            width: 100%;
            .experiments-title {
                width: 100%;
                height: $EXPERIMENT_TITLE_HEIGHT;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                .title-span {
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-bottom: 2px solid #005795;
                }
            }
        }
        $EXP_TILTE_HEIGHT: 30px; $EXP_LINE_NUMBER: 4;
        $EXP_BORDER: 10px;
        $EXP_DES_LINEHEIGHT: 25px; $EXP_DES_HEIGHT: $EXP_LINE_NUMBER * $EXP_DES_LINEHEIGHT + 2 * $EXP_BORDER;
        $EXP_HEIGHT: $EXP_TILTE_HEIGHT + $EXP_DES_HEIGHT;
        .experiments-box {
            width: 100%;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            .experiments {
                width: 90%;
                display: flex;
                justify-content: flex-start;
                // align-items: center;
                flex-wrap: wrap;
                gap: 2.5%;
            }
            .experiment {
                width: 18%;
                height: $EXP_HEIGHT;
                box-shadow: 2px 3px 3px #cccccc;
                margin-bottom: 20px;
                cursor: pointer;
                .experiment-title {
                    display: flex;
                    width: 100%;
                    justify-content: center;
                    height: $EXP_TILTE_HEIGHT;
                    font-size: 20px;
                }
                .experiment-description {
                    width: 100%;
                    height: $EXP_DES_HEIGHT;
                    line-height: $EXP_DES_LINEHEIGHT;
                    text-indent: 2em;
                    font-size: 14px;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-line-clamp: $EXP_LINE_NUMBER;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                    border: $EXP_BORDER solid #FFFFFF;
                    box-sizing: border-box;
                    text-align: justify;
                }
            }
        }
    }
</style>