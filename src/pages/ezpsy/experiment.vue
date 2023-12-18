<script setup lang="ts">
    import { decrypt, encrypt } from '@/assets/utils/crypto';
    import log from '@/assets/utils/log'
    import { onBeforeUnmount, onMounted, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import ezpsy from "ezpsy"
    import agc from '@/assets/agc/agc';
    import uuid from '@/assets/utils/uuid';
    import { showMsg } from '@/assets/utils/popup';
    import formatJavaScriptCode from '@/assets/utils/formatJS';
import Swal from 'sweetalert2';

    const route = useRoute()
    const code = `(async function(){\n${decrypt(route.query.code as string)}\n}())`
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
        const keypress = ezpsy.KeypressInit('keydown')
        _window.ezpsy = ezpsy
        _window.ez = ez
        _window.dlg = dlg
        _window.time = time
        _window.keypress = keypress
        _window.Swal = Swal
        _window.AjaxData = (id: string, data: string) => {
            const name = route.query?.experiment
            if(name) {
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
            } else {
                showMsg("Result", formatJavaScriptCode(data))
            }
        }
        _window.getString = (data: any) => {
            switch(typeof data) {
                case "object":
                    return JSON.stringify(data)
                default:
                    return data.toString()
            }
        }
        data.scripts.push(await randerCode(code))
    })

    onBeforeUnmount(async () => {
        delete _window.ezpsy
        delete _window.ez 
        delete _window.dlg
        delete _window.time
        delete _window.keypress
        delete _window.Swal
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