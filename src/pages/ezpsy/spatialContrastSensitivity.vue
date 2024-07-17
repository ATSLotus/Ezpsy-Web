<script setup lang="ts">
    import { encrypt } from '@/assets/utils/crypto';
    import { onBeforeUnmount, onMounted, reactive } from 'vue';
    import ezpsy from "ezpsy"
    import agc from '@/assets/agc/agc';
    import uuid from '@/assets/utils/uuid';
    import Swal from 'sweetalert2';
    import { base64tostring } from '@/assets/utils/utils';
    import spatialContrastSensitivity from '@/assets/ezpsy/spatialContrastSensitivity';
    import { showMsg } from '@/assets/utils/popup';
    import formatJavaScriptCode from '@/assets/utils/formatJS';

    const baseUrl = window.location.origin
    console.log("BASE", baseUrl)

    const _window = window as any

    const randerCode = async (str: string, isString: boolean = true): Promise<HTMLScriptElement> => {
        return await new Promise((res, rej) => {
            const script = document.createElement("script")
            if(isString)
                script.textContent = str
            else
                script.src = str
            document.getElementsByTagName('head')[0].appendChild(script)
            script.onload = () => {
                res(script)
            }

            script.onerror = () => {
                rej(0)
            }
        })
    }

    const data = reactive({
        scripts: new Array<HTMLScriptElement>()
    })

    const storage = agc.storage
    
    onMounted(async () => {
        data.scripts.push(await randerCode("static/blockly/src/requestAnimationFrame.js", false))
        data.scripts.push(await randerCode("static/blockly/src/graph-func.js", false))
        data.scripts.push(await randerCode("static/blockly/src/systemInformation-func.js", false))
        data.scripts.push(await randerCode("static/blockly/src/delay-func.js", false))
        data.scripts.push(await randerCode("static/blockly/src/clearScreen-func.js", false))
        data.scripts.push(await randerCode("static/blockly/src/control-func.js", false))
        data.scripts.push(await randerCode("static/blockly/src/animate-func.js", false))
        data.scripts.push(await randerCode("static/blockly/src/table-func.js", false))
        // data.scripts.push(await randerCode("static/blockly/src/dataExport-func.js", false))
        const ez = ezpsy.init({
            el: document.getElementById("toturial") as HTMLElement,
            style: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        })
        const dlg = ezpsy.DlgInit()
        const time = new ezpsy.Time();
        // const keypress = ezpsy.KeypressInit('keydown')
        const keypress = new ezpsy.keypress("keydown")
        _window.ezpsy = ezpsy
        _window.ez = ez
        _window.dlg = dlg
        _window.time = time
        _window.keypress = keypress
        _window.Swal = Swal
        _window.utils = {
            base64tostring: base64tostring
        }
        agc.storage.setUploadPercent({
            next: (snapshot) => {},
            error: (error) => {},
            complete: () => {}
        })
        _window.AjaxData = (id: string, data: string) => {
            const name = "spatialContrastSensitivity"
            const json = {
                data: encrypt(JSON.stringify({
                    sourceCode: name,
                    data
                }))
            }
            storage.uploadString({
                str: JSON.stringify(json),
                folder: `private/${id}/ezData`,
                name: uuid.getUuid(),
                extension: "json"
            })
            console.log(data)
            // if(baseUrl.startsWith("https://agc.ezpsy.net")) {
                
            // } else {
            //     console.log(data)
            //     // showMsg("Result", formatJavaScriptCode(data))
            // }
        }
        _window.getString = (data: any) => {
            console.log(data, typeof data)
            switch(typeof data) {
                case "object":
                    return JSON.stringify(data)
                case "number":
                    return `${data}`
                case "undefined":
                    return ""
                default:
                    return data.toString()
            }
        }
        _window.toFixed = (con: number, spatialFrequency: number) => {
            switch(spatialFrequency) {
                case 0.5: 
                    if(con < 0.0729)
                        con = con / 1.2
                    else if(con < 0.0486) 
                        con = con / 2
                    else if(con < 0.0243)
                        con = con / 4
                    else if(con < 0.0122)
                        con = con / 8
                    break
                case 1: 
                    break
                case 2: 
                    break
                case 4: 
                    break
                case 8: 
                    break
                case 16: 
                    break
                default:
                    break
            }
            return con
        }
        
        const code = `(async () => {${spatialContrastSensitivity}\n})()`
        data.scripts.push(await randerCode(code)) 
        
        // data.scripts.push(await randerCode(code))
    })

    onBeforeUnmount(async () => {
        delete _window.ezpsy
        delete _window.ez 
        delete _window.dlg
        delete _window.time
        delete _window.keypress
        delete _window.Swal
        delete _window.utils
        data.scripts.forEach(script => {
            if(script)
                document.getElementsByTagName('head')[0].removeChild(script)
        })
    })
    
</script>

<template>
    <div>
        <div id="toturial"></div>
    </div>
</template>

<style scoped lang="scss">
    #toturial {
        position: absolute;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        canvas {
            top: 0;
            left: 0;
        }
    }
</style>
<style lang="scss"> 
    @import "@/scss/editor-table.scss";
</style>