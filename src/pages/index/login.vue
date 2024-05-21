<script setup lang="ts">
    import log from '@/assets/utils/log'
    import { onBeforeMount, onBeforeUnmount, reactive } from 'vue';
    import { setContainer, tipPopup } from '@/assets/utils/popup';
    import router from '@/router/router';
    import { getCurrentUser, getVerifyCode, loginByCode, loginByPsd, updateProfile } from '@/assets/index/auth';
    import { useRoute } from 'vue-router';
    import { decrypt, encrypt } from '@/assets/utils/crypto';
    import { auth_default_logo, auth_default_mark } from '@/assets/utils/config';

    const route = useRoute() 

    const data = reactive({
        isUsePassWord: true,
        phone: "",
        code: "",
        validateText: "获取验证码",
        codetips: "",
        allowSubmit: false,
        allowGetCode: false,
        phoneIsTrue: true,
        codeIsTrue: true,
        passwordIsShow: false
    })

    const validateP = () => {
        const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        if(!data.isUsePassWord && reg.test(data.phone)) {
            data.allowGetCode = true
        }
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
    }

    const validateC = () => {
        data.codetips = "" 
        if(data.isUsePassWord) {
            if(data.code.length < 8) 
                data.codetips += "密码必须至少八个字符 "
            else if(data.code.length > 16) 
                data.codetips += "密码不得超过十六个字符 "
            let no_char = false
            if(!data.code.match(/[a-zA-Z]/)) {
                no_char = true
                if(data.codetips === "")
                    data.codetips += "密码必须包含字母 "
                else
                    data.codetips += "且必须包含字母 "
            }
            if(!data.code.match(/[0-9]/)) {
                if(data.codetips === "")
                    data.codetips += "密码必须包含数字"
                else if(no_char) 
                    data.codetips += "数字"
                else
                    data.codetips += "且必须包含数字"
            }
            return data.codetips === ""
        } else {
            if(data.code.length === 0)
                data.codetips = "验证码不能为空"
            else if(data.code.length !== 6) 
                data.codetips = "验证码应为6位"
            return data.code.length === 6
        }
    }

    const validateCodeValue = (event: Event) => {
        if(!data.isUsePassWord) {
            const char = (event as InputEvent).data
            if(char && !/[0-9]/.test(char)) {
                event.preventDefault()
            }
        }
    }

    const validateCode = () => {
        data.codeIsTrue = validateC()
    }

    const jugeCanSubmit = () => {
        data.allowSubmit = validateP() && validateC()
    }

    const changeMethod = () => {
        data.code = ""
        data.codeIsTrue = true
        data.isUsePassWord = !data.isUsePassWord
        jugeCanSubmit()
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
    
    const login = async (event: Event) => {
        event.preventDefault();
        let res = {} as Awaited<ReturnType<typeof loginByPsd>>
        if(data.isUsePassWord)
            res = await loginByPsd({
                countryCode: "86",
                phoneNumber: data.phone,
                password: data.code
            })
        else
            res = await loginByCode({
                countryCode: "86",
                phoneNumber: data.phone,
                verifyCode: data.code
            })
        if(res.isSuccess) {
            tipPopup("success", {
                title: "登录成功",
                timer: 1000
            }).then(() => {
                router.push("/ezpsy/console")
            })
        } else {
            tipPopup("error", {
                title: "登录失败",
                tips: `${data.isUsePassWord ? '账号密码错误' : '验证码错误'}`
            })
        }
    }

    const register = () => {
        router.push("/index/register")
    }

    const forget = () => {
        router.push("/index/reset")
    }

    const index = () => {
        router.push("/index")
    }

    onBeforeMount(async () => {
        setContainer("fullscreen")
        const user = await getCurrentUser()
        if(user.isSuccess && !user.isAnonymous) {
            router.push("/ezpsy/console")
        }
        if("msg" in route.query) {
            const msg = route.query.msg as string
            const { phone, password } = JSON.parse(decrypt(msg))
            data.isUsePassWord = true
            data.phone = phone
            data.code = password
        }
    })

    onBeforeUnmount(async () => {
        setContainer("normal")
    })
    
</script>

<template>
    <div>
        <div class="login">
            <div class="loginHeader">
                <div style="font-size: 24px;">Ezpsy 账号登录</div>
                <div style="font-size: 14px;margin-top: 10px;white-space: pre-wrap">
                    放弃登录,
                    <span 
                        style="color: #007dff;cursor: pointer;"
                        @click="index"
                    > 去首页></span>
                </div>
            </div>
            <form class="form" @submit="login">
                <div v-if="!data.phoneIsTrue" class="Error">
                    <img src="@/assets/image/index/auth/warn.svg" width="12" height="12" >
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
                        class="input "
                        placeholder="手机号"
                        v-model="data.phone"
                        @change="validatePhone" 
                        @beforeinput="validatePhoneValue"
                        @input="jugeCanSubmit"
                    />
                </div>
                <div v-if="!data.codeIsTrue" class="Error">
                    <img src="@/assets/image/index/auth/warn.svg" width="12" height="12" >
                    <span style="margin-left: 5px;">
                        {{ data.codetips }}
                    </span>
                </div>
                <div 
                    class="code" 
                    :style="
                        !data.codeIsTrue ? '' : 'margin-top: 20px'
                    "
                >
                    <div class="codeInput">
                        <input 
                            :type="
                                data.isUsePassWord ? 
                                !data.passwordIsShow ? 'password' : 'text' 
                                : 'text'"
                            class="input"
                            :class="data.isUsePassWord ? 'inputPassword' : 'inputCode'"
                            :placeholder="data.isUsePassWord ? '密码' : '验证码'" 
                            v-model="data.code"
                            @change="validateCode"
                            @beforeinput="validateCodeValue"
                            @input="jugeCanSubmit"
                        />
                        <div 
                            class="showPassword"
                            :style="
                                data.passwordIsShow ? 
                                'background-image: url(./src/assets/image/index/auth/eye.svg)' : 
                                'background-image: url(./src/assets/image/index/auth/eye-slash.svg)'
                            "
                            @click="data.passwordIsShow = !data.passwordIsShow"
                            v-if="data.isUsePassWord"
                        ></div>
                        <span
                            class="validate"
                            v-if="!data.isUsePassWord" 
                            :style="
                                data.allowGetCode ? 
                                'cursor: pointer' : 
                                'color: #007dff88;cursor: not-allowed'
                            "
                            :disabled="!data.allowGetCode"
                            @click="getValidateCode"
                        >{{ data.validateText }}</span>
                    </div>
                    <div class="changeMethod" @click="changeMethod">
                        {{ data.isUsePassWord ? "短信验证码登录" : "密码登录" }}
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
                    value="登录"
                    :disabled="!data.allowSubmit"
                />
                <div v-if="data.isUsePassWord" class="question">
                    <div @click="register">注册</div>
                    <div @click="forget">忘记密码</div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
    $InputWidth: 300px; $InputHeight: 48px;
    $CodeHeight: 80px;

    .login{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .loginHeader {
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
                height: $CodeHeight;
                .codeInput {
                    width: 100%;
                    height: $InputHeight;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .inputPassword {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }
                    .inputCode {
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
                .changeMethod {
                    width: fit-content;
                    color: #007dff;
                    font-size: 12px;
                    margin-top: 0.5 * ($CodeHeight - $InputHeight - 12px);
                    cursor: pointer;
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
                background: #005795;
                margin-top: 10px;
                text-align: center;
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