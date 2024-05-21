<script setup lang="ts">
    import log from '@/assets/utils/log'
    import ToolBox from './ToolBox.vue';
    import BLK from "blockly"
    import { onMounted, reactive, onBeforeUnmount, watch, ref, nextTick } from 'vue';
    import initBlockly from '@/assets/ezpsy/initBlockly';
    import { showMsg, showImg, tipPopup, inputPopup, closePopup, setContainer } from "@/assets/utils/popup";
    import router from '@/router/router';
    import { decrypt, encrypt } from '@/assets/utils/crypto';
    import { ScriptsStore, UserStore } from '@/store/store';
    import { getCurrentUser } from '@/assets/index/auth';
    import agc from '@/assets/agc/agc'
    import uuid from "@/assets/utils/uuid"
    import { useRoute } from 'vue-router';
    import blocksInit from "@/assets/blockly/blocks/blocks_init"
    import javascriptInit from "@/assets/blockly/javascript/javascript_init"
    import defaultInit from "@/assets/blockly/default_init"
    import formatJavaScriptCode from "@/assets/utils/formatJS"
    import { deepClone, formatDate } from '@/assets/utils/utils';
    import { DIRECTION } from '@/assets/utils/config';
    import { ObjectListSort } from '@/assets/utils/sort';
    import { getBlob } from '@/assets/utils/image';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import ContextMenu from "@/components/ezpsy/ContextMenu.vue"
    import storeImage from '@/assets/agc/storeImage';
    import { getStorage, setStorage } from '@/assets/utils/storage';

    const route = useRoute()  

    const tempConsoleWarn = console.warn
    const tempConsoleLog = console.log
    const ignores = [
        "block generator functions",
        "MutatorIcon.reconnect was deprecated",
        "No message string for ",
        "CodeGenerator init",
        "Deprecated call to"
    ]
    console.warn = (...data: any[]) => {
        if(typeof data[0] === 'string') {
            const res = ignores.filter(a => data[0].startsWith(a))
            if(res.length > 0) {
                return
            } else {
                tempConsoleWarn(...data)
            }
        } else tempConsoleWarn(...data);
    }
    console.log = (...data: any[]) => {
        if(typeof data[0] === 'string') {
            const res = ignores.filter(a => data[0].startsWith(a))
            if(res.length > 0) {
                return
            } else {
                tempConsoleLog(...data)
            }
        } else tempConsoleLog(...data);
    }

    const storage = agc.storage

    interface LIST {
        path: string
        name: string
        description: string
        modifyTime: string
        preview: string
        selected: boolean
    }

    const user = UserStore().getUser

    const contextIsShow = ref(false)

    const data = reactive({
        Blockly: {} as typeof BLK,
        // workspace: {} as BLK.WorkspaceSvg,
        code: "",
        xml: "",
        isFullScreen: false,
        isAllowUndo: false,
        isAllowRedo: false,
        imgIsShow: false,
        lists: [] as Array<LIST>,
        selectedItem: null as LIST | null,
        contextMenu: new Array<CONTEXT_MENU>(),
        position: {
            x: 0,
            y: 0
        } as POSITION,
        contextItem: {} as LIST,
        isStorage: false,
        storage: {
            title: "",
            description: ""
        },
        isGoto: false
    })

    const reloadLibirary = () => {
        if(data.imgIsShow) {
            data.imgIsShow = false
            nextTick(() => {
                data.imgIsShow = true
            })
        }
    }

    const init = async () => {
        const options = {
            toolbox: document.getElementById("ezpsy-toolbox") as HTMLElement,
            collapse: true,
            comments: true,
            disable: true,
            maxBlocks: 1000,
            trashcan: true,
            horizontalLayout: false,
            toolboxPosition: 'start',
            css: true,
            grid: {},
            zoom:{ 
                controls: true,
                wheel: true,
                startScale: 0.8,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed: 1.2
            },
            media: './src/assets/image/ezpsy/media/',
            rtl: false,
            scrollbars: true,
            sounds: false,
            oneBasedIndex: true
        }
        // data.workspace = data.Blockly.inject("ezpsy-experiment", options)
        const workspace = data.Blockly.inject("ezpsy-experiment", options)
        // data.workspace.addChangeListener((e) => {
        workspace.addChangeListener((e) => {
            // data.code = data.Blockly.JavaScript.workspaceToCode(data.workspace)
            data.code = data.Blockly.JavaScript.workspaceToCode(workspace)
            data.xml = 
                data.Blockly.Xml.domToText(
                    // data.Blockly.Xml.workspaceToDom(data.workspace as BLK.WorkspaceSvg)
                    data.Blockly.Xml.workspaceToDom(data.Blockly.getMainWorkspace() as BLK.WorkspaceSvg)
                )
            // data.isAllowUndo = data.workspace.getUndoStack().length > 0
            // data.isAllowRedo = data.workspace.getRedoStack().length > 0
            data.isAllowUndo = workspace.getUndoStack().length > 0
            data.isAllowRedo = workspace.getRedoStack().length > 0
        })
    }

    const handleFullScreenChange = (event: Event) => {
        if (!document.fullscreenElement) {
            changeToNormal(false)
        }
    }

    onMounted(async () => {
        document.addEventListener("fullscreenchange", handleFullScreenChange)
        await initBlockly()
        // @ts-ignore
        data.Blockly = window.Blockly
        data.Blockly.dialog.setPrompt((
            message: string,
            defaultValue: string,
            callback: (result: string | null) => void,
        ) => {
            inputPopup({
                title: message,
                html: [
                    {
                        type: "input",
                        props: {
                            title: "变量名",
                            placeholder: "请输入" 
                        }
                    }
                ],
                preConfirm: (getValue) => {
                    return () => {
                        const res = getValue()
                        return {
                            title: res[0]
                        }
                    }
                }
            }).then(res => {
                if(res.isConfirmed) {
                    callback(res.value.title)
                } else {
                    callback(defaultValue)
                }
            })
        })
        // data.Blockly.dialog.setAlert((
        //     message: string,
        //     callback: (() => void) | undefined
        // ) => {
        //     showMsg(message, "").then(() => {
        //         if(callback) {
        //             callback()
        //         }
        //     })
            
        // })
        blocksInit(data.Blockly as typeof BLK)
        await javascriptInit(data.Blockly as typeof BLK)
        defaultInit(data.Blockly as typeof BLK)
        await init()
        if(route.query?.key) {
            const key = route.query.key as string
            const storages = getStorage("EZPSY_PRODUCTION")
            let productions = {}
            let isStorage = true
            if(storages) {
                productions = JSON.parse(storages)
                if(!(key in productions)) {
                    isStorage = false
                }
            } 
            if(isStorage) {
                const production = productions[key]
                const xml = production.xml
                setXml(xml)
                data.storage = {
                    title: key,
                    description: production.description
                }
            } else {
                // @ts-ignore
                const fileRes = await storage.getFileData(`/private/${user?.uid}/ezBlock/${key}`)
                if(fileRes.isSuccess) {
                    const json = fileRes.data
                    json.data = JSON.parse(decrypt(json.data))
                    const xml = json.data.xml
                    setXml(xml)
                    data.storage = {
                        title: key,
                        description: json.data.description
                    }
                } else {
                    tipPopup("error", {
                        title: `项目 ${key} 不存在`,
                        tips: `未查询到项目 ${key}`,
                        closeTip: "点击空白处关闭"
                    }).then(() => {
                        router.replace({
                            query: {
                                menu: "ezpsy-block"
                            }
                        })
                    })
                }
            }
        } else if(route.query?.xml) {
            const xml = decrypt(route.query.xml as string)
            try {
                setXml(xml)
                const isSave = (route.query.isSave as string)
                if(isSave === "true") {
                    save(true)
                }
            } catch (error) {
                tipPopup("error", {
                    title: "文件错误",
                    tips: "您上传的文件有误, 请上传由ezpsy生成的xml文件!",
                    closeTip: "点击空白处关闭"
                }).then(() => {
                    router.replace({
                        query: {
                            menu: "production"
                        }
                    })
                })
            }
            
        }
        getFileList()
        data.contextMenu = [
            {
                title: "复制",
                func: (item) => {
                    copy_src(item)
                }
            },
            {
                title: {
                    value: [
                        "选中",
                        "取消选中"
                    ],
                    key: "selected"
                },
                func: (item) => {
                    selecte_image(item)
                }
            },
            {
                title: "预览",
                func: (item) => {
                    showImg(getBlob(item.preview))
                }
            }
        ]
        storage.setInsertFunc("reload", getFileList)
        data.isStorage = !!(data.storage.title)
    })

    const setXml = (xml: string) => {
        const xmlDom = data.Blockly.utils.xml.textToDom(xml)
        data.Blockly.Xml.appendDomToWorkspace(xmlDom, data.Blockly.getMainWorkspace() as BLK.WorkspaceSvg)
    }

    const showJS = () => {
        showMsg("JavaScript Code", formatJavaScriptCode(data.code))
    }

    const changeToFull = (isNeedInFull = true) => {
        data.isFullScreen = true
        const BOX = document.getElementById("ezpsy-blockly") as HTMLElement
        setContainer('fullscreen')
        isNeedInFull && document.body.requestFullscreen()
        BOX.style.cssText = `
            width: 100vw;
            height: 100vh;
            z-index: 100;
            flex-shrink: 0;
            flex-grow: 0;
            position: fixed;
            top: 0;
            left: 0;
        `
        // data.Blockly.svgResize(data.workspace as BLK.WorkspaceSvg)
        data.Blockly.svgResize(data.Blockly.getMainWorkspace() as BLK.WorkspaceSvg)
    }

    const changeToNormal = (isNeedOutFull = true) => {
        data.isFullScreen = false
        const BOX = document.getElementById("ezpsy-blockly") as HTMLElement
        setContainer('spacial')
        isNeedOutFull && document.exitFullscreen()
        BOX.style.cssText = ``
        // data.Blockly.svgResize(data.workspace as BLK.WorkspaceSvg)
        data.Blockly.svgResize(data.Blockly.getMainWorkspace() as BLK.WorkspaceSvg)
    }

    const fullscreen = async () => {
        data.isFullScreen ? changeToNormal() : changeToFull()
    }

    const save = async (isGoto: boolean = false) => {
        const res = await getCurrentUser()
        if(res.isSuccess && !res.isAnonymous) {
            const user = res.data.user
            const listsRes = storage.getFileListAll(`/private/${user?.uid}/ezBlock/`)
            if(data.isStorage) {
                const json = {
                    data: encrypt(JSON.stringify({
                        creator: {
                            name: user.displayName,
                            avatar: user.photoUrl
                        },
                        description: data.storage.description,
                        xml: data.xml,
                        code: data.code
                    }))
                }
                storage.uploadString({
                    str: JSON.stringify(json),
                    folder: `private/${user.uid}/ezBlock`,
                    name: data.storage.title,
                    extension: "json"
                })
            } else {
                inputPopup({
                    title: "请输入相关信息",
                    html: [
                        {
                            type: "input",
                            props: {
                                title: "文件名",
                                placeholder: "请输入",
                                default: data.storage.title,
                                require: true
                            }
                        },
                        {
                            type: "multiline",
                            props: {
                                title: "描述",
                                placeholder: "请输入",
                                default: data.storage.description
                            }
                        }
                    ],
                    preConfirm: (getValue) => {
                        return () => {
                            const res = getValue()
                            return {
                                title: res[0],
                                description: res[1]
                            }
                        }
                    }
                }).then(async (result) => {
                    if(result.isConfirmed) {
                        closePopup()
                        const value = result.value
                        const RES = await listsRes
                        if(RES.isSuccess) {
                            const set = new Set(RES.data.fileList.map((item: any) => {
                                return item.name.replace(".json", "")
                            }))
                            log.info(set)
                            if(set.has(value.title)) {
                                const isCover = await tipPopup("warn", {
                                    title: `资源 ${value.title} 已存在`,
                                    tips: `是否覆盖资源 ${value.title}`,
                                    confirmText: "覆盖",
                                    isUseCancel: true
                                })
                                if(!(isCover.isConfirmed)) {
                                    save()
                                    return
                                }
                            }
                        }
                        const json = {
                            // ctime: Date.now(),
                            // mtime: Date.now(),
                            data: encrypt(JSON.stringify({
                                creator: {
                                    name: user.displayName,
                                    avatar: user.photoUrl
                                },
                                description: value?.description ? value.description : "",
                                xml: data.xml,
                                code: data.code
                            }))
                        }
                        data.isGoto = isGoto
                        storage.uploadString({
                            str: JSON.stringify(json),
                            folder: `private/${user.uid}/ezBlock`,
                            name: value.title ? value.title : uuid.getUuid(),
                            extension: "json"
                        })
                    }
                })
            }
        } else {
            tipPopup("error", {
                title: "请登录",
                tips: "请登录后使用",
                isUseConfirm: true
            }).then(() => {
                router.push("/index/login")
            })
        }
    }

    const showKeyCode = () => {
        showImg("./src/assets/image/ezpsy/keycode.png")
    }
    
    const download = () => {
        let blob = new Blob([data.xml], {
            type: "text/xml;charset=utf-8"
        });
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function(e) {
            const target = e.target
            if(target) {
                let a = document.createElement('a');
                a.download = uuid.getUuid();
                a.href = target.result as string;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
            
        }
    }

    const getFileList = async () => {
        if(data.isGoto) {
            router.replace({
                query: {
                    menu: "production"
                }
            })
        }
        // @ts-ignore
        const listsRes = await storage.getFileListAll(`/private/${user?.uid}/ezImage/`)
        log.info(listsRes)
        if(listsRes.isSuccess){
            const cacheStr = getStorage("EZPSY_IMAGE")
            const hasCache = !!(cacheStr)
            let cache: Record<string, any> = {}
            if(hasCache) 
                cache = JSON.parse(cacheStr)
            let newCache: Record<string, any> = {}
            data.lists = []
            const lists = listsRes.data.fileList
            Promise.all(
                lists.map(async (list: any) => {
                    const title = list.name.split('.')[0]
                    const metadata = await list.getFileMetadata()
                    if(
                        title in cache &&
                        formatDate(metadata.mtime) === cache[title].modifyTime
                    ) {
                        data.lists.push(Object.assign(cache[title], {selected: false}))
                    } else {
                        const fileRes = await storage.getFileData(list.path)
                        if(fileRes.isSuccess) {
                            const json = fileRes.data
                            json.data = JSON.parse(decrypt(json.data))
                            const li = {
                                path: encrypt(list.path),
                                name: title,
                                description: json.data.description,
                                // modifyTime: formatDate(json.mtime),
                                modifyTime: formatDate(metadata.mtime),
                                preview: json.data.image
                            }
                            data.lists.push(Object.assign(li, {selected: false}))
                        }
                    }
                })
            ).then(() => {
                const newLists = ObjectListSort<LIST>({
                    list: data.lists,
                    method: DIRECTION.FORWARD,
                    key: "modifyTime"
                })
                data.lists = []
                newLists.forEach((list: any) => {
                    data.lists.push(deepClone(list))
                    delete list["selected"]
                    newCache[list.name] = list
                })
                setStorage("EZPSY_IMAGE", JSON.stringify(newCache))
                reloadLibirary()
            }) 
        }
    }

    const openImgLibirary = async () => {
        data.imgIsShow = true
        if(data.lists.length === 0) 
            getFileList()
    }

    const undo = () => {
        // data.workspace.undo(false)
        data.Blockly.getMainWorkspace().undo(false)
    }

    const redo = () => {
        // data.workspace.undo(true)
        data.Blockly.getMainWorkspace().undo(true)
    }

    const load = () => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = ".xml"
        input.click()
        input.addEventListener("change", () => {
            const files = input.files
            if(files) {
                const file = files[0]
                const reader = new FileReader()
                reader.onload = () => {
                    const result = reader.result as string | null
                    if(result) {
                        setXml(result)
                    }
                }
                reader.readAsText(file)
            } 
        })
    }

    const run = () => {
        const routeData = router.resolve({
            path: "/ezpsy/experiment",
            query: {
                code: encrypt(data.code)
            }
        })
        window.open(routeData.href, "_blank")
    }

    const close_libirary = (event: Event) => {
        const target = event.target as Node | null
        const dom = document.getElementById("EzpsyBlockLibirary")
        if(!(dom === target || dom?.contains(target))) {
            data.imgIsShow = false
        }
    }

    const close_libirary_now= (event: Event) => {
        data.imgIsShow = false
        event.preventDefault()
    }

    const selecte_image = (li: LIST) => {
        const selected = li.selected
        data.lists.forEach(item => {
            item.selected = false
        })
        li.selected = !selected
        if(li.selected) {
            data.selectedItem = li
        } else {
            data.selectedItem = null
        }
    }

    const copy_src = async (li: LIST) => {
        // const src = getBlob(li.preview)
        const src = `data:image/png;base64,${li.preview}`
        await navigator.clipboard.writeText(src);
        tipPopup("success", {
            title: `已选中 ${li.name}`, 
            tips: "已复制到剪切板中，请自行复制到相应位置",
            timer: 2000,
            isUseConfirm: true,
        }).then(() => {
            data.imgIsShow = false
        })
    }

    const open_contextmenu = (event: MouseEvent, li: LIST) => {
        data.position = {
            x: event.clientX,
            y: event.clientY
        }
        data.contextItem = li
        if(contextIsShow.value) {
            contextIsShow.value = false
            nextTick(() => {
                contextIsShow.value = true
            })
        } else {
            contextIsShow.value = true
        }
    }

    const libirary_upload = () => {
        storeImage(user)
    }

    const libirary_copy = () => {
        if(data.selectedItem) {
            copy_src(data.selectedItem)
        } else {
            tipPopup("warn", {
                title: "无法复制",
                tips: "请选择需要复制的图片",
                closeTip: "点击空白处关闭"
            })
        }
    }

    const libirary_preview = () => {
        if(data.selectedItem) {
            showImg(getBlob(data.selectedItem.preview)) 
        } else {
            tipPopup("warn", {
                title: "无法预览",
                tips: "请选择需要预览的图片",
                closeTip: "点击空白处关闭"
            })
        }
    }

    const libirary_cancel = (event: Event) => {
        close_libirary_now(event)
    }

    onBeforeUnmount(async () => {
        document.removeEventListener("fullscreenchange", handleFullScreenChange)
        const isFullScreen = !!(document.fullscreenElement)
        if(isFullScreen)
            document.exitFullscreen()
        console.log = tempConsoleLog
        console.warn = tempConsoleWarn
        const scriptStore = ScriptsStore()
        const scripts = scriptStore.getScripts
        scripts.forEach(script => {
            script.remove()
        })
        storage.deleteInsertFunc("reload")
    })

    const close_menu = () => {
        contextIsShow.value = false
    }

    watch(contextIsShow, (value) => {
        if(value) {
            document.body.addEventListener("click", close_menu)
        } else {
            document.body.removeEventListener("click", close_menu)
        }
    })

