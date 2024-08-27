<script setup lang="ts">
import { onMounted, reactive, nextTick } from "vue";
import ezpsy from "ezpsy"
import Swal from "sweetalert2";
import agc from "@/assets/agc/agc";
import { encrypt } from "@/assets/utils/crypto";
import uuid from "@/assets/utils/uuid";
import { ElMessageBox } from "element-plus";
import 'element-plus/dist/index.css'

const storage = agc.storage

agc.storage.setUploadPercent({
    next: (snapshot: any) => { },
    error: (error: any) => { },
    complete: () => { }
})

const AjaxData = (data: string) => {
    const name = "spatialContrastSensitivityMobile"
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

const isLandscape = () => {
    return window.matchMedia("(orientation: landscape)").matches
}

const fullScreen = async () => {
    const docElm = document.documentElement;
    if (docElm.requestFullscreen) {
        await docElm.requestFullscreen();
        // @ts-ignore
    } else if (docElm.mozRequestFullScreen) { // Firefox
        // @ts-ignore
        await docElm.mozRequestFullScreen();
        // @ts-ignore
    } else if (docElm.webkitRequestFullScreen) { // Chrome, Safari and Opera
        // @ts-ignore
        await docElm.webkitRequestFullScreen();
        // @ts-ignore
    } else if (docElm.msRequestFullscreen) { // IE/Edge
        // @ts-ignore
        await docElm.msRequestFullscreen();
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
        gamma: 0.5,
        contrast: 0,
        SF: 0
    },
    canClick: false,
    random: 0,
    index: 0,
    isStart: false
})

const contrastList = {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: []
}

const times = 6;
const nums = 120;
const examParam = [0.5, 1, 2, 4, 8, 16];
const contrasts = Array.from({ length: times }).map(() => 0.1);
const examList = Array.from({ length: times }).map(() => nums);
let tips: ezpsy.Texts | null = null

const countTotal = () => {
    return examList.reduce((acc, val) => acc + val, 0)
}

