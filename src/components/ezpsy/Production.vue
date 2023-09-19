<script setup lang="ts">
    import List from "@/components/ezpsy/List.vue"
    import log from '@/assets/utils/log'
    import { nextTick, onBeforeMount, onMounted, reactive, ref } from "vue";
    import { getCurrentUser } from "@/assets/index/auth";
    import { UserStore } from "@/store/store";
    import agc from "@/assets/agc/agc";
    import { decrypt, encrypt } from "@/assets/utils/crypto";
    import { formatDate } from "@/assets/utils/utils";
    import { hideloading, showloading, tipPopup } from "@/assets/utils/popup";
    import router from "@/router/router";
    import { useRoute } from "vue-router";
    import { getReg, deepClone } from "@/assets/utils/utils"

    const route = useRoute()
    const storage = agc.storage

    const isReload = ref(false)
    const reload = () => {
        isReload.value = true
        nextTick(() => {
            isReload.value = false
        })
    }

    interface OPERATE {
        [key: string]: {
            text: string,
            func: (item: LIST) => void
        } 
    } 

    interface LIST {
        path: string
        title: string
        description: string
        modifyTime: string
        xml: string
        js: string
        operations: OPERATE
    }

    const data = reactive({
        type: "",
        searchOpts: {},
        headers: {},
        lists: new Array<LIST>()
    });

    data.searchOpts = {
        search: {
            title: "搜索: ",
            placeholder: "通过标题查询",
            func: (value: string, origin: Array<any>) => {
                const reg = getReg(value)
                const target = origin.filter(item => {
                    if(reg.test(item.title)) {
                        return deepClone(item)
                    } else {
                        return false
                    }
                })
                return target
            }
        },
        operations: {
            delete: {
                title: "删除",
                style: {
                    border: "1px solid #ef0000",
                    color: "#ef0000",
                },
                func: async (lists: Array<any>) => {
                    if(lists.length > 0) {
                        await Promise.all(
                            lists.map(async (list) => {
                                await storage.deleteFile(decrypt(list.path))
                            })
                        )
                        getFileList()
                    } else {
                        tipPopup("warn", {
                            title: "未选中目标",
                            tips: "请选择操作目标",
                            closeTip: "点击空白处关闭弹窗"
                        })
                    }
                }
            }
        }
    }

    const user = UserStore().getUser
    // @ts-ignore
    data.type = `/private/${user?.uid}/ezBlock/`
    data.headers = {
        title: {
            type: "text",
            text: "标题",
            style: {
                width: "20%"
            }
        },
        description: {
            type: "long-text",
            text: "描述",
            style: {
                width: "30%"
            }
        },
        modifyTime: {
            type: "text",
            text: "修改时间",
            style: {
                width: "20%"
            }
        },
        operations: {
            type: "operate",
            text: "操作",
            style: {
                width: "30%"
            }
        }
    }

    const operate:OPERATE = {
        open: {
            text: "打开",
            func: (item: LIST) => {
                router.replace({
                    query: {
                        menu: "ezpsy-block",
                        xml: encrypt(item.xml)
                    }
                })
            }
        },
        delete: {
            text: "删除",
            func: async (item: LIST) => {
                const res = await storage.deleteFile(decrypt(item.path))
                if(res.isSuccess) {
                    await getFileList()
                }
            }
        }
    }

    const getFileList = async () => {
        showloading(1, 2)
        const listsRes = await storage.getFileListAll(data.type)
        if(listsRes.isSuccess){
            const cacheStr = localStorage.getItem("EZPSY_PRODUCTION")
            const hasCache = !!(cacheStr)
            let cache: Record<string, any> = {}
            if(hasCache) 
                cache = JSON.parse(cacheStr)
            let newCache: Record<string, any> = {}
            data.lists = []
            const lists = listsRes.data.fileList
            for(let i = 0; i < lists.length; i++) {
                const list = lists[i]
                const title = list.name.split('.')[0]
                if(title in cache) {
                    const li = Object.assign(cache[title], {
                        operations: operate
                    })
                    data.lists.push(li)
                    newCache[title] = deepClone(cache[title])
                } else {
                    const fileRes = await storage.getFileData(list.path)
                    if(fileRes.isSuccess) {
                        const json = fileRes.data
                        json.data = JSON.parse(decrypt(json.data))
                        const li = {
                            path: encrypt(list.path),
                            title: title,
                            description: json.data.description,
                            modifyTime: formatDate(json.mtime),
                            xml: json.data.xml,
                            js: json.data.code
                        }
                        data.lists.push(Object.assign(li, { operations: operate }))
                        newCache[title] = deepClone(li)
                    }
                }
            }
            localStorage.setItem("EZPSY_PRODUCTION", JSON.stringify(newCache))
            reload()
        }
        hideloading()
    }

    onBeforeMount(async () => {
        await getFileList()
    })
    
</script>

<template>
    <div>
        <List 
            v-if="!isReload" 
            :searchOpts="data.searchOpts"
            :headers="data.headers" 
            :lists="data.lists"
        ></List>
    </div>
</template>

<style scoped lang="scss">
    
</style>