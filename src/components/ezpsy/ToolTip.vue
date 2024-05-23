<script setup lang="ts">
    import log from '@/assets/utils/log'
    import { Ref, nextTick, onMounted, onUpdated, reactive, ref } from 'vue';

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
        width: "0px",
        type: "",
        props: {
            width: "100%",
            lines: 1
        } as PROP,
        tipStyle: "toolbox_text",
        tooltipStyle: ""
    })

    const tool_box = ref(null) as Ref<HTMLElement | null>
    const content = ref(null) as Ref<HTMLElement | null>

    const isLongTextTruncated = (element: HTMLElement | null): boolean => {
        if (element) {
            return element.scrollHeight > element.clientHeight;
        }
        return false;
    };

    const isTextTruncated = (element: HTMLElement | null): boolean => {
        if (element) {
            return element.scrollWidth > element.clientWidth;
        }
        return false;
    };

    onMounted(async () => {
        data.type = props.type
        switch(props.type) {
            case "json":
                data.tooltip = JSON.stringify(JSON.parse(props.content), null, 4)
                data.props.width = "80%"
                data.tooltipStyle = "json"
                break
            case "long-text":
                data.tooltip = props.content
                data.props.width = "80%"
                data.props.lines = 2
                data.tipStyle = "toolbox_text_multi"
                data.tooltipStyle = "long-text"
                break
            case "text":
                data.tooltip = props.content
                data.props.width = "80%"
                data.tooltipStyle = "text"
            default:
                break
        }
        
        nextTick(() => {
            if(tool_box.value) {
                data.top = tool_box.value.clientHeight + "px"
                data.width = tool_box.value.clientWidth + "px" 
            }
            nextTick(() => {
                if(data.type === "long-text") {
                    if(isLongTextTruncated(content.value)) {
                        data.canShow = true
                    } else {
                        data.canShow = false
                    }
                } else if(data.type === "text") {
                    if(isTextTruncated(content.value)) {
                        data.canShow = true
                    } else {
                        data.canShow = false
                    }
                } else {
                    data.canShow = true
                }
            })
        })

        log.info(data.canShow, data.isShow)
    })

    
</script>

<template>
    <div 
        class="toolbox_box" 
        @mouseover="data.isShow = true"
        @mouseleave="data.isShow = false"
        ref="tool_box"
    >
        <div :class="data.tipStyle" ref="content">{{ props.content }}</div>
        <div class="tooltip" v-if="data.canShow && data.isShow">
            <div class="tooltip_content no_scroll_bar" :class="data.tooltipStyle">{{ data.tooltip }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @import "../../scss/app.scss";
    $trangleWidth: 20px; $trangleHeight: 10px; $color: #FFFFFF; $color-shadow: #0000001f;
    .toolbox_box {
        position: relative;
        cursor: pointer;
        .toolbox_text  {
            max-width: v-bind("data.width");
            overflow: hidden; 
            white-space: nowrap; 
            text-overflow: ellipsis;
            z-index: $ZIndex1;
        }
        .toolbox_text_multi {
            max-width: v-bind("data.width");
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
            height: auto;
            left: calc(0.5 * (100% - v-bind("data.props.width")));
            position: absolute;
            top: calc($trangleHeight + v-bind("data.top"));
            // top: v-bind("data.top");
            white-space: pre-wrap;
            text-align: start;
            display: flex;
            justify-content: center;
            border-radius: 8px;
            background: $color;
            padding: 5% 5%;
            z-index: $ZIndex2;
            filter: drop-shadow(0 2px 10px $color-shadow);
            box-sizing: border-box;
            .tooltip_content {
                // color: #000000;
                // opacity: 1;
                width: 100%;
                max-height: 120px;
                overflow: scroll;
                white-space: pre-wrap;
                filter: drop-shadow(0px 0px 0px #1d1d1d33);
                z-index: $ZIndex2;
            }
            .json {
                display: flex;
                justify-content: center;
            }
            .text {
                text-align: justify;
                white-space: pre-wrap;
                word-break: break-all;
                text-indent: 0;
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
            z-index: $ZIndex1;
        }
        .tooltip::after {
            content: "";
            position: absolute;
            width: 100%;
            height: calc(100% + $trangleHeight);
            top: -$trangleHeight;
            z-index: $ZIndex1;
        }
    }
</style>