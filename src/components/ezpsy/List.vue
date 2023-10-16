<script setup lang="ts">
    import { DIRECTION } from '@/assets/utils/config';
    import { getBlob } from '@/assets/utils/image';
    import log from '@/assets/utils/log'
    import { showImg } from '@/assets/utils/popup';
    import { deepClone } from '@/assets/utils/utils';
    import { nextTick, onMounted, reactive, ref, watch } from 'vue';
    import { ObjectListSort } from "@/assets/utils/sort"    

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
            require: true
        }
    })

    const data = reactive({
        searchValue: "",
        header: new Array<HEADER>(),
        origin: props.lists,
        cache: new Array(),
        lists: deepClone(props.lists),
        numPerPage: 12,
        index: 1,
        pages: 0,
        checkedList: new Set<any>(),
        normalLists: deepClone(props.lists),
        defaultSort: -1
    })

    const getStyle = (obj: Record<string, string>) => {
        return JSON.stringify(obj).replace(/[{}"]/g, '').replace(/,/g, ';')
    }

    const sliceLists = (origin: Array<any>) => {
        return origin.slice(data.numPerPage*(data.index-1), data.numPerPage*data.index)
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
                sort: sort
            })
        })
        const length = data.lists.length
        data.pages = Math.ceil(length/data.numPerPage)
        data.lists = sliceLists(data.origin as [])
        if(data.defaultSort !== -1) {
            const head = data.header[data.defaultSort]
            if(head.sort === DIRECTION.NORMAL) {
                data.lists = deepClone(data.normalLists)
            } else {
                data.lists = ObjectListSort({
                    list: data.lists,
                    method: head.sort,
                    key: head.value
                }) 
            }
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
        data.lists = sliceLists(data.origin as [])
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
            data.normalLists = deepClone(data.lists)
            head.sort = DIRECTION.FORWARD
        } else if(head.sort === DIRECTION.FORWARD) {
            head.sort = DIRECTION.REVERSE
        } else {
            head.sort = DIRECTION.NORMAL
        }
        if(head.sort === DIRECTION.NORMAL) {
            data.lists = deepClone(data.normalLists)
        } else {
            data.lists = ObjectListSort({
                list: data.lists,
                method: head.sort,
                key: head.value
            }) 
        }
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
            <div class="list-body">
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
                    -->
                    <div class="li-item" :style="item.style" v-for="item in data.header">
                        <div class="text align" :class="item?.align" v-if="item.type === 'text'">
                            {{ list[item.value] }}
                        </div>
                        <div class="long-text" :title="list[item.value]" v-if="item.type === 'long-text'">
                            {{ list[item.value] }}
                        </div>
                        <div class="operate align" :class="item?.align" v-if="item.type === 'operate'">
                            <button class="btn" :class="getBTNStyle(bt?.style)" v-for="bt in list[item.value]" @click="bt.func(list)">
                                {{ bt.text }}
                            </button>
                        </div>
                        <div class="image align" :class="item?.align" v-if="item.type === 'image'">
                            <img :src="getBlob(list[item.value])" @click="openPreview(getBlob(list[item.value]))" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="index">
            <div 
                class="box left" 
                :class="data.index === 1 ? 'disable' : ''"
                @click="changeIndex(false)"
            ></div>
            <div class="box item">{{ data.index }}</div>
            <div 
                class="box right" 
                :class="data.index === data.pages ? 'disable' : ''"
                @click="changeIndex(true)"
            ></div>
        </div>
    </div>
</template>

<style scoped lang="scss">

    input[type="checkbox"] {
        outline: none;
        width: 18px;
        height: 18px;
        margin: 5px;
        cursor: pointer;
    }
    .listbox {
        .btn {
            border: 1px solid #cccccc;
            color: #cccccc;
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
    }

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
                .btn {
                    width: 50px;
                    height: 32px;
                    line-height: 32px;
                    box-sizing: border-box;
                    border-radius: 4px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    // font-weight: 600;
                    margin: 0 5px;
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
                    .li-item {
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .text {
                            width: 100%;
                            overflow: hidden; 
                            white-space: nowrap; 
                            text-overflow: ellipsis;
                        }
                        .long-text {
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            text-indent: .8em;
                            text-align: justify;
                            display: -webkit-box;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                            /*! autoprefixer: off */
                            -webkit-box-orient: vertical;
                        }
                        .operate {
                            width: 100%;
                            .btn {
                                background: none;
                                outline: none;
                                cursor: pointer;
                                border-radius: 4px;
                                margin: 0 5px;
                                box-sizing: border-box;
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
            .box {
                width: 24px;
                height: 24px;
                border-radius: 4px;
                margin: 0 5px;
                box-sizing: border-box;
            }
            .left {
                border: 1px solid;
                border-color: #000000;
                background: url("./image/index/list/arrow_left.svg");
                background-position: center center;
                background-size: 18px 18px;
                cursor: pointer;
            }
            .item {
                background: #005795;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
            }
            .right {
                border: 1px solid;
                border-color: #000000;
                background: url("./image/index/list/arrow_right.svg");
                background-position: center center;
                background-size: 18px 18px;
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