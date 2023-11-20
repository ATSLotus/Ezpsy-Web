<script setup lang="ts">
    import log from '@/assets/utils/log'
    import { Ref, nextTick, onUpdated, reactive, ref } from 'vue';
    import { addMosaic } from "@/assets/utils/utils"
    import { getVerifyCode, resetPassword, logout } from '@/assets/index/auth';
    import { tipPopup } from '@/assets/utils/popup';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
    import router from '@/router/router';
    import { encrypt } from '@/assets/utils/crypto';

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
            validate: (step: number = 0): boolean => {
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
            validate: (step: number = 1): boolean => {
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
            validate: (step: number = -1): boolean => {
                const validate0 = () => {
                    const psdDom = new_password0.value
                    if(psdDom) {
                        const psd = msg.newPassword
                        switch(true) {
                            case psd.length < 8:
                            case psd.length > 16:
                            case !(psd.match(/[0-9a-zA-Z]/)):
                                return false
                            default:
                                return true
                        }
                    } else {
                        return false
                    }
                }
                const validate1 = () => {
                    const psd = new_password1.value
                    if(psd) {
                        if(msg.newPassword !== msg.newPassword1) {
                            return false
                        } else {
                            return true
                        }
                    } else {
                        return false
                    }
                }
                if(step === 0) {
                    return validate0()
                } else if(step === 1) {
                    return validate1()
                } else {
                    return validate0() && validate1()
                }
            }
        }
    ]

    const data = reactive({
        hasPrevious: false,
        steps: steps,
        step: 0,
        max: steps.length - 1,
        min: 0,
        errorList: [ false, false, [ false, false ] ]
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
        }).then(res => {
            if(res.isSuccess) {
                tipPopup("success",{
                    title: "密码重置成功",
                    timer: 1000
                }).then(() => {
                    logout().then(res => {
                        if(res) {
                            router.push({
                                path: "/index/login",
                                query: {
                                    msg: encrypt(JSON.stringify({
                                        phone: msg.phone,
                                        password: msg.newPassword
                                    }))
                                }
                            })
                        }
                    })
                })
            } else {
                tipPopup("error", {
                    title: "密码重置失败",
                    tips: "请检查网络状态",
                    closeTip: "点击空白处关闭"
                }).then(() => {
                    data.step = 0
                    msg.phone = ""
                    msg.verify = ""
                    msg.newPassword = ""
                    msg.newPassword1 = ""
                })
            }
        })
    }

    const validate = (step: number, dynamic: boolean = false) => {
        if(dynamic) {
            if(data.steps[step].validate()) {
                data.errorList[step] = false
            }
        } else {
            if(data.steps[step].validate()) {
                data.errorList[step] = false
            } else {
                data.errorList[step] = true
            }
        }
    }

    const validate_password = (step: number, dynamic: boolean = false) => {
        if(step === 0 && dynamic && msg.newPassword1 !== '') {
            msg.newPassword1 = ''
        }
        if(dynamic) {
            if(data.steps[2].validate(step)) {
                data.errorList[2][step] = false
            }
        } else {
            if(data.steps[2].validate(step)) {
                data.errorList[2][step] = false
            } else {
                data.errorList[2][step] = true
            }
        }
    }

    const back = () => {
        router.back()
    }

    onUpdated(() => {
        reload()
    })
    
</script>

