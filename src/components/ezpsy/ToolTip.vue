<script setup lang="ts">
    import log from '@/assets/utils/log'
    import { onMounted, reactive, ref } from 'vue';

    const props = defineProps({
        content: {
            type: String,
            require: true,
            default: ""
        },
        type: {
            type: String,
            require: true,
            default: "text"
        }
    })

    interface PROP {
        width: string
        lines: number
    }

    const data = reactive({
        canShow: true,
        isShow: false,
        tooltip: "",
        top: "0px",
        props: {
            width: "100%",
            lines: 1
        } as PROP,
        tipStyle: "toolbox_text",
        tooltipStyle: ""
    })

    onMounted(async () => {
        switch(props.type) {
            case "json":
                data.tooltip = JSON.stringify(JSON.parse(props.content), null, 4)
                data.props.width = "80%"
                break
            case "text":
            default:
                data.tooltip = props.content
                data.props.width = "80%"
                data.props.lines = 2
                data.tipStyle = "toolbox_text_multi"
                data.tooltipStyle = "long-text"
                break
        }
        const box = document.querySelector(".toolbox_box")
        
        if(box) {
            data.top = box.clientHeight + "px"
        }

        // if(props.content === "") {
        //     data.canShow = false
        // }
    })
    
</script>

<template>
    <div class="toolbox_box" @mousemove="data.isShow = true" @mouseout="data.isShow = false">
        <div :class="data.tipStyle">{{ props.content }}</div>
        <div class="tooltip" v-if="data.canShow && data.isShow">
            <div class="tooltip_content" :class="data.tooltipStyle">{{ data.tooltip }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "../../scss/app.scss";
    $trangleWidth: 10px; $trangleHeight: 10px; $color: #FFFFFF; $color-shadow: #0000001f;
    .toolbox_box {
        position: relative;
        cursor: pointer;
        .toolbox_text  {
            max-width: 100%;
            overflow: hidden; 
            white-space: nowrap; 
            text-overflow: ellipsis;
            z-index: $ZIndex1;
        }
        .toolbox_text_multi {
            max-width: 100%;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: v-bind("data.props.lines");
            overflow: hidden;
            -webkit-box-orient: vertical;
            text-indent: 2em;
            text-align: justify;
            white-space: pre-wrap;
            z-index: $ZIndex1;
        }
        .tooltip {
            width: v-bind("data.props.width");
            left: calc(0.5 * (100% - v-bind("data.props.width")));
            position: absolute;
            top: calc($trangleHeight + v-bind("data.top"));
            white-space: pre-wrap;
            text-align: start;
            display: flex;
            justify-content: center;
            border-radius: 8px;
            background: $color;
            padding: 10px 10px;
            z-index: $ZIndex2;
            filter: drop-shadow(0 2px 10px $color-shadow);
            .tooltip_content {
                // color: #000000;
                // opacity: 1;
                width: 100%;
                filter: drop-shadow(0px 0px 0px #1d1d1d33);
            }
            .long-text {
                text-align: justify;
                text-indent: 2em;
                white-space: pre-wrap;
            }
        }
        .tooltip::before {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            border-left: $trangleWidth solid transparent;
            border-right: $trangleWidth solid transparent;
            border-bottom: $trangleHeight solid $color;
            top: -$trangleHeight;
        }
    }
</style>