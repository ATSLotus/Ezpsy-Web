<script setup lang="ts">
    import log from '@/assets/utils/log'
    import router from '@/router/router';
    import { reactive } from 'vue';
    import { tipPopup } from '@/assets/utils/popup';
    import { getVerifyCode, registerAuth } from '@/assets/index/auth'

    const data = reactive({
        phone: "",
        code: "",
        password: "",
        passwordConfirm: "",
        validateText: "",
        codetips: "",
        passwordtips: "",
        allowSubmit: false,
        allowGetCode: true,
        validateIsTrue: true,
        phoneIsTrue: true,
        passwordIsTrue: true,
        confirmIsTrue: true,
        passwordIsShow0: false,
        passwordIsShow1: false
    })

    const validateP = () => {
        const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        return reg.test(data.phone)
    }

    const validatePhoneValue = (event: Event) => {
        const char = (event as InputEvent).data
        if(char && !/[0-9]/.test(char)) {
            event.preventDefault()
        }
    }

    const validatePhone = () => {
        data.phoneIsTrue = validateP()
        if(data.phoneIsTrue) {
            data.allowGetCode = true
        }
    }

    const validateC = () => {
        data.codetips = "" 
        if(data.code.length === 0)
            data.codetips = "验证码不能为空"
        else if(data.code.length !== 6) 
            data.codetips = "验证码应为6位"
        return data.code.length === 6
    }

    const validateCodeValue = (event: Event) => {
        const char = (event as InputEvent).data
        if(char && !/[0-9]/.test(char)) {
            event.preventDefault()
        }
    }

    const validateCode = () => {
        data.validateIsTrue = validateC()
    }

    const validatePsd = () => {
        data.passwordtips = ""
        if(data.password.length < 8) 
            data.passwordtips += "密码必须至少八个字符 "
        else if(data.password.length > 16) 
            data.passwordtips += "密码不得超过十六个字符 "
        let no_char = false
        if(!data.password.match(/[a-zA-Z]/)) {
            no_char = true
            if(data.passwordtips === "")
                data.passwordtips += "密码必须包含字母 "
            else
                data.passwordtips += "且必须包含字母 "
        }
        if(!data.password.match(/[0-9]/)) {
            if(data.passwordtips === "")
                data.passwordtips += "密码必须包含数字"
            else if(no_char) 
                data.passwordtips += "数字"
            else
                data.passwordtips += "且必须包含数字"
        }
        return data.passwordtips === ""
    }

    const validatePassword = () => {
        data.passwordIsTrue = validatePsd()
    }

    const validateConfirmPsd = () => {
        return data.password === data.passwordConfirm
    }

    const validateConfirmPassword = () => {
        data.confirmIsTrue = validateConfirmPsd()
    }

    const jugeCanSubmit = () => {
        data.allowSubmit = validateP() && validateC() && validatePsd() && validateConfirmPsd()
    }

    const getValidateCode = async () => {
        const res = await getVerifyCode({
            countryCode: "86",
            phone: data.phone,
            model: 0,
            sendInterval: 60
        })
        if(res.isSuccess) {
            let i = 60
            data.validateText = `${i}s 后重新获取`
            const timer = setInterval(() => {
                if(i === 0) {
                    data.validateText = '获取验证码'
                    clearInterval(timer)
                }
                i--
                data.validateText = `${i}s 后重新获取`
            }, 1000)
        } else {
            tipPopup("error", {
                title: "获取失败",
                tips: "请一分钟后尝试",
                isUseConfirm: true
            })
        }
    }

    const register = async (event: Event) => {
        event.preventDefault()
        const res = await registerAuth({
            countryCode: "86",
            phoneNumber: data.phone,
            password: data.password,
            verifyCode: data.code
        })
        if(res.isSuccess) {
            tipPopup("success", {
                title: "登录成功",
                timer: 1000
            }).then(() => {
                router.push("/index/login")
            })
        } else {
            tipPopup("error", {
                title: "登录失败",
                tips: `${res.data}`
            })
        }
    }

    const login = () => {
        router.push("/index/login")
    }
    
</script>

