<script setup lang="ts">
    import log from '@/assets/utils/log'
    import ToolBox from './ToolBox.vue';
    import BLK from "blockly"
    import { onMounted, reactive, onBeforeUnmount } from 'vue';
    import initBlockly from '@/assets/ezpsy/initBlockly';
    import { showMsg } from "@/assets/utils/popup";

    const tempConsoleWarn = console.warn
    const tempConsoleLog = console.log
    console.warn = message => {
      if (message.startsWith('WARNING: No message string for')) return;
      else tempConsoleWarn(message);
    }
    console.log = message => {
      if (message.startsWith('WARNING: No message string for ')) return;
      else tempConsoleLog(message);
    }

    const data = reactive({
        Blockly: {} as typeof BLK,
        workspace: {} as BLK.WorkspaceSvg,
        code: "",
        xml: "",
        isFullScreen: false,
    })

    const init = async () => {
        const options = {
            toolbox: document.getElementById("ezpsy-toolbox") as HTMLElement,
            collapse: true,
            comments: true,
            disable: true,
            maxBlocks: Infinity,
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
        data.workspace = data.Blockly.inject("ezpsy-experiment", options)
        data.workspace.addChangeListener((e) => {
            data.code = data.Blockly.JavaScript.workspaceToCode(data.workspace)
            data.xml = 
                data.Blockly.Xml.domToText(
                    data.Blockly.Xml.workspaceToDom(data.workspace as BLK.WorkspaceSvg)
                )
            // log.info("JS", data.code)
            // log.info("Xml", data.xml)
        })
    }

    onMounted(async () => {
        await initBlockly()
        // @ts-ignore
        data.Blockly = await window.Blockly
        await init()
    })

    const showJs = () => {
        showMsg("JavaScript Code", data.code)
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
                position: absolute;
                top: 0;
                left: 0;
            `
            data.Blockly.svgResize(data.workspace as BLK.WorkspaceSvg)
        } else {
            document.exitFullscreen()
            BOX.style.cssText = ``
            data.Blockly.svgResize(data.workspace as BLK.WorkspaceSvg)
        }
    }

    onBeforeUnmount(async () => {
        const isFullScreen = !!(document.fullscreenElement)
        if(isFullScreen)
            document.exitFullscreen()
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
                <button type="button" class="btn">
                    <img src="image/ezpsy/icons/save.svg">保存
                </button>
                <button type="button" class="btn">
                    <img src="image/ezpsy/icons/keycode.svg">keycode
                </button>
                <button type="button" class="btn">
                    <img src="image/ezpsy/icons/cloud_download.svg">下载
                </button>
                <button type="button" class="btn">
                    <img src="image/ezpsy/icons/img.svg">图床
                </button>
                <button type="button" class="btn">
                    <img src="image/ezpsy/icons/back.svg">返回
                </button>
                <button type="button" class="btn">
                    <img src="image/ezpsy/icons/upload.svg">加载
                </button>
                <button type="button" class="btn" @click="fullscreen">
                    <img 
                        :src="data.isFullScreen ? 
                        'image/ezpsy/icons/normalscreen.svg' : 
                        'image/ezpsy/icons/fullscreen.svg'"
                    >{{ data.isFullScreen ? "退出全屏" : "全屏" }}
                </button>
                <button type="button" class="btn btn-run">
                    <img src="image/ezpsy/icons/run.svg">运行
                </button>
            </div>
        </div>
        <ToolBox></ToolBox>
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
            }
        }
    }
    
</style>