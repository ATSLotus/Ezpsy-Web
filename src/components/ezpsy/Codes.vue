<script setup lang="ts">
    import List from "@/components/ezpsy/List.vue"
    import log from '@/assets/utils/log'
    import { nextTick, onBeforeMount, onMounted, reactive, ref } from "vue";
    import { getCurrentUser } from "@/assets/index/auth";
    import { UserStore } from "@/store/store";
    import agc from "@/assets/agc/agc";
    import { decrypt, encrypt } from "@/assets/utils/crypto";
    import { formatDate } from "@/assets/utils/utils";
    import { closePopup, hideloading, inputPopup, showloading, tipPopup } from "@/assets/utils/popup";
    import router from "@/router/router";
    import { useRoute } from "vue-router";
    import { getReg, deepClone } from "@/assets/utils/utils"
    import { DIRECTION } from "@/assets/utils/config"
    import { ObjectListSort } from "@/assets/utils/sort";
    import uuid from "@/assets/utils/uuid";
    import { getStorage, setStorage } from "@/assets/utils/storage"

    const baseUrl = window.location.origin
    
    interface LIST {
        path: string
        title: string
        origin: string
        description: string
        modifyTime: string
        js: string
        operations: OPERATE
    } 

    const storage = agc.storage

    const isReload = ref(false)
    const reload = () => {
        isReload.value = true
        nextTick(() => {
            isReload.value = false
        })
    }

    const data = reactive({
        type: "",
        searchOpts: {},
        headers: {} as Record<string, OPTS_HEADER>,
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
        reload: {
            func: () => {
                getFileList()
            }
        },
        operations: {
            delete: {
                title: "删除",
                style: "red",
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
    data.type = `/public/${user?.uid}/ezExperiment/`
    data.headers = {
        title: {
            type: "text",
            text: "标题",
            style: {
                width: "15%",
            },
            align: "start",
            sort: true
        },
        origin: {
            type: "link",
            text: "源模板",
            style: {
                width: "10%"
            },
            sort: true,
            action: async (list: LIST) => {
                // @ts-ignore
                const res = await agc.storage.getFileData(`/private/${user?.uid}/ezBlock/${list.origin}.json`)
                if(res.isSuccess) {
                    log.info(res)
                    const result = JSON.parse(decrypt(res.data.data))
                    router.replace({
                        query: {
                            menu: "ezpsy-block",
                            xml: encrypt(result.xml)
                        }
                    })
                }
            }
        },
        description: {
            type: "long-text",
            text: "描述",
            style: {
                width: "20%"
            }
        },
        modifyTime: {
            type: "text",
            text: "修改时间",
            style: {
                width: "20%",
            },
            sort: DIRECTION.REVERSE
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
        test: {
            text: "测试",
            style: "green",
            func: async (item: LIST) => {
                console.log(decrypt(item.path))
                const routeData = router.resolve({
                    path: "/ezpsy/experiment",
                    query: {
                        // code: encrypt(item.js),
                        path: item.path,
                        experiment: item.title
                    }
                })
                window.open(routeData.href, "_blank")
            }
        },
        copy: {
            text: "复制",
            style: "blue",
            func: (item) => {
                const url = `${baseUrl}/#/ezpsy/experiment?path=${encodeURIComponent(item.path)}&experiment=${encodeURIComponent(item.title)}`
                navigator.clipboard.writeText(url).then(() => {
                    tipPopup("success", {
                        title: url,
                        timer: 1000
                    })
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
            },
            style: "red"
        }
    }

    const getFileList = async () => {
        showloading(1, 2)
        const listsRes = await storage.getFileListAll(data.type)
        if(listsRes.isSuccess){
            const cacheStr = getStorage("EZPSY_CODES")
            const hasCache = !!(cacheStr)
            let cache: Record<string, any> = {}
            if(hasCache) 
                cache = JSON.parse(cacheStr)
            let newCache: Record<string, any> = {}
            data.lists = []
            const lists = listsRes.data.fileList
            Promise.all(
                lists.map(async (list: any) => {
                    const title = list.name.split('.')[0]
                    const metadata = await list.getFileMetadata()
                    if(
                        title in cache && 
                        formatDate(metadata.mtime) === cache[title].modifyTime
                    ) {
                        const li = Object.assign(cache[title], {
                            operations: operate
                        })
                        data.lists.push(li)
                    } else {
                        const fileRes = await storage.getFileData(list.path)
                        if(fileRes.isSuccess) {
                            const json = fileRes.data
                            json.data = JSON.parse(decrypt(json.data))
                            const li = {
                                path: encrypt(list.path),
                                title: title,
                                origin: json.data.origin.name,
                                description: json.data.description,
                                // modifyTime: formatDate(json.mtime),
                                modifyTime: formatDate(metadata.mtime),
                                js: json.data.code
                            }
                            data.lists.push(Object.assign(li, { operations: operate }))
                        }
                    }
                })
            ).then(() => {
                const newLists = ObjectListSort<LIST>({
                    list: data.lists,
                    method: DIRECTION.FORWARD,
                    key: "modifyTime"
                })
                data.lists = []
                newLists.forEach((list: any) => {
                    data.lists.push(deepClone(list))
                    delete list["operations"]
                    newCache[list.title] = list
                })
                setStorage("EZPSY_CODES", JSON.stringify(newCache))
                reload()
            }) 
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