<template>
    <div class="reset">
        <div class="resetBox">
            <div class="Header">
                <div class="back" @click="back"> 
                    <font-awesome-icon icon="angles-left" /> 返回 
                </div>
                <div class="Title"> 找回密码 </div> 
            </div>
            <div class="box">
                <div class="title">{{ data.steps[data.step].title }}</div>
                <div class="tips">{{ data.steps[data.step].tips }}</div>
                <div 
                    v-if="data.step === 0" 
                    class="input"
                    :class="data.errorList[data.step] ? 'errorInputBox' : ''"
                >
                    <div v-if="data.errorList[data.step]" class="Error">
                        <font-awesome-icon class="item-icon" icon="circle-exclamation" />
                        <span style="margin-left: 5px;">手机号码格式不正确</span>
                    </div>
                    <input 
                        class="phoneContent" 
                        :class="data.errorList[data.step] ? 'errorInput' : ''"
                        placeholder="请输入手机号" 
                        v-model="msg.phone"
                        ref="phone"
                        @change="validate(data.step)"
                        @input="validate(data.step, true)"
                    />
                </div>
                <div 
                    v-if="data.step === 1" 
                    class="input"
                    :class="data.errorList[data.step] ? 'errorInputBox' : ''"
                >
                    <div v-if="data.errorList[data.step]" class="Error">
                        <font-awesome-icon class="item-icon" icon="circle-exclamation" />
                        <span style="margin-left: 5px;">请输入6位验证码</span>
                    </div>
                    <div class="verifyContent" :class="data.errorList[data.step] ? 'errorInput' : ''">
                        <input 
                            type="text"
                            class="verify"
                            placeholder="请输入验证码"
                            v-model="msg.verify"
                            ref="verify"
                            @change="validate(data.step)"
                            @input="validate(data.step, true)"
                        />
                        <span class="verifyTips" @click="getVCode">
                            {{ msg.verify_tips }}
                        </span>
                    </div>
                </div>
                <div 
                    v-if="data.step === 2" 
                    class="input"
                    :class="data.errorList[data.step][0] ? 'errorInputBox' : ''"
                >
                    <div v-if="data.errorList[data.step][0]" class="Error">
                        <font-awesome-icon class="item-icon" icon="circle-exclamation" />
                        <span style="margin-left: 5px;">密码格式错误</span>
                    </div>
                    <div 
                        class="newPassword newPassword0"
                        :class="(data.errorList[data.step][1] ? 'newPassword1_err' : '') + ' ' + (data.errorList[data.step][0] ? 'errorInput' : '')"
                    >
                        <input
                            :type="msg.password0IsShow ? 'text' : 'password'"
                            class="password"
                            placeholder="密码"
                            v-model="msg.newPassword"
                            ref="new_password0"
                            @change="validate_password(0)"
                            @input="validate_password(0, true)"
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
                    <div v-if="data.errorList[data.step][1]" class="Error">
                        <font-awesome-icon class="item-icon" icon="circle-exclamation" />
                        <span style="margin-left: 5px;">前后密码不一致密码</span>
                    </div>
                    <div 
                        class="newPassword"
                        :class="data.errorList[data.step][1] ? 'errorInput' : ''"
                    >
                        <input
                            :type="msg.password1IsShow ? 'text' : 'password'"
                            class="password"
                            placeholder="确认密码"
                            v-model="msg.newPassword1"
                            ref="new_password1"
                            @change="validate_password(1)"
                            @input="validate_password(1, true)"
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
                    <div class="passwordTips">
                        <div class="tipsTitle">密码要求:</div>
                        <div class="pTips passwordTips0">密码不得少于8个字符，不得超过16个字符</div>
                        <div class="pTips passwordTips1">密码必须包含字母和数字</div>
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
                    @keyup.enter="data.step === data.max && complete()"
                >
                    {{ data.step === data.max ? "完成" : "下一步" }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .item-icon {
        width: 12px;
        height: 12px;
    }
    .reset {
        width: 100%;
        height: 100%;
        .resetBox {
            width: 50%;
            height: 50%;
            background: #ffffff;
            
            .Header {
                width: 80%;
                margin: auto;
                display: flex;
                border-bottom: 1px solid #ededed;
                box-sizing: border-box;
                .back {
                    width: 10%;
                    height: 50px;
                    line-height: 50px;
                    text-align: center;
                    font-size: 16px;
                    cursor: pointer;
                }
                .back:hover {
                    color: #007dff;
                }
                .Title {
                    width: 80%;
                    height: 50px;
                    font-size: 24px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
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
                $errorTipHeight: 16px;
                $marginTop: 36px;
                .input {
                    width: 100%;
                    margin: $marginTop 0;
                    .phoneContent {
                        width: 100%;
                        height: 42px;
                        line-height: 42px;
                        outline: none;
                        padding: 0;
                        box-sizing: border-box;
                        border: 1px solid #FFFFFF;
                        background: #f7f7f7;
                        border-radius: 8px;
                        text-indent: 1.2em;
                    }
                    .verifyContent {
                        width: 100%;
                        height: 42px;
                        line-height: 42px;
                        box-sizing: border-box;
                        border: 1px solid #FFFFFF;
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
                    $newPSDGap: 30px;
                    .newPassword0 {
                        margin-bottom: $newPSDGap;
                    }
                    .newPassword1_err {
                        margin-bottom: calc($newPSDGap -  $errorTipHeight);
                    }
                    .newPassword {
                        width: 100%;
                        height: 42px;
                        line-height: 42px;
                        padding: 0;
                        box-sizing: border-box;
                        border: 1px solid #FFFFFF;
                        background: #f7f7f7;
                        border-radius: 8px;
                        text-indent: 20px;
                        display: flex;
                        .password {
                            width: calc(100% - 42px);
                            height: 100%;
                            padding: 0;
                            border: 0;
                            background: #f7f7f7;
                            outline: none;
                            text-indent: 1.2em;
                            border-radius: 8px;
                        }
                        .showPassword {
                            width: 42px;
                            height: 100%;
                            background-size: 50% 50%;
                            background-position: center center;
                            background-repeat: no-repeat;
                            flex-shrink: 0;
                            cursor: pointer;
                            transition: background-image .4s;
                        }
                    }
                    .Error{
                        width: 100%;
                        line-height: $errorTipHeight;
                        color: #d81e06;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        margin-top: 2px;
                        margin-bottom: 2px;
                    }
                    .errorInput {
                        border-color: #FF0000;
                    }
                    .passwordTips {
                        margin-top: $marginTop;
                        .tipsTitle {
                            font-size: 16px;
                            font-weight: 800;
                        }
                        .pTips {
                            font-size: 14px;
                            margin: 10px 0;
                            text-indent: 1.2em;
                            color: #d81e06;
                        }
                    }
                }
                .errorInputBox {
                    margin: calc($marginTop -  $errorTipHeight) 0;
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