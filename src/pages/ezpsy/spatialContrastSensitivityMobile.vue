<script setup lang="ts">
import { onMounted, reactive } from "vue";
import ezpsy from "ezpsy"
import Swal from "sweetalert2";
import agc from "@/assets/agc/agc";
import { encrypt } from "@/assets/utils/crypto";
import uuid from "@/assets/utils/uuid";

const storage = agc.storage

agc.storage.setUploadPercent({
    next: (snapshot) => { },
    error: (error) => { },
    complete: () => { }
})

const AjaxData = (data: string) => {
    const name = "spatialContrastSensitivity"
    const json = {
        data: encrypt(JSON.stringify({
            sourceCode: name,
            data
        }))
    }
    storage.uploadString({
        str: JSON.stringify(json),
        folder: `private/1294907698625655936/ezData`,
        name: uuid.getUuid(),
        extension: "json"
    })
}

const getString = (data: any) => {
    console.log(data, typeof data)
    switch (typeof data) {
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

const data = reactive({
    size: {
        width: 0,
        height: 0
    },
    center: {
        x: 0,
        y: 0
    },
    singrat: {
        offset: 200,
        direction: -1,
        r: 100,
        ppd: 57,
        angle: 90,
        phase: 0,
        level: 0,
        gamma: 0.5
    }
})

onMounted(async () => {

    data.size.width = window.innerWidth
    data.size.height = window.innerHeight
    data.center.x = window.innerWidth / 2
    data.center.y = window.innerHeight / 2
    
    const ez = await ezpsy.init({
        el: document.getElementById("toturial") as HTMLElement,
        style: {
            width: data.size.width,
            height: data.size.height
        }
    })
    const dlg = ezpsy.DlgInit()
    const time = new ezpsy.Time();

    const drawSingrat = async (sf: number, contrast: number) => {
        const singrat = new ezpsy.sinGrat2({
            shape: {
                // x: data.center.x + data.singrat.direction * data.singrat.offset,
                x: data.center.x,
                y: data.center.y,
                r: data.singrat.r,
                pixelsPerDegree: data.singrat.ppd,
                spatialFrequency: sf,
                angle: data.singrat.angle,
                contrast: contrast,
                phase: data.singrat.phase,
                level: data.singrat.level,
                gamma: data.singrat.gamma
            },
            isNoise: false
        })
        await ez.add(singrat)
        await ezpsy.delay_frame(6)
        singrat.draw()
    }

    let bg = new ezpsy.sinGratBG({
        style: {
            luminance: 0.25
        }
    })
    await ez.add(bg)

    await drawSingrat(2, 1 / 1000)

})
</script>

<template>
    <div>
        <div id="toturial"></div>
        <button class="btn left">左</button>
        <button class="btn right">右</button>
    </div>
</template>

<style scoped lang="scss">
#toturial {
    width: 100%;
    height: 100%;
}

.btn {
    position: fixed;
    bottom: 20px;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    background: #333;
    color: #fff;
    font-size: 32px;
    border: none;
    line-height: 80px;
    text-align: center;
}

.left {
    left: 20px;
}

.right {
    right: 20px;
}
</style>