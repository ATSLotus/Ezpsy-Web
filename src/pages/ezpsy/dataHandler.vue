<script setup lang="ts">
import agc from '@/assets/agc/agc';
import { encrypt } from '@/assets/utils/crypto';

const storage = agc.storage

interface ORIGIN {
    name: string
    origin: string
    data: Record<string, any> | string
}

const ajax = (origin: ORIGIN) => {
    let data = origin.data as any
    if(typeof origin.data === "object") {
        data = JSON.stringify(origin.data)
    }
    const json = {
        data: encrypt(JSON.stringify({
            sourceCode: origin.origin,
            data: data
        }))
    }
    storage.uploadString({
        str: JSON.stringify(json),
        folder: `private/1294907698625655936/ezData`,
        name: origin.name,
        extension: "json"
    })
}

agc.storage.setUploadPercent({
    next: (snapshot) => { },
    error: (error) => { },
    complete: () => { }
})

const handler = async () => {
    const arr = [
    {
    "name": "G1i1s6sqe00",
    "origin": "Timing Stroop",
    "data": "{\"k\":\"28\",\"name2\":\"许晨晨\",\"types\":\"[true,false,true,false,false,false,true,true,false,true]\",\"intervalCalculate\":\"[559.8000000715256,518.10000002384186,533.2999999523163,487.10000002384186,553.1999999284744,459.10000002384186,429.2999999523163,552.1999999284744,598.2999999523163,456.8000000715256]\"}"
  },
  {
    "name": "I1i1s6tdc30",
    "origin": "Timing Stroop",
    "data": "{\"k\":\"0\",\"name2\":\"许晨晨\",\"types\":\"[null,false,true,true,false,false,true,true,true,false,null,null,false]\",\"intervalCalculate\":\"[505.2999999523163,582,530.0999999046326,506.4000000953674,598.2000000476837,478.39999997615814,596.6000000238419,532.6000000238419,512.7999999523163,594,504.5,538.8999999761581,583.2000000476837]\"}"
  },
  {
    "name": "I1i1s6s69u0",
    "origin": "Timing Stroop",
    "data": "{\"k\":\"56\",\"name2\":\"许晨晨\",\"types\":\"[false,true,false,true,false,false,false,true,true,true]\",\"intervalCalculate\":\"[571.89999997615814,484.39999997615814,533.8000000715256,520.5,591.2999999523163,571.3999999761581,457,455.39999997615814,425.09999990463257,530.7999999523163]\"}"
  },
  {
    "name": "R1i1s6ri0o0",
    "origin": "Timing Stroop",
    "data": "{\"k\":\"84\",\"name2\":\"许晨晨\",\"types\":\"[true,false,false,true,true,true,false,false,false,true]\",\"intervalCalculate\":\"[545.7999999523163,550.2000000476837,533.8999999761581,529.5,524.8999999761581,444.3000000715256,534.5,454.1999999284744,556.2000000476837,417.2999999523163]\"}"
  },
  {
    "name": "x1i1s6qr2n0",
    "origin": "Timing Stroop",
    "data": "{\"k\":\"112\",\"name2\":\"许晨晨\",\"types\":\"[true,true,true,true,false,false,false,false,false,null,true]\",\"intervalCalculate\":\"[402.2000000476837,525.2000000476837,531.6000000238419,512.1999999284744,457.40000009536743,493.2999999523163,458.10000002384186,591.7999999523163,580.7000000476837,402.39999997615814,520.8000000715256]\"}"
  }
    ]
    await Promise.all(arr.map(item => {
        ajax(item)
    }))
}
</script>

<template>
    <div>
        <button @click="handler">handler</button>
    </div>
</template>

<style scoped lang="scss"></style>