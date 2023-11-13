<script setup lang="ts">
    import log from '@/assets/utils/log'
    import { Ref, nextTick, onUpdated, reactive, ref } from 'vue';
    import { addMosaic } from "@/assets/utils/utils"
    import { getVerifyCode, resetPassword } from '@/assets/index/auth';
    import { tipPopup } from '@/assets/utils/popup';

    const phone = ref(null) as Ref<HTMLInputElement | null>
    const verify = ref(null) as Ref<HTMLInputElement | null>
    const new_password0 = ref(null) as Ref<HTMLInputElement | null>
    const new_password1 = ref(null) as Ref<HTMLInputElement | null>

    const msg = reactive({
        phone: "",
        verify: "",
        newPassword: "",
        newPassword1: "",
        verify_tips: "获取验证码",
        password0IsShow: false,
        password1IsShow: false
    })

    const steps = [
        {
            title: "输入Ezpsy账号",
            tips: "请输入注册账号的手机号",
            validate: (): boolean => {
                const phoneDom = phone.value
                if(phoneDom) {
                    const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
                    if(reg.test(phoneDom.value)) {
                        return true
                    } else {
                        return false
                    }
                } else {    
                    return false
                }
            }
        },
        {
            title: "手机号找回密码",
            tips: `若您的手机号 ${addMosaic(msg.phone)} 现在可以收到短信, 请点击获取验证码。`,
            validate: (): boolean => {
                const verifyDom = verify.value
                if(verifyDom) {
                    if(verifyDom.value.length === 6) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            }
        },
        {
            title: "设置新密码",
            tips: "如果您有其他设备使用此账号, 设置新密码后需要重新登录, 以保证正常使用Ezpsy服务。",
            validate: (): boolean => {
                return true
            }
        }
    ]

    const data = reactive({
        hasPrevious: false,
        steps: steps,
        step: 2,
        max: steps.length - 1,
        min: 0
    })

    const getVCode = async () => {
        const res = await getVerifyCode({
            countryCode: "86",
            phone: msg.phone,
            model: 1,
            sendInterval: 60
        })
        if(res.isSuccess) {
            let i = 60
            msg.verify_tips = `${i}s 后重新获取`
            const timer = setInterval(() => {
                if(i === 0) {
                    msg.verify_tips = '获取验证码'
                    clearInterval(timer)
                }
                i--
                msg.verify_tips = `${i}s 后重新获取`
            }, 1000)
        } else {
            tipPopup("error", {
                title: "获取失败",
                tips: "请一分钟后尝试",
                isUseConfirm: true
            })
        }
    }

    const reload = () => {
        if(msg.phone && data.step === 1) {
            steps[1].tips = `若您的手机号 ${addMosaic(msg.phone, 6, 3)} 现在可以收到短信, 请点击获取验证码。`
        }
    }
    const previos = () => {
        data.step -= 1
        if(data.step == data.min) {
            data.hasPrevious = false
        }
    }
    const next = () => {
        data.step += 1
        if(data.step !== data.min) {
            data.hasPrevious = true
        }
    }
    const complete = async () => {
        resetPassword({
            countryCode: "86",
            phoneNumber: msg.phone,
            verifyCode: msg.verify,
            newPassword: msg.newPassword
        })
    }

    onUpdated(() => {
        reload()
    })
    
</script>

<template>
    <div class="reset">
        <div class="resetBox">
            <div class="Title"> 找回密码 </div>
            <div class="box">
                <div class="title">{{ data.steps[data.step].title }}</div>
                <div class="tips">{{ data.steps[data.step].tips }}</div>
                <div v-if="data.step === 0" class="input">
                    <input 
                        class="phoneContent" 
                        placeholder="请输入手机号" 
                        v-model="msg.phone"
                        ref="phone"
                    />
                </div>
                <div v-if="data.step === 1" class="input">
                    <div class="verifyContent">
                        <input 
                            type="text"
                            class="verify"
                            placeholder="请输入验证码"
                            v-model="msg.verify"
                            ref="verify"
                        />
                        <span class="verifyTips" @click="getVCode">
                            {{ msg.verify_tips }}
                        </span>
                    </div>
                </div>
                <div v-if="data.step === 2" class="input">
                    <div class="newPassword">
                        <input
                            :type="msg.password0IsShow ? 'text' : 'password'"
                            class="password"
                            placeholder="密码"
                            v-model="msg.newPassword"
                        >
                        <div 
                            class="showPassword"
                            :style="
                                msg.password0IsShow ? 
                                'background-image: url(./src/assets/image/index/auth/eye.svg)' : 
                                'background-image: url(./src/assets/image/index/auth/eye-slash.svg)'
                            "
                            @click="msg.password0IsShow = !msg.password0IsShow"
                        ></div>
                    </div>
                    <div class="newPassword">
                        <input
                            :type="msg.password1IsShow ? 'text' : 'password'"
                            class="password"
                            placeholder="确认密码"
                            v-model="msg.newPassword1"
                        >
                        <div 
                            class="showPassword"
                            :style="
                                msg.password1IsShow ? 
                                'background-image: url(./src/assets/image/index/auth/eye.svg)' : 
                                'background-image: url(./src/assets/image/index/auth/eye-slash.svg)'
                            "
                            @click="msg.password1IsShow = !msg.password1IsShow"
                        ></div>
                    </div>
                </div>
            </div>
            <div class="operate">
                <button 
                    class="step_button previous" 
                    v-if="data.hasPrevious"
                    @click="previos"
                >上一步</button>
                <button 
                    class="step_button next" 
                    :class="!data.steps[data.step].validate() ? 'denyClick' : ''"
                    :disabled="!data.steps[data.step].validate()"
                    @click="data.step === data.max ? complete() : next()"
                >
                    {{ data.step === data.max ? "完成" : "下一步" }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .reset {
        width: 100%;
        height: 100%;
        .resetBox {
            width: 50%;
            height: 50%;
            background: #ffffff;
            .Title {
                width: 100%;
                height: 50px;
                font-size: 24px;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #ededed;
                box-sizing: border-box;
            }
            .box {
                width: 80%;
                height: calc(100% - 50px - 50px);
                margin: auto;
                padding: 20px;
                box-sizing: border-box;
                .title {
                    font-size: 16px;
                    color: #333333;
                }
                .tips {
                    margin-top: 5px;
                    font-size: 14px;
                    color: #999999;
                }
                .input {
                    width: 100%;
                    .phoneContent {
                        width: 100%;
                        height: 42px;
                        line-height: 42px;
                        outline: none;
                        padding: 0;
                        margin: 20px 0;
                        box-sizing: border-box;
                        border: none;
                        background: #f7f7f7;
                        border-radius: 8px;
                        text-indent: 1.2em;
                    }
                    .verifyContent {
                        width: 100%;
                        height: 42px;
                        line-height: 42px;
                        margin: 20px 0;
                        box-sizing: border-box;
                        border: none;
                        background: #f7f7f7;
                        border-radius: 8px;
                        display: flex;
                        .verify {
                            width: calc(100% - 90px);
                            height: 100%;
                            text-indent: 1.2em;
                            border: none;
                            outline: none;
                            padding: 0;
                            margin: 0;
                            background: #f7f7f7;
                            border-radius: 8px;
                        }
                        .verifyTips {
                            width: 90px;
                            height: 100%;
                            line-height: 42px;
                            text-align: center;
                            font-size: 12px;
                            color: #007dff;
                            cursor: pointer;
                        }
                    }
                    .newPassword {
                        width: 100%;
                        height: 42px;
                        line-height: 42px;
                        padding: 0;
                        margin: 20px 0;
                        box-sizing: border-box;
                        border: none;
                        background: #f7f7f7;
                        border-radius: 8px;
                        text-indent: 20px;
                        display: flex;
                        .password {
                            width: calc(100% - 42px);
                            height: 42px;
                            padding: 0;
                            border: 0;
                            background: #f7f7f7;
                            outline: none;
                            text-indent: 1.2em;
                            border-radius: 8px;
                        }
                        .showPassword {
                            width: 42px;
                            height: 42px;
                            background-size: 50% 50%;
                            background-position: center center;
                            background-repeat: no-repeat;
                            flex-shrink: 0;
                            cursor: pointer;
                            transition: background-image .4s;
                        }
                    }
                }
            }
            .operate {
                width: 100%;
                display: flex;
                justify-content: center;
                column-gap: 10px;
                .step_button {
                    width: 200px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                    border-radius: 8px;
                    border: none;
                }
                .denyClick {
                    cursor: not-allowed;
                    opacity: .5;
                }
                .previous {
                    background: #c1c1c1;
                    color: #FFFFFF;
                }
                .next {
                    background: #005795;
                    color: #FFFFFF;
                }
            }
        }
    }
    
</style>