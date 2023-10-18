<script setup lang="ts">
    import log from '@/assets/utils/log'
    import ToolBox from './ToolBox.vue';
    import BLK from "blockly"
    import { onMounted, reactive, onBeforeUnmount } from 'vue';
    import initBlockly from '@/assets/ezpsy/initBlockly';
    import { showMsg, showImg, tipPopup, inputPopup, closePopup } from "@/assets/utils/popup";
    import router from '@/router/router';
    import { decrypt, encrypt } from '@/assets/utils/crypto';
    import { ScriptsStore } from '@/store/store';
    import { getCurrentUser } from '@/assets/index/auth';
    import agc from '@/assets/agc/agc'
    import uuid from "@/assets/utils/uuid"
    import { useRoute } from 'vue-router';
    import blocksInit from "@/assets/blockly/blocks/blocks_init"
    import javascriptInit from "@/assets/blockly/javascript/javascript_init"
    import defaultInit from "@/assets/blockly/default_init"
    import formatJavaScriptCode from "@/assets/utils/formatJS"

    const route = useRoute()    

    const tempConsoleWarn = console.warn
    const tempConsoleLog = console.log
    console.warn = message => {
        if(typeof message === 'string') {
            if(message.startsWith("block generator functions")) {
                return
            } else if(message.startsWith('No message string for ')) {
                return
            } else if(message.startsWith("CodeGenerator init")) {
                return
            } else if(message.startsWith("Deprecated call to")) {
                return
            } else {
                tempConsoleWarn(message)
            }
        } else tempConsoleWarn(message);
    }
    console.log = message => {
        if(typeof message === 'string') {
            if(message.startsWith("block generator functions")) {
                return
            } else if(message.startsWith('No message string for ')) {
                return
            } else {
                tempConsoleLog(message)
            }
        } else tempConsoleLog(message);
    }

    const storage = agc.storage

    const data = reactive({
        Blockly: {} as typeof BLK,
        // workspace: {} as BLK.WorkspaceSvg,
        code: "",
        xml: "",
        isFullScreen: false,
        isAllowUndo: false,
        isAllowRedo: false,
        imgIsShow: false
    })

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
            media: 'image/ezpsy/media/',
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

    onMounted(async () => {
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
        javascriptInit(data.Blockly as typeof BLK)
        defaultInit(data.Blockly as typeof BLK)
        await init()
        if(route.query?.xml) {
            // data.xml = decrypt(route.query.xml as string, true)
            const xml = decrypt(route.query.xml as string)
            const xmlDom = data.Blockly.utils.xml.textToDom(xml)
            data.Blockly.Xml.appendDomToWorkspace(xmlDom, data.Blockly.getMainWorkspace() as BLK.WorkspaceSvg)
        }
    })

    const showJs = () => {
        showMsg("JavaScript Code", formatJavaScriptCode(data.code))
    }

    const fullscreen = async () => {
        const BOX = document.getElementById("ezpsy-blockly") as HTMLElement
        data.isFullScreen = !data.isFullScreen
        if(data.isFullScreen) {
            document.body.requestFullscreen()
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
        } else {
            document.exitFullscreen()
            BOX.style.cssText = ``
            // data.Blockly.svgResize(data.workspace as BLK.WorkspaceSvg)
            data.Blockly.svgResize(data.Blockly.getMainWorkspace() as BLK.WorkspaceSvg)
        }
    }

    const save = async () => {
        const res = await getCurrentUser()
        log.info(res)
        if(res.isSuccess) {
            inputPopup({
                title: "请输入相关信息",
                html: [
                    {
                        type: "input",
                        props: {
                            title: "文件名",
                            placeholder: "请输入"
                        }
                    },
                    {
                        type: "multiline",
                        props: {
                            title: "描述",
                            placeholder: "请输入"
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
            }).then((result) => {
                if(result.isConfirmed) {
                    closePopup()
                    const value = result.value
                    const user = res.data.user
                    // log.info(user)
                    const json = {
                        // ctime: Date.now(),
                        // mtime: Date.now(),
                        data: encrypt(JSON.stringify({
                            creator: {
                                name: user.displayName,
                                avatar: user.photoUrl
                            },
                            description: value?.title ? value.title : "",
                            xml: data.xml,
                            code: data.code
                        }))
                    }
                    storage.uploadString({
                        str: JSON.stringify(json),
                        folder: `private/${user.uid}/ezBlock`,
                        name: value.title ? value.title : uuid.getUuid(),
                        extension: "json"
                    })
                }
            })
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
        showImg("image/ezpsy/keycode.png")
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

    const openImgLibirary = () => {
        data.imgIsShow = true
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
        var workspace = data.Blockly.getMainWorkspace() as BLK.WorkspaceSvg
        var allBlocks = workspace.getAllBlocks(true) 
        console.log(allBlocks)
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

    onBeforeUnmount(async () => {
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
    })

</script>

<template>
    <div class="ezpsy-blockly" id="ezpsy-blockly">
        <div id="ezpsy-experiment"></div>
        <div class="functional_area">
            <div class="btn-group-vertical">
                <button type="button" class="btn" @click="showJs">
                    <img src="image/ezpsy/icons/javascript.svg">
                </button>  
                <button type="button" class="btn" @click="save">
                    <img src="image/ezpsy/icons/save.svg">保存
                </button>
                <button type="button" class="btn" @click="showKeyCode">
                    <img src="image/ezpsy/icons/keycode.svg">keycode
                </button>
                <button type="button" class="btn" @click="download">
                    <img src="image/ezpsy/icons/cloud_download.svg">下载
                </button>
                <button type="button" class="btn" @click="openImgLibirary">
                    <img src="image/ezpsy/icons/img.svg">图床
                </button>
                <button 
                    :class="
                        data.isAllowUndo ? 
                        '' :
                        'button_denied'
                    " 
                    type="button" class="btn" @click="undo">
                    <img src="image/ezpsy/icons/back.svg">撤消
                </button>
                <button 
                    :class="
                        data.isAllowRedo ? 
                        '' :
                        'button_denied'
                    " 
                    type="button" class="btn" @click="redo">
                    <img src="image/ezpsy/icons/redo.svg">重做
                </button>
                <button type="button" class="btn" @click="load">
                    <img src="image/ezpsy/icons/upload.svg">加载
                </button>
                <button type="button" class="btn" @click="fullscreen">
                    <img 
                        :src="data.isFullScreen ? 
                        'image/ezpsy/icons/normalscreen.svg' : 
                        'image/ezpsy/icons/fullscreen.svg'"
                    >{{ data.isFullScreen ? "退出全屏" : "全屏" }}
                </button>
                <button type="button" class="btn btn-run" @click="run">
                    <img src="image/ezpsy/icons/run.svg">运行
                </button>
            </div>
        </div>
        <ToolBox></ToolBox>
        <div class="imgLibirary" v-if="data.imgIsShow">
            <div class="libiraryContent">
                <!-- LIST -->
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
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
        .imgLibirary {
            width: 100%;
            height: 100%;
            position: absolute;
            background: rgba(0,0,0,.4);
            top: 0;
            left: 0;
            z-index: 1000;
            display: flex;
            justify-content: center;
            align-items: center;
            .libiraryContent {
                width: 80%;
                height: 80%;
                background: #FFFFFF;
                border-radius: 24px;
            }
        }
    }
    
</style>