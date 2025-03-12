<script setup lang="ts">
    import { DIRECTION } from '@/assets/utils/config';
    import { getBlob } from '@/assets/utils/image';
    import log from '@/assets/utils/log'
    import { hideloading, setContainer, showImg, showloading } from '@/assets/utils/popup';
    import { deepClone, getReg } from '@/assets/utils/utils';
    import { Ref, nextTick, onMounted, reactive, ref, watch } from 'vue';
    import { ObjectListSort } from "@/assets/utils/sort"    
    import ToolTip from './ToolTip.vue';
    import agc from '@/assets/agc/agc';
    import { decrypt } from '@/assets/utils/crypto';
    import { get } from 'lodash';
    import { ElLoading } from 'element-plus';
    import 'element-plus/dist/index.css'

    const storage = agc.storage

    const props = defineProps({
        searchOpts: {
            type: Object,
            require: true
        },
        headers: {
            type: Object,
            require: true
        },
        list: {
            type: Array<LIST>,
            require: true,
            default: []
        },
        opts: {
            type: Object,
            require: true
        }
    })

    const list_body = ref(null) as Ref<HTMLDivElement | null>
    const goto = ref(null) as Ref<HTMLDivElement | null>

    const screenMsg = reactive({
        item_height: 60,
        list_body_height: 0
    })

    const isCheckedAll = ref(false)

    const data = reactive({
        searchValue: "",
        header: new Array<HEADER>(),
        origin: props.list,
        list: props.list as Array<LIST>,
        currentList: [] as Array<LIST>,
        cache: [] as Array<LIST>,
        numPerPage: 9,
        index: 1,
        pages: 0,
        checkedList: {} as Record<string, boolean>,
        defaultSort: -1,
        grid: {
            max: 4,
            align: "center"
        },
        goto_index: 1,
        refresh: true
    })

    const refresh = () => {
        data.refresh = false
        nextTick(() => {
            data.refresh = true
        })
    }

    const getStyle = (obj: Record<string, string>) => {
        return JSON.stringify(obj).replace(/[{}"]/g, '').replace(/,/g, ';')
    }

    const sliceLists = (origin: Array<LIST>) => {
        const new_lists = origin.slice(data.numPerPage * (data.index - 1), data.numPerPage * data.index)
        return new_lists
    }

    const calculateNumPerPage= (value: HTMLDivElement) => {
        screenMsg.list_body_height = value.clientHeight
        data.numPerPage = Math.floor(screenMsg.list_body_height/screenMsg.item_height)
        // data.lists = sliceLists(data.cache)
    }

    const search = () => {
        const reg = getReg(data.searchValue)
        const target = data.origin.filter(item => {
            if(reg.test(item.title)) {
                return deepClone(item)
            } else {
                return false
            }
        })
        return target
    }
    
    const setList = async () => {
        const loadingInstance = ElLoading.service({
            target: list_body.value as HTMLElement
        })
        data.currentList = []
        const list = sliceLists(data.list)
        await Promise.all(list.map(async item => {
            const file = await storage.getFileData(item.path)
            const metadata = await storage.getMetadata(item.path)
            if(file.isSuccess && metadata.isSuccess) {
                item.data = props.opts?.set({
                    file: JSON.parse(decrypt(file.data?.data as string)),
                    metadata: metadata.data
                })    
            }
        }))
        nextTick(() => {
            data.currentList = list
        })
        loadingInstance.close()
        // refresh()
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
            console.log(item)
            data.header.push({
                value: item,
                path: props.headers?.[item]["path"],
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
        const length = data.origin.length
        data.pages = Math.ceil(length/data.numPerPage)
        if(data.defaultSort !== -1) {
            const head = data.header[data.defaultSort]
            if(head.sort === DIRECTION.NORMAL) {
                data.currentList = deepClone(data.list)
            } else {
                data.list = ObjectListSort({
                    list: data.list,
                    method: head.sort,
                    key: head.value
                }) 
            }
        }
        // data.lists = sliceLists(data.cache)
        if(list_body.value) {
            const dom = list_body.value
            const resizeObserver = new ResizeObserver(entries => {
                calculateNumPerPage(dom)
            });
            resizeObserver.observe(dom)
        }
        await setList()
        refresh()
    })

    const checkAll = () => {
        data.currentList.forEach(item => {
            data.checkedList[item.title] = isCheckedAll.value
        }) 
    }

    // const check = (payload: MouseEvent, list: any) => {
    //     const target = payload.target as HTMLInputElement
    //     if(target.checked) {
    //         data.checkedList.add(list)
    //     } else {
    //         data.checkedList.delete(list)
    //     }
    // }

    const changeIndex = async (method: boolean) => {
        if(method) {
            data.index < data.pages && data.index++
        } else {
            data.index > 1 && data.index--
        }
        data.checkedList = {}
        await setList()
        // data.lists = sliceLists(data.cache)
    }

    const searchLists = async () => {
        data.checkedList = {}
        data.cache = search()
        data.index = 1
        data.pages = Math.ceil(data.cache.length/data.numPerPage)
        data.list = sliceLists(data.cache)
        await setList()
    }

    const openPreview = (str: string) => {
        showImg(str)
    }

    const sort = async (event: Event, head: HEADER) => {
        if(head.sort === DIRECTION.NORMAL) {
            data.list = deepClone(data.list)
            head.sort = DIRECTION.FORWARD
        } else if(head.sort === DIRECTION.FORWARD) {
            head.sort = DIRECTION.REVERSE
        } else {
            head.sort = DIRECTION.NORMAL
        }
        if(head.sort === DIRECTION.NORMAL) {
            data.currentList = deepClone(data.list)
        } else {
            data.list = ObjectListSort({
                list: data.list,
                method: head.sort,
                key: head.value
            }) 
        }
        data.currentList = sliceLists(data.list)
        data.header.forEach(H => {
            if(H.sort !== undefined) {
                if(head !== H)
                    H.sort = DIRECTION.NORMAL
            }
        })
        await setList()
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

    const Go = async () => {
        data.index = data.goto_index
        data.checkedList = {}
        await setList()
    }

    watch(list_body, (value) => {
        if(value) {
            calculateNumPerPage(value)
        }
    })

    watch(
        () => data.currentList,
        () => {
            data.checkedList = {}
            data.currentList.forEach(item => {
                data.checkedList[item.title] = false
            })
        },
        {deep: true}
    )

    watch( 
        () => data.checkedList,
        () => {
            isCheckedAll.value = Object.keys(data.checkedList).every(key => data.checkedList[key])
        },
        {deep: true}
    )

    const getCheckedList = () => { 
        return data.origin.filter(item => !!(data.checkedList?.[item.title])) 
    }
    
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
                </div>
                <div 
                    v-for="item in props.searchOpts?.operations"
                    class="btn"
                    :class="getBTNStyle(item?.style)"
                    @click="item.func(getCheckedList())"
                >{{ item.title }}</div>
            </div>
        </div>
        <div class="list">
            <div class="header">
                <input 
                    v-model="isCheckedAll"
                    type="checkbox" 
                    @change="checkAll" 
                />
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
                    v-for="list, index in data.currentList"
                    :style="index%2===0 ? 'background: #f5f5f5' : 'background: #ffffff'"
                >
                    <input 
                        type="checkbox" 
                        v-model="data.checkedList[list.title]" 
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
                        v-if="data.refresh"
                    >
                        <ToolTip 
                            class="text align" 
                            :class="item?.align" 
                            v-if="item.type === 'text'"
                            :content="get(list, item.path)"
                            :type="'text'"
                        ></ToolTip>
                        <ToolTip 
                            class="long-text" 
                            v-if="item.type === 'long-text'"
                            :content="get(list, item.path)"
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
                                v-for="bt in get(list, item.path)" 
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
                            <img :src="getBlob(get(list, item.path))" @click="openPreview(getBlob(get(list, item.path)))" />
                        </div>
                        <ToolTip 
                            class="link align" 
                            :class="item?.align" 
                            v-if="item.type === 'link'" 
                            @click="item.action && item.action(list)"
                            :content="get(list, item.path)"
                            :type="'text'"
                        ></ToolTip>
                        <ToolTip 
                            class="code" 
                            v-if="item.type === 'code'"
                            :content="get(list, item.path)"
                            :type="'json'"
                        ></ToolTip>
                    </div>
                </div>
                <div class="list-default" v-if="data.currentList.length === 0">
                    <img src="@/assets/image/imgs/list-default.svg" alt="">
                </div>
            </div>
        </div>
        <div class="index" v-if="data.currentList.length !== 0">
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
                .list-default {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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