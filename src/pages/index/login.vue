<script setup lang="ts">
    import log from '@/assets/utils/log'
    import agc from '@/assets/agc/agc'
    import { PhoneAuth } from "ezpsy-server"
    import { reactive } from 'vue';
 
    const auth = agc.getAuth("Ezpsy_Auth") as PhoneAuth

    const data = reactive({
        isUsePassWord: true,
        phone: "",
        code: "",
        validateText: "获取验证码",
        allowSubmit: false,
        allowGetCode: false,
        phoneIsTrue: true,
        codeIsTrue: true
    })

    const limitPhone = (event: Event) => {
        const char = (<InputEvent>event).data as string
        if(!(/[0-9]/.test(char))) {
            data.phone = data.phone.replace(new RegExp(char, "g"), "")
        }
        validatePhone()
        if(data.phoneIsTrue) {
            data.allowGetCode = true
            if(data.code !== "") {
                data.allowSubmit = true
            } else {
                data.allowSubmit = false
            }
        } else {
            data.allowGetCode = false
        }
    }

    const validatePhone = () => {
        const reg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
        data.phoneIsTrue = reg.test(data.phone)
    }

    const validateCode = () => {
        if(data.isUsePassWord) {

        } else {

        }
    }

    const changeMethod = () => {
        data.isUsePassWord = !data.isUsePassWord
    }
    
    const login = () => {
        console.log("TEST")
    }

    const register = () => {

    }

    const forget = () => {

    }
    
</script>

<template>
    <div>
        <div class="login">
            <form class="form" @submit="login">
                <div class="phone">
                    <div v-if="!data.phoneIsTrue" class="Error">
                        <img src="image/index/auth/warn.svg" width="12" height="12" >
                        <span style="margin-left: 5px;">手机号码格式不正确</span>
                    </div>
                    <input
                        id="test"
                        type="text"
                        class="input "
                        placeholder="手机号"
                        v-model="data.phone"
                        @input="limitPhone"
                        @change="validatePhone" 
                    />
                </div>
                <div class="code">
                    <div v-if="data.isUsePassWord && !data.codeIsTrue" class="Error">
                        <img src="image/index/auth/warn.svg" width="12" height="12" >
                        <span style="margin-left: 5px;">
                            密码必须包含a-z A-Z 0-9 特殊字符(@-_)其中三种
                        </span>
                    </div>
                    <div class="codeInput">
                        <input 
                            :type="data.isUsePassWord ? 'password' : 'text'"
                            class="input"
                            :placeholder="data.isUsePassWord ? '密码' : '验证码'" 
                            v-model="data.code"
                        />
                        <button
                            class="validate"
                            v-if="!data.isUsePassWord" 
                            :style="
                                data.allowGetCode ? 
                                'cursor: pointer' : 
                                'color: #007dff88;cursor: not-allowed'
                            "
                        >{{ data.validateText }}</button>
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
                />
                <div v-if="data.isUsePassWord" class="question">
                    <div @click="register">注册</div>
                    |
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
        justify-content: center;
        align-items: center;
        .form {
            width: 360px;
            height: 400px;
            display: flex;
            flex-direction: column;
            // justify-content: space-around;
            align-items: center;
            .phone {
                .Error {
                    line-height: 16px;
                    color: #d81e06;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    margin-bottom: 5px;
                }
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
                    .input {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
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
                    }
                }
                .changeMethod {
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
                background: #ca141d;
            }
        }
    }
</style>