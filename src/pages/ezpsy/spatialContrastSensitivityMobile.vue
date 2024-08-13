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
        gamma: 0.5,

        contrast: 0,
        SF: 0
    },
    canClick: false
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
const exam_param = [0.5, 1, 2, 4, 8, 16];
const contrasts = Array.from({ length: times }).map(() => 0.1);
const exam_list = Array.from({ length: times }).map(() => nums);
let tips: ezpsy.Texts | null = null

const countTotal = () => {
    return exam_list.reduce((acc, val) => acc + val, 0)
}

const mathRandomInt = (a: number, b: number) => {
    if (a > b) { // Swap a and b to ensure a is smaller.    
        var c = a;
        a = b;
        b = c;
    }  
    return Math.floor(Math.random() * (b - a + 1) + a);
}

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

    const drawSingrat = async () => {
        const singrat = new ezpsy.sinGrating1({
            shape: {
                x: data.center.x + data.singrat.direction * data.singrat.offset,
                y: data.center.y,
                r: data.singrat.r,
                pixelsPerDegree: data.singrat.ppd,
                spatialFrequency: data.singrat.SF,
                angle: data.singrat.angle,
                contrast: data.singrat.contrast,
                phase: data.singrat.phase,
                level: data.singrat.level,
                gamma: data.singrat.gamma
            },
            isNoise: false
        })
        await ez.add(singrat)
        await ezpsy.delay_frame(10)
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
                y: data.center.y - 150,
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
            fontSize: 80
        },
        textLine: {
            textA: "center",
            textB: "middle"
        }
    })
    await ez.add(text)

    let circle = new ezpsy.Circle({
        shape: {
            x: data.center.x,
            y: data.center.y,
            r: 40
        },
        style: {
            fill: "#ff6600"
        }
    })
    await ez.add(circle)
    await ezpsy.delay_frame(120)
    ez.remove(circle)
    await ezpsy.delay_frame(6)
    await setTips()

    const msg_resp = await dlg.msgDlg({
        imgUrl: './src/assets/image/ezpsy/spatialContrastSensitivity.png',        
        title: "",
        content: '请仔细阅读用户指引',        
        imgWidth: 240,        
        imgHeight: 180,        
        confirm: '开始实验' 
    })

    if(msg_resp) {
        document.documentElement.requestFullscreen();
    }
    
    let index = 0
    // while(countTotal() > 0) {
        let random = 1
        if(index == 0) {
            random = Math.floor(mathRandomInt(1, times))
            while(exam_list[random - 1] <= 0) {
                random = Math.floor(mathRandomInt(1, times))
            }
            data.singrat.contrast = contrasts[(random - 1)];
            data.singrat.SF = exam_param[(random - 1)];
        }

        switch(Math.floor(Math.random() * 2)) {
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
        await  ezpsy.delay_frame(30)
        // removeSingrat(singrat)
        await ezpsy.delay_frame(60)
        // if(data.canClick) {

        // }
    // }

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