<template>
    <div>
        <div class="register">
            <div class="registerHeader">
                <div style="font-size: 24px;">Ezpsy 账号注册</div>
                <div style="font-size: 14px;margin-top: 10px;white-space: pre-wrap">
                    已有账号, 
                    <span 
                        style="color: #007dff;cursor: pointer;"
                        @click="login"
                    > 去登录></span>
                </div>
            </div>
            <form class="form" @submit="register">
                <div v-if="!data.phoneIsTrue" class="Error">
                    <img src="./image/index/auth/warn.svg" width="12" height="12" >
                    <span style="margin-left: 5px;">手机号码格式不正确</span>
                </div>
                <div 
                    class="phone"
                    :style="
                        !data.phoneIsTrue ? '' : 'margin-top: 20px'
                    "
                >
                    <input
                        id="test"
                        type="text"
                        class="input"
                        placeholder="手机号"
                        v-model="data.phone"
                        @beforeinput="validatePhoneValue"
                        @input="jugeCanSubmit"
                        @change="validatePhone" 
                    />
                </div>
                <div v-if="!data.validateIsTrue" class="Error">
                    <img src="./image/index/auth/warn.svg" width="12" height="12" >
                    <span style="margin-left: 5px;">{{ data.codetips }}</span>
                </div>
                <div 
                    class="code"
                    :style="
                        !data.validateIsTrue ? '' : 'margin-top: 20px'
                    "
                >
                    <div class="codeInput">
                        <input 
                            type="text"
                            class="input inputCode"
                            placeholder="验证码" 
                            v-model="data.code"
                            @beforeinput="validateCodeValue"
                            @input="jugeCanSubmit"
                            @change="validateCode"
                        />
                        <span
                            class="validate"
                            :style="
                                data.allowGetCode ? 
                                'cursor: pointer' : 
                                'color: #007dff88;cursor: not-allowed'
                            "
                            @click="getValidateCode"
                        >{{ data.validateText }}</span>
                    </div>
                </div>
                <div v-if="!data.passwordIsTrue" class="Error">
                    <img src="./image/index/auth/warn.svg" width="12" height="12" >
                    <span style="margin-left: 5px;">
                        密码必须至少八个字符且包含字母和数字
                    </span>
                </div>
                <div 
                    class="code"
                    :style="
                        !data.passwordIsTrue ? '' : 'margin-top: 20px'
                    "
                >
                    <div class="codeInput">
                        <input 
                            :type="!data.passwordIsShow0 ? 'password' : 'text'"
                            class="input inputPassword"
                            placeholder="密码" 
                            v-model="data.password"
                            @input="jugeCanSubmit"
                            @change="validatePassword"
                        />
                        <div 
                            class="showPassword"
                            :style="
                                data.passwordIsShow0 ? 
                                'background-image: url(image/index/auth/eye.svg)' : 
                                'background-image: url(image/index/auth/eye-slash.svg)'
                            "
                            @click="data.passwordIsShow0 = !data.passwordIsShow0"
                        ></div>
                    </div>
                </div>
                <div v-if="!data.confirmIsTrue" class="Error">
                    <img src="./image/index/auth/warn.svg" width="12" height="12" >
                    <span style="margin-left: 5px;">
                        前后密码不一致
                    </span>
                </div>
                <div 
                    class="code"
                    :style="
                        !data.confirmIsTrue ? '' : 'margin-top: 20px'
                    "
                >
                    <div class="codeInput">
                        <input 
                            :type="!data.passwordIsShow1 ? 'password' : 'text'"
                            class="input inputPassword"
                            placeholder="确认密码" 
                            v-model="data.passwordConfirm"
                            @input="jugeCanSubmit"
                            @change="validateConfirmPassword"
                        />
                        <div 
                            class="showPassword"
                            :style="
                                data.passwordIsShow1 ? 
                                'background-image: url(./image/index/auth/eye.svg)' : 
                                'background-image: url(./image/index/auth/eye-slash.svg)'
                            "
                            @click="data.passwordIsShow1 = !data.passwordIsShow1"
                        ></div>
                    </div>
                </div>
                <input
                    type="submit"
                    :style="
                        data.allowSubmit ? 
                        'cursor: pointer' : 
                        'opacity: 0.5;cursor: not-allowed'
                    "
                    class="submit" 
                    value="注册"
                    :disabled="!data.allowSubmit"
                />
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $InputWidth: 300px; $InputHeight: 48px;
    $CodeHeight: 48px;
    .register{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .registerHeader {
            width: $InputWidth;
            text-align: center;
        }
        .form {
            // width: 360px;
            // height: 400px;
            display: flex;
            flex-direction: column;
            // justify-content: space-around;
            align-items: center;
            .Error {
                width: $InputWidth;
                line-height: 16px;
                color: #d81e06;
                font-size: 12px;
                display: flex;
                align-items: center;
                margin-top: 2px;
                margin-bottom: 2px;
            }
            .input {
                outline: none;
                background: #f2f2f2;
                border: none;
                font-size: 14px;
                text-indent: .8em;
                width: $InputWidth;
                height: $InputHeight;
                border-radius: 8px;
                padding: 0;
            }
            .code {
                width: $InputWidth;
                // height: $CodeHeight;
                // margin-top: 20px;
                .codeInput {
                    width: 100%;
                    height: $InputHeight;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .inputCode {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                    .inputPassword {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                    .showPassword {
                        width: $InputHeight;
                        height: $InputHeight;
                        // display: flex;
                        // justify-content: center;
                        // align-items: center;
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                        background-color: #f2f2f2;
                        background-size: 50% 50%;
                        background-position: center center;
                        background-repeat: no-repeat;
                        flex-shrink: 0;
                        cursor: pointer;
                        transition: background-image .4s;
                    }
                    .validate {
                        width: 90px;
                        height: 100%;
                        border: none;
                        border-top-right-radius: 8px;
                        border-bottom-right-radius: 8px;
                        padding: 0;
                        background: #f2f2f2;
                        flex-shrink: 0;
                        font-size: 12px;
                        color: #007dff;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
            .submit {
                width: $InputWidth;
                height: $InputHeight;
                border-radius: 8px;
                padding: 0;
                color: #ffffff;
                outline: none;
                border: none;
                background: #ca141d;
                margin-top: 20px;
            }
            .question {
                width: $InputWidth;
                font-size: 14px;
                display: flex;
                justify-content: space-between;
                color: #007dff;
                margin-top: 10px;
                div {
                    cursor: pointer;
                }
            }
        }
    }
</style>