const mathRandomInt = (a: number, b: number) => {
    if (a > b) { // Swap a and b to ensure a is smaller.    
        var c = a;
        a = b;
        b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
}

const left = () => {
    if (data.canClick) {
        const count = contrasts[data.random - 1]
        if (data.singrat.direction === -1) {
            data.index += 1
            if (data.index === 2) {
                const random = data.random
                contrastList[random].push(count)
                contrasts[random - 1] = 0.9 * count
                data.index = 0
            }
        } else {
            if (data.index === 0) {
                contrastList[data.random].push(count)
                contrasts[data.random - 1] = 0.9 * count
            } else if (data.index === 1) {
                contrastList[data.random].push(count)
            }
            data.index = 0
        }
        data.canClick = false
    }
}

const right = () => {
    if (data.canClick) {
        const count = contrasts[data.random - 1]
        if (data.singrat.direction === 1) {
            data.index += 1
            if (data.index === 2) {
                const random = data.random
                contrastList[random].push(count)
                contrasts[random - 1] = 0.9 * count
                data.index = 0
            }
        } else {
            if (data.index === 0) {
                contrastList[data.random].push(count)
                contrasts[data.random - 1] = 0.9 * count
            } else if (data.index === 1) {
                contrastList[data.random].push(count)
            }
            data.index = 0
        }
        data.canClick = false
    }
}

const singrat = async () => {

    const ez = await ezpsy.init({
        el: document.getElementById("toturial") as HTMLElement
    })
    const canvas = ez.canvas
    const physicalWidth = canvas.width;
    const physicalHeight = canvas.height;
    data.center.x = physicalWidth / 2
    data.center.y = physicalHeight / 2
    data.size.width = physicalWidth
    data.size.height = physicalHeight
    const dpr = ez.dpr || 1;
    const fixationSize = 80
    const min = Math.min(physicalWidth, physicalHeight)
    const max = Math.max(physicalWidth, physicalHeight)
    const radio = 0.75
    if(max > radio * 2 * min) {
        data.singrat.r = Math.floor(radio * min / 3)
    } else {
        data.singrat.r = Math.floor(radio * max / 2 / 3)
    }
    const imageSize = 3 * data.singrat.r + 1
    console.log(imageSize)
    data.singrat.offset = Math.floor(radio * (max / 2 - imageSize) / 4)

    const dlg = ezpsy.DlgInit()
    const time = new ezpsy.Time();

    const drawSingrat = async () => {
        const singrat = new ezpsy.sinGrating1({
            shape: {
                x: (data.singrat.direction > 0 ? 3 : 1) * data.center.x / 2 + data.singrat.direction * data.singrat.offset,
                y: data.center.y,
                r: data.singrat.r,
                pixelsPerDegree: data.singrat.ppd,
                spatialFrequency: data.singrat.SF / dpr,
                angle: data.singrat.angle,
                contrast: data.singrat.contrast,
                phase: data.singrat.phase,
                level: data.singrat.level,
                gamma: data.singrat.gamma
            },
            isNoise: false
        })
        await ez.add(singrat)
        // await ezpsy.delay_frame(30)
        singrat.draw()
        return singrat
    }
    const removeSingrat = (singrat: ezpsy.sinGrating1) => {
        ez.remove(singrat)
    }
    const setTips = async () => {
        !!(tips) && ez.remove(tips)
        tips = new ezpsy.Texts({
            shape: {
                x: data.center.x,
                y: data.center.y - 400,
                text: countTotal().toString()
            },
            style: {
                fill: "#333333",
                fontSize: 40
            },
            textLine: {
                textA: "center",
                textB: "middle"
            }
        })
        await ez.add(tips)
    }

    let bg = new ezpsy.sinGratBG({
        style: {
            luminance: 0.25
        }
    })
    await ez.add(bg)
    let text = new ezpsy.Texts({
        shape: {
            x: data.center.x,
            y: data.center.y,
            text: "+"
        },
        style: {
            fill: "#333333",
            fontSize: fixationSize
        },
        textLine: {
            textA: "center",
            textB: "middle"
        }
    })
    await ez.add(text)

    let circle = new ezpsy.Circle({
        shape: {
            x: data.center.x / dpr,
            y: data.center.y / dpr,
            r: 40
        },
        style: {
            fill: "#ff6600"
        }
    })

    const resp = await ElMessageBox.alert("请根据图像出现的位置判断, 图像出现在左边按左边按键, 图像出现在右边按右边按键。", "实验提示", {
        confirmButtonText: "确认",
        showClose: false
    })

    // if (resp) {
    //     await fullScreen()
    // }

    const nameResp = await ElMessageBox.prompt("请输入代号", "", {
        confirmButtonText: "开始实验",
        showClose: false,
        showCancelButton: false
    })
    console.log(nameResp)
    const name = nameResp.value

    await ez.add(circle)
    await ezpsy.delay_frame(120)
    ez.remove(circle)
    await ezpsy.delay_frame(6)
    await setTips()

    while (countTotal() > 0) {
        if (data.index === 0) {
            data.random = Math.floor(mathRandomInt(1, times))
            while (examList[data.random - 1] <= 0) {
                data.random = Math.floor(mathRandomInt(1, times))
            }
            data.singrat.contrast = contrasts[(data.random - 1)];
            data.singrat.SF = examParam[(data.random - 1)];
        }

        switch (Math.floor(Math.random() * 2)) {
            case 0:
                data.singrat.direction = -1
                break
            case 1:
                data.singrat.direction = 1
                break
            default:
                console.log("ERR")
        }

        const singrat = await drawSingrat()
        data.canClick = true
        await ezpsy.delay_frame(30)
        removeSingrat(singrat)
        await ezpsy.delay_frame(60)
        if (data.canClick) {
            const count = contrasts[data.random - 1]
            if (data.index === 0) {
                contrastList[data.random].push(count)
                contrasts[data.random - 1] = 1.1 * count
            } else if (data.index === 1) {
                contrastList[data.random].push(count)
            }
            data.index = 0
            data.canClick = false
        }
        if (data.index !== 1) {
            examList[data.random - 1] = examList[data.random - 1] - 1
            await setTips()
        }
    }

    console.log(contrastList)

    AjaxData(getString({"name2": name,"contrast_list": contrastList}))
    await ezpsy.delay_frame(120)
    ElMessageBox.confirm("感谢参与本次实验", "实验结束", {
        showClose: false,
        showCancelButton: false,
        confirmButtonText: "确认",
        closeOnClickModal: false
    })
}

const judgeIsLandscape = async () => {
    location.reload()
    if(isLandscape()) {
        data.isStart = true
    } else {
        data.isStart = false
    }
}

const judge = async () => {
    if(!isLandscape()) {
        let landscapeTip = await ElMessageBox.confirm("手机请横屏", "", {
            showClose: false,
            showCancelButton: false,
            confirmButtonText: "确认",
            closeOnClickModal: false
        })
        if(landscapeTip) {
            await judge()
        }
    } else {
        data.isStart = true
    }
}

onMounted(async () => {
    window.addEventListener("orientationchange", judgeIsLandscape)
    await judge()
    await singrat()
})
</script>

<template>
    <div>
        <div id="toturial"></div>
        <div class="btn left" @click="left">左</div>
        <div class="btn right" @click="right">右</div>
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
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none; /* 禁止用户选择文本 */
    -webkit-user-select: none; /* 针对Safari */
    -moz-user-select: none; /* 针对旧版Firefox */
    -ms-user-select: none; /* 针对IE/Edge */
}

.left {
    left: 20px;
}

.right {
    right: 20px;
}
</style>