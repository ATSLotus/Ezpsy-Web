<script setup lang="ts">
    import log from '@/assets/utils/log'

    const props = defineProps({
        title: {
            type: String,
            default: "",
            require: true
        },
        tips: {
            type: String,
            default: "",
            require: true
        },
        step: {
            type: Number,
            default: 0,
            require: true
        }
    })
    
</script>

<template>
    <div class="reset">
        <div class="resetBox">
            <div class="Title"> 找回密码 </div>
            <div class="box">
                <div class="title">{{ props.title }}</div>
                <div class="tips">{{ props.tips }}</div>
                <div v-if="props.step === 0" class="input">
                    
                </div>
                <div v-if="props.step === 1" class="input">
                    
                </div>
                <div v-if="props.step === 2" class="input">
                    
                </div>
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
                width: 100%;
                height: calc(100% - 50px);
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
            }
        }
    }
    
</style>