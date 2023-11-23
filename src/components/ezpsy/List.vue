<script setup lang="ts">
    import { DIRECTION } from '@/assets/utils/config';
    import { getBlob } from '@/assets/utils/image';
    import log from '@/assets/utils/log'
    import { showImg } from '@/assets/utils/popup';
    import { deepClone } from '@/assets/utils/utils';
    import { Ref, nextTick, onMounted, reactive, ref, watch } from 'vue';
    import { ObjectListSort } from "@/assets/utils/sort"    
    import ToolTip from './ToolTip.vue';

    const props = defineProps({
        searchOpts: {
            type: Object,
            require: true
        },
        headers: {
            type: Object,
            require: true
        },
        lists: {
            type: Array<{[key: string]: any}>,
            require: true,
            default: []
        }
    })

    const list_body = ref(null) as Ref<HTMLDivElement | null>
    const goto = ref(null) as Ref<HTMLDivElement | null>

    const screenMsg = reactive({
        item_height: 60,
        list_body_height: 0
    })

    const data = reactive({
        searchValue: "",
        header: new Array<HEADER>(),
        origin: props.lists,
        cache: deepClone(props.lists),
        lists: deepClone(props.lists),
        numPerPage: 9,
        index: 1,
        pages: 0,
        checkedList: new Set<any>(),
        // normalLists: deepClone(props.lists),
        defaultSort: -1,
        grid: {
            max: 4,
            align: "center"
        },
        goto_index: 1,
    })

    const getStyle = (obj: Record<string, string>) => {
        return JSON.stringify(obj).replace(/[{}"]/g, '').replace(/,/g, ';')
    }

    const sliceLists = (origin: Array<any>) => {
        return origin.slice(data.numPerPage*(data.index-1), data.numPerPage*data.index)
    }

    const calculateNumPerPage= (value: HTMLDivElement) => {
        screenMsg.list_body_height = value.clientHeight
        data.numPerPage = Math.floor(screenMsg.list_body_height/screenMsg.item_height)
        data.lists = sliceLists(data.cache)
    }

    onMounted(async () => {
        props.headers && Object.keys(props.headers).forEach((item, index) => {
            let sort: DIRECTION | undefined = undefined
            const origin_sort = props.headers?.[item]["sort"]
            if(origin_sort !== undefined) {
                if(typeof origin_sort === "boolean")
                    if(origin_sort)
                        sort = DIRECTION.NORMAL
                    else 
                        sort = undefined
                else{
                    sort = origin_sort
                    data.defaultSort = index
                }
            }
            data.header.push({
                value: item,
                type: props.headers?.[item]["type"],
                text: props.headers?.[item]["text"],
                style: getStyle(props.headers?.[item]["style"]),
                align: props.headers?.[item]["align"],
                grid: props.headers?.[item]["grid"],
                sort: sort,
                action: props.headers?.[item]["action"]
            })
            if(item === "operations" && !!(props.headers?.[item]["grid"])) {
                const grid = props.headers[item]["grid"]
                if(grid.max) {
                    data.grid.max = grid.max
                }
                if(grid.align) {
                    data.grid.align = grid.align
                }
            } 
        })
        const length = data.lists.length
        data.pages = Math.ceil(length/data.numPerPage)
        if(data.defaultSort !== -1) {
            const head = data.header[data.defaultSort]
            if(head.sort === DIRECTION.NORMAL) {
                data.lists = deepClone(data.cache)
            } else {
                data.cache = ObjectListSort({
                    list: data.cache,
                    method: head.sort,
                    key: head.value
                }) 
            }
        }
        data.lists = sliceLists(data.cache)
        if(list_body.value) {
            const dom = list_body.value
            const resizeObserver = new ResizeObserver(entries => {
                calculateNumPerPage(dom)
            });
            resizeObserver.observe(dom)
        }
    })

    const checkAll = () => {
        if(data.checkedList.size === data.lists.length)  {
            data.checkedList.clear()
        } else {
            data.lists.forEach((list: any) => {
                data.checkedList.add(list)
            })
        }
    }

    const check = (payload: MouseEvent, list: any) => {
        const target = payload.target as HTMLInputElement
        log.info(target.checked)
        if(target.checked) {
            data.checkedList.add(list)
        } else {
            data.checkedList.delete(list)
        }
        log.info(data.checkedList)
    }

    const changeIndex = (method: boolean) => {
        if(method) {
            data.index < data.pages && data.index++
        } else {
            data.index > 1 && data.index--
        }
        data.checkedList.clear()
        data.lists = sliceLists(data.cache)
    }

    const searchLists = () => {
        data.checkedList.clear()
        data.cache = props.searchOpts?.search.func(data.searchValue, data.origin)
        data.index = 1
        data.pages = Math.ceil(data.cache.length/data.numPerPage)
        data.lists = sliceLists(data.cache)
    }

    const openPreview = (str: string) => {
        showImg(str, {
            width: 98,
            height: 98
        })
    }

    const sort = (event: Event, head: HEADER) => {
        if(head.sort === DIRECTION.NORMAL) {
            data.cache = deepClone(data.cache)
            head.sort = DIRECTION.FORWARD
        } else if(head.sort === DIRECTION.FORWARD) {
            head.sort = DIRECTION.REVERSE
        } else {
            head.sort = DIRECTION.NORMAL
        }
        if(head.sort === DIRECTION.NORMAL) {
            data.lists = deepClone(data.cache)
        } else {
            data.cache = ObjectListSort({
                list: data.cache,
                method: head.sort,
                key: head.value
            }) 
        }
        data.lists = sliceLists(data.cache)
        data.header.forEach(H => {
            if(H.sort !== undefined) {
                if(head !== H)
                    H.sort = DIRECTION.NORMAL
            }
        })
    }

    const getBTNStyle = (str: string) => {
        if(str)
            return `btn-${str}`
        else
            return ""
    }

    const getGridMatrix = (list: Record<string, any>) => {
        const max = data.grid.max
        const operations = list?.operations as Array<OPERATE>
        let i = 0
        const matrix = new Array()
        Object.keys(operations)?.forEach((key, idx) => {
            if(i === 0) {
                const m = new Array()
                m.push(operations[key])
                matrix.push(m)
            } else {    
                matrix[Math.floor(idx/max)].push(operations[key])
            }
            i++
            if(i >= max) {
                i = 0
            }
        })
        return matrix
    } 

    const validateGoto = () => {
        const gotoDom = goto.value
        if(gotoDom) {
            let value = gotoDom.innerHTML
            if(/[0-9]+/.test(value)) {
                const num = parseInt(value)
                if(num > data.pages) {
                    value = `${data.pages}`
                }
            } else {
                value = value.replace(/\D/g, "")
            }
            data.goto_index = value == "" ? data.index : parseInt(value)
            gotoDom.innerHTML = `${data.goto_index}`
        }
    }

    const Go = () => {
        data.index = data.goto_index
        data.checkedList.clear()
        data.lists = sliceLists(data.cache)
    }

    watch(list_body, (value) => {
        if(value) {
            calculateNumPerPage(value)
        }
    })
    
</script>

<template>
    <div class="listbox">
        <div class="searchBox">
            <div class="left">
                <div>{{ props.searchOpts?.search.title }}</div>
                <input 
                    class="search" 
                    type="text" 
                    v-model="data.searchValue" 
                    :placeholder="props.searchOpts?.search.placeholder"
                    @input="searchLists"
                />
            </div>
            <div class="right">
                <div 
                    class="reload" 
                    v-if="props.searchOpts && 'reload' in props.searchOpts"
                    @click="props.searchOpts.reload.func()"
                >
                    <svg 
                        class="reloadIcon"
                        t="1699856267558" 
                        viewBox="0 0 1024 1024" 
                        version="1.1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        p-id="4830" 
                        width="128" 
                        height="128"
                    >
                            <path 
                                d="M257.6 462.4c28.8 1.6 43.2-11.2 43.2-36.8 0-25.6-17.6-43.2-43.2-43.2H150.4C201.6 208 358.4 84.8 542.4 84.8c187.2 0 348.8 128 395.2 310.4 4.8 20.8 30.4 38.4 51.2 30.4 20.8-4.8 38.4-30.4 30.4-51.2C958.4 153.6 763.2 0 537.6 0 337.6 0 163.2 123.2 80 305.6v-92.8c0-22.4-9.6-43.2-35.2-43.2S1.6 187.2 0 212.8v200c1.6 30.4 25.6 51.2 57.6 49.6h200zM966.4 590.4H779.2c-12.8 0-27.2 3.2-36.8 11.2-11.2 8-19.2 20.8-19.2 36.8 0 20.8 19.2 32 43.2 32h105.6c-59.2 163.2-208 265.6-374.4 265.6-174.4 0-326.4-110.4-382.4-280-8-20.8-30.4-33.6-56-25.6-20.8 8-33.6 30.4-25.6 56C104 888 286.4 1024 499.2 1024c187.2 0 352-105.6 444.8-272v97.6c1.6 24 9.6 43.2 35.2 43.2s43.2-17.6 44.8-43.2V649.6c-1.6-28.8-27.2-54.4-57.6-59.2z"
                                p-id="4831"
                            ></path>
                    </svg>
                    <!-- <img class="reloadIcon" src="@/assets/image/ezpsy/icons/reload.svg" /> -->
                </div>
                <div 
                    v-for="item in props.searchOpts?.operations"
                    class="btn"
                    :class="getBTNStyle(item?.style)"
                    @click="item.func([...data.checkedList])"
                >{{ item.title }}</div>
                <!-- <div v-if="props.searchOpts?.add" class="btn add">增加</div>
                <div class="btn delete" @click="deleteChecked">删除</div> -->
            </div>
        </div>
        <div class="list">
            <div class="header">
                <input type="checkbox" @click="checkAll()" />
                <div
                    class="header-li"
                    :style="head.style"
                    :class="head.sort !== undefined ? 'header-click': ''"
                    v-for="head in data.header"
                    @click="head.sort !== undefined && sort($event, head)"
                >
                    {{ head.text }} 
                    <div 
                        class="head-sort" 
                        :class="
                            head.sort === DIRECTION.FORWARD ?
                            'head-sort-up' : 
                                head.sort === DIRECTION.REVERSE ?
                                'head-sort-down' : ''
                        "
                        v-if="head.sort !== undefined"
                    >
                    </div>
                </div>
            </div>
            <div class="list-body" ref="list_body">
                <div 
                    class="list-li" 
                    v-for="list, index in data.lists"
                    :style="index%2===0 ? 'background: #f5f5f5' : 'background: #ffffff'"
                >
                    <input 
                        type="checkbox" 
                        :checked="data.checkedList.has(list)" 
                        @click="check($event, list)" 
                    />
                    <!--
                        对齐方式: center-居中 start-置前 end-置后
                        text: 默认center
                        long-text: 无对齐方式
                        operate： 默认center
                        image: 默认center
                        link: 默认center
                        code: 无对齐方式
                    -->
                    <div 
                        class="li-item" 
                        :style="item.style" 
                        v-for="item in data.header"
                    >
                        <ToolTip 
                            class="text align" 
                            :class="item?.align" 
                            v-if="item.type === 'text'"
                            :content="list[item.value]"
                            :type="'text'"
                        ></ToolTip>
                        <ToolTip 
                            class="long-text" 
                            v-if="item.type === 'long-text'"
                            :content="list[item.value]"
                            :type="'long-text'"
                        ></ToolTip>
                        <div 
                            class="operate align" 
                            :class="item?.align" 
                            v-if="item.type === 'operate' && !(item?.grid)"
                        >
                            <div 
                                class="btn" 
                                :class="getBTNStyle(bt?.style)" 
                                v-for="bt in list[item.value]" 
                                @click="bt.func(list)"
                            >{{ bt.text }}</div>
                        </div>
                        <div 
                            class="operate align-grid" 
                            v-if="item.type === 'operate' && !!(item?.grid)"
                        >
                            <div 
                                class="grid align"
                                :class="item?.align"
                                v-for="bts in getGridMatrix(list)"
                            >
                                <div 
                                    class="btn-box"
                                    :class="'grid-' + data.grid.align"
                                    v-for="bt in bts"
                                >
                                    <div 
                                        class="btn"
                                        :class="getBTNStyle(bt?.style)"
                                        @click="bt.func(list)"
                                    >
                                        {{ bt?.text }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="image align" :class="item?.align" v-if="item.type === 'image'">
                            <img :src="getBlob(list[item.value])" @click="openPreview(getBlob(list[item.value]))" />
                        </div>
                        <ToolTip 
                            class="link align" 
                            :class="item?.align" 
                            v-if="item.type === 'link'" 
                            @click="item.action && item.action(list)"
                            :content="list[item.value]"
                            :type="'text'"
                        ></ToolTip>
                        <ToolTip 
                            class="code" 
                            v-if="item.type === 'code'"
                            :content="list[item.value]"
                            :type="'json'"
                        ></ToolTip>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="index">
            <div class="index-info">
                当前页面: {{ data.index }} / {{ data.pages }}
            </div>
            <button 
                class="box left" 
                :class="data.index === 1 ? 'disable' : ''"
                :disabled="data.index === 1"
                @click="changeIndex(false)"
            ></button>
            <div class="box item">{{ data.index }}</div>
            <button 
                class="box right" 
                :class="data.index === data.pages ? 'disable' : ''"
                :disabled="data.index === data.pages"
                @click="changeIndex(true)"
            ></button>
            <div 
                class="box goto-input"
                contenteditable="true"
                @input="validateGoto"
                ref="goto"
            >{{ data.goto_index }}</div>
            <div 
                class="goto"
                @click="Go"
            >跳转</div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    $checkboxSize: 18px; $checkboxMargin: 5px;

    input[type="checkbox"] {
        outline: none;
        width: $checkboxSize;
        height: $checkboxSize;
        margin: $checkboxMargin;
        cursor: pointer;
    }
    .listbox {
        .btn {
            border-color: #999999;
            color: #999999;
        }
        .btn:hover {
            border-color: #b2b2b2;
            color: #b2b2b2;
        }
        .btn-red {
            color: #ff0436;
            border-color: #ff0436;
        }
        .btn-red:hover {
            color: #ff0400;
            border-color: #ff0400;
        }
        .btn-green {
            color: #8dc149;
            border-color: #8dc149;
        }
        .btn-green:hover {
            color: #45ba68;
            border-color: #45ba68;
        }
        .btn-blue {
            color: #54aeff;
            border-color: #54aeff;
        }
        .btn-blue:hover {
            color: #2395f8;
            border-color: #2395f8;
        }
        .btn-orange {
            color: #ff5722;
            border-color: #ff5722;
        }
        .btn-orange:hover {
            color: #ff833a;
            border-color: #ff833a;
        }
        .btn-yellow {
            color: #FFC107;
            border-color: #FFC107;
        }
        .btn-yellow:hover {
            color: #FFA000;
            border-color: #FFA000;
        }
        .btn-brown {
            color: #8B4513;
            border-color: #8B4513;
        }
        .btn-brown:hover {
            color: #9c7d61;
            border-color: #9c7d61;
        }
        .align {
            display: flex;
            justify-content: center;
        }
        .center {
            justify-content: center;
        }
        .start {
            text-indent: .8em;
            justify-content: start;
        }
        .end {
            justify-content: end;
        }
        .justify {
           justify-content: space-between; 
        }
        .align-grid {
            display: flex;
            flex-direction: column;
            gap: 2px;
            .grid {
                width: 100%;
                display: flex;
                .btn-box {
                    width: 25%;
                    display: flex;
                }
            }
            .align {
                flex-wrap: wrap;
            }
            .grid-start {
                justify-content: start;
            }
            .grid-center {
                justify-content: center;
            }
            .grid-end {
                justify-content: end;
            }
        }
    }

    $ITEMWIDTH: 95%;

    .listbox {
        width: 90%;
        height: 90%;
        position: relative;
        top: 5%;
        left: 5%;
        .searchBox {
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            .left {
                width: 50%;
                display: flex;
                align-items: center;
            }
            .search {
                width: 80%;
                height: 32px;
                outline: none;
                padding: 0;
                box-sizing: border-box;
                border-radius: 4px;
                border: 1px solid #cccccc;
                text-indent: .8em;
                margin-left: 10px;
            }
            .right {
                width: 50%;
                display: flex;
                align-items: center;
                justify-content: end;
                $RELOAD_SIZE: 32px; $RELOAD_RATIO: 60%;
                $RELOAD_COLOR: #007dff;
                .reload {
                    width: $RELOAD_SIZE;
                    height: $RELOAD_SIZE;
                    margin: 0 5px;
                    border: 1px solid $RELOAD_COLOR;
                    border-radius: 4px;
                    cursor: pointer;
                    box-sizing: border-box;
                    .reloadIcon {
                        width: $RELOAD_RATIO;
                        height: $RELOAD_RATIO;
                        margin: 0.5*(100% - $RELOAD_RATIO) 0.5*(100% - $RELOAD_RATIO);
                        path {
                            fill: $RELOAD_COLOR;
                        }
                    }
                }
                .reload:hover {
                    border-width: 2px;
                }
                .btn {
                    width: 42px;
                    height: 32px;
                    line-height: 32px;
                    box-sizing: border-box;
                    border: 1px solid;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    // font-weight: 600;
                    margin: 0 5px;
                    font-size: 14px;
                }
                .btn:hover {
                    border-width: 2px;
                    font-weight: bold;
                }
            }
        }

        .list {
            width: 100%;
            height: calc(100% - 120px);
            margin: 20px 0;
            border-top: 1px solid #cccccc;
            // border-bottom: 1px solid #cccccc;
            .header {
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                border-bottom: 1px solid #cccccc;
                .header-li {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    user-select:none;
                    -ms-user-select: none;
                    -moz-user-select: none;
                    -webkit-user-select: none;
                }
                .header-click {
                    cursor: pointer;
                    .head-sort:before {
                        content: "";
                        display: block;
                        width: 0px;
                        height: 0px;
                        border: 5px solid transparent;
                        border-bottom-color: #cccccc;
                        position: relative;
                        top: -1px;
                        left: 12px;
                    }
                    .head-sort:after {
                        content: "";
                        display: block;
                        width: 0px;
                        height: 0px;
                        border: 5px solid transparent;
                        border-top-color: #cccccc;
                        position: relative;
                        top: 1px;
                        left: 12px;
                    }
                    .head-sort-up:before {
                        border-bottom-color: #000000;
                    }
                    .head-sort-down:after {
                        border-top-color: #000000;
                    }
                }
            }
            .list-body {
                width: 100%;
                height: calc(100% - 40px);
                .list-li {
                    width: 100%;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding: 10px 0;
                    .li-item {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .text {
                            width: $ITEMWIDTH;
                        }
                        .long-text {
                            width: $ITEMWIDTH;
                            max-height: 100%;
                        }
                        .operate {
                            width: $ITEMWIDTH;
                            flex-wrap: wrap;
                            .btn {
                                min-width: 40px;
                                width: fit-content;
                                padding: 2px 4px ;
                                height: 24px;
                                line-height: 24px;
                                font-size: 14px;
                                cursor: pointer;
                                border-radius: 4px;
                                margin: 0 5px;
                                border: 1px solid;
                                box-sizing: border-box;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }
                            .btn:hover {
                                border-width: 2px;
                                font-weight: bold;
                            }
                        }
                        .image {
                            aspect-ratio: 1/1;
                            height: 100%;
                            align-items: center;
                            img {
                                display: block;
                                max-width: 80%;
                                max-height: 80%;
                                cursor: pointer;
                            }
                        }
                        .link {
                            width: $ITEMWIDTH;
                            // overflow: hidden; 
                            // white-space: nowrap; 
                            // text-overflow: ellipsis;
                            color: #0073bb;
                            cursor: pointer;
                        }

                        .code {
                            width: $ITEMWIDTH;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                    
                }
            }
        }

        .index {
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: end;
            align-items: center;
            .index-info {
                font-size: 14px;
                margin: 0 20px;
            }
            .box {
                width: 24px;
                height: 24px;
                border-radius: 4px;
                margin: 0 5px;
                box-sizing: border-box;
                border: 1px solid;
                border-color: #000000;
                background-size: 18px 18px;
                cursor: pointer;
            }
            .left {
                background: url("/src/assets/image/index/list/arrow_left.svg");
                background-position: center center;
            }
            .item {
                background: #005795;
                border-color: #005795;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
            }
            .right {
                background: url("/src/assets/image/index/list/arrow_right.svg");
                background-position: center center;
            }
            .goto-input {
                min-width: 36px;
                width: fit-content;
                cursor: text;
                text-align: center;
                border: 1px solid #FFFFFF;
                border-bottom: 1px solid #cccccc;
                outline: none;
                padding: 0 12px;
            }
            .goto {
                color: #0073bb;
                font-size: 14px;
                cursor: pointer;
            }
            .disable {
                // pointer-events: none;
                cursor: not-allowed;
                filter: opacity(50%);
            }
        }
    }
</style>