</script>

<template>
    <div 
        class="ezpsy-blockly" 
        id="ezpsy-blockly" 
    >
        <div id="ezpsy-experiment"></div>
        <div class="functional_area">
            <div class="btn-group-vertical">
                <button type="button" class="btn" @click="showJS">
                    <img src="@/assets/image/ezpsy/icons/javascript.svg">
                </button>  
                <button type="button" class="btn" @click="save()">
                    <img src="@/assets/image/ezpsy/icons/save.svg">保存
                </button>
                <button type="button" class="btn" @click="showKeyCode">
                    <img src="@/assets/image/ezpsy/icons/keycode.svg">keycode
                </button>
                <button type="button" class="btn" @click="download">
                    <img src="@/assets/image/ezpsy/icons/cloud_download.svg">下载
                </button>
                <button type="button" class="btn" @click="openImgLibirary">
                    <img src="@/assets/image/ezpsy/icons/img.svg">图床
                </button>
                <button 
                    :class="
                        data.isAllowUndo ? 
                        '' :
                        'button_denied'
                    " 
                    :disabled="!data.isAllowUndo"
                    type="button" class="btn" @click="undo">
                    <img src="@/assets/image/ezpsy/icons/back.svg">撤消
                </button>
                <button 
                    :class="
                        data.isAllowRedo ? 
                        '' :
                        'button_denied'
                    " 
                    :disabled="!data.isAllowRedo"
                    type="button" class="btn" @click="redo">
                    <img src="@/assets/image/ezpsy/icons/redo.svg">重做
                </button>
                <button type="button" class="btn" @click="load">
                    <img src="@/assets/image/ezpsy/icons/upload.svg">上传
                </button>
                <button type="button" class="btn" @click="fullscreen">
                    <img 
                        :src="data.isFullScreen ? 
                        './src/assets/image/ezpsy/icons/normalscreen.svg' : 
                        './src/assets/image/ezpsy/icons/fullscreen.svg'"
                    >{{ data.isFullScreen ? "退出全屏" : "全屏" }}
                </button>
                <button type="button" class="btn btn-run" @click="run">
                    <img src="@/assets/image/ezpsy/icons/run.svg">运行
                </button>
            </div>
        </div>
        <ToolBox></ToolBox>
        <div class="imgLibirary" v-if="data.imgIsShow" @click="close_libirary">
            <div id="EzpsyBlockLibirary" class="libiraryContent">
                <div class="libiraryHeader">
                    <font-awesome-icon 
                        class="libiraryClose" 
                        icon="xmark"
                        @click="close_libirary_now"
                    ></font-awesome-icon>
                </div>
                <div class="libiraryImage no_scroll_bar">
                    <div 
                        class="image" 
                        :class="item.selected ? 'image-selected' : ''" 
                        v-for="item in data.lists"
                        @click="selecte_image(item)"
                        @dblclick="copy_src(item)"
                        @contextmenu.prevent="open_contextmenu($event, item)"
                    >
                        <img :src="getBlob(item.preview)" />
                    </div>
                </div>
                <div class="libiraryOperate">
                    <div class="libiraryButton libiraryAdd" @click="libirary_upload">上传</div>
                    <div class="libiraryButton libiraryCopy" @click="libirary_copy">复制</div>
                    <div class="libiraryButton libiraryPreview" @click="libirary_preview">预览</div>
                    <div class="libiraryButton libiraryCancel" @click="libirary_cancel">关闭</div>
                </div>
            </div>
        </div>
        <ContextMenu 
            v-if="contextIsShow" 
            :list="data.contextMenu" 
            :position="data.position" 
            :item="data.contextItem"
        ></ContextMenu>
    </div>
</template>

<style scoped lang="scss">
    @import "../../scss/app.scss";
    $functionalWidth: 160px;
    .ezpsy-blockly {
        width: 100%;
        height: 100%;
        display: flex;
        box-shadow: 
            3px 5px 5px 0px #cccccc, 
            -2px -3px 10px 0px #cccccc;
        #ezpsy-experiment {
            width: calc(100% - $functionalWidth);
            height: 100%;
        }
        .functional_area {
            width: $functionalWidth;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fefefe;
            .btn-group-vertical {
                width: 100%;
                height: 80%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                .btn {
                    width: 80%;
                    height: 40px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    outline: none;
                    background: #f0f0f0;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    img {
                        width: 22px;
                        height: 22px;
                    }
                }
                .button_denied {
                    opacity: .5;
                    cursor: not-allowed;
                }
                .btn-run {
                    background: #005795;
                    color: #ffffff;
                    img {
                        filter: brightness(100);
                    }
                }
                .btn:hover {
                    background: #3379aa;
                }
                .button_denied:hover {
                    background: #f0f0f0;
                }
            }
        } 
        $HEADERHeight: 32px; $HEADERTop: 16px;
        $BOTTOMHeght: 40px; $BOTTOMbottom: $HEADERTop;
        $IMGAEHeight: calc(100% - $HEADERHeight - $HEADERTop - $BOTTOMHeght - $BOTTOMbottom);
        .imgLibirary {
            width: 100%;
            height: 100%;
            position: absolute;
            background: rgba(0,0,0,.4);
            top: 0;
            left: 0;
            z-index: $ZIndexLessTop;
            display: flex;
            justify-content: center;
            align-items: center;
            
            .libiraryContent {
                width: 80%;
                height: 80%;
                background: #FFFFFF;
                border-radius: 24px;
                .libiraryHeader {
                    width: 100%;
                    height: $HEADERHeight;
                    font-size: $HEADERHeight;
                    font-weight: 700;
                    position: relative;
                    display: flex;
                    justify-content: flex-end;
                    top: $HEADERTop;
                    padding: 0 20px;
                    box-sizing: border-box;
                    .libiraryClose {
                        width: $HEADERHeight;
                        height: $HEADERHeight;
                        text-align: center;
                        font-size: 20px;
                        cursor: pointer;
                    }
                    .libiraryClose:hover {
                        color: #FF0000;
                    }
                }
                .libiraryImage {
                    width: 100%;
                    min-height: $IMGAEHeight;
                    display: flex;
                    // justify-content: flex-start;
                    flex-wrap: wrap;
                    padding: 2%;
                    box-sizing: border-box;
                    .image {
                        width: 20%;
                        height: auto;
                        aspect-ratio: 1/1;
                        display: block;
                        margin: 2.5%;
                        padding: 1%;
                        border: 2px solid #FFFFFF;
                        box-sizing: border-box;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            max-width: 100%;
                            max-height: 100%;
                            width: auto;
                            height: auto;
                            display: block;
                            margin: auto
                        }
                    }
                    .image:hover {
                        border-color: #005795;
                    }
                    .image-selected {
                        border-color: #005795;
                    }
                }
                .libiraryOperate {
                    width: 100%;
                    height: $BOTTOMHeght;
                    position: relative;
                    bottom: $BOTTOMbottom;
                    display: flex;
                    justify-content: flex-end;
                    .libiraryButton {
                        // width: 60px;
                        height: $BOTTOMHeght;
                        aspect-ratio: 3/2;
                        margin: 0 20px;
                        border-radius: 4px;
                        cursor: pointer;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        font-weight: 600;
                        border: 1px solid;
                        box-sizing: border-box;
                    }
                    .libiraryButton:hover {
                        background: none;
                    }
                    $ADDColor: #d5a979;
                    .libiraryAdd {
                        background: $ADDColor;
                        border-color: $ADDColor;
                        color: #FFFFFF;
                    }
                    .libiraryAdd:hover {
                        color: $ADDColor;
                    }
                    $COPYColor: #005795;
                    .libiraryCopy {
                        background: $COPYColor;
                        border-color: $COPYColor;
                        color: #FFFFFF;
                    }
                    .libiraryCopy:hover {
                        color: $COPYColor;
                    }
                    $PREVIEWColor: #78cf8e;
                    .libiraryPreview {
                        background: $PREVIEWColor;
                        border-color: $PREVIEWColor;
                        color: #FFFFFF;
                    }
                    .libiraryPreview:hover {
                        color: $PREVIEWColor;
                    }
                    $CancelColor: #888888;
                    .libiraryCancel {
                        background: $CancelColor;
                        border-color: $CancelColor;
                        color: #FFFFFF;
                    }
                    .libiraryCancel:hover {
                        color: $CancelColor;

                    }
                }
            }
            
        }
    }
    
</style>