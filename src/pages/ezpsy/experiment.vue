<script setup lang="ts">
    import { decrypt } from '@/assets/utils/crypto';
    import log from '@/assets/utils/log'
    import { onMounted, reactive } from 'vue';
    import { useRoute } from 'vue-router';
    import ezpsy from "ezpsy"

    const route = useRoute()
    const code = `(async function(){\n${decrypt(route.query.code as string)}\n}())`
    const _window = window as any

    const randerCode = (str: string, isString: boolean = true) => {
        return new Promise((res, rej) => {
            const script = document.createElement("script")
            if(isString)
                script.textContent = str
            else
                script.src = str
            document.getElementsByTagName('head')[0].appendChild(script)
            script.onload = () => {
                res(1)
            }

            script.onerror = () => {
                rej(0)
            }
        })
    }
    
    onMounted(async () => {
        await randerCode("static/blockly/src/requestAnimationFrame.js", false)
        await randerCode("static/blockly/src/graph-func.js", false)
        await randerCode("static/blockly/src/systemInformation-func.js", false)
        await randerCode("static/blockly/src/delay-func.js", false)
        await randerCode("static/blockly/src/clearScreen-func.js", false)
        await randerCode("static/blockly/src/control-func.js", false)
        await randerCode("static/blockly/src/animate-func.js", false)
        await randerCode("static/blockly/src/dataExport-func.js", false)
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
        log.info(code)
        await randerCode(code)
    })

    
</script>

<template>
    <div>
        <div id="toturial"></div>
    </div>
</template>

<style scoped lang="scss">
    
</style>