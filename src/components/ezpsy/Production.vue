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
    
    interface LIST {
        path: string
        title: string
        description: string
        modifyTime: string
        xml: string
        js: string
        operations: OPERATE
    } 

    const route = useRoute()
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
    data.type = `/private/${user?.uid}/ezBlock/`
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
        description: {
            type: "long-text",
            text: "描述",
            style: {
                width: "35%"
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
        open: {
            text: "打开",
            func: (item: LIST) => {
                router.replace({
                    query: {
                        menu: "ezpsy-block",
                        xml: encrypt(item.xml)
                    }
                })
            },
            style: "green"
        },
        release: {
            text: "发布",
            func: async (item: LIST) => {
                inputPopup({
                    title: "请输入相关信息",
                    html: [
                        {
                            type: "input",
                            props: {
                                title: "文件名",
                                placeholder: "请输入"
                            }
                        },
                        {
                            type: "multiline",
                            props: {
                                title: "描述",
                                placeholder: "请输入"
                            }
                        }
                    ],
                    preConfirm: (getValue) => {
                        return () => {
                            const res = getValue()
                            return {
                                title: res[0],
                                description: res[1]
                            }
                        }
                    }
                }).then(result => {
                    if(result.isConfirmed) {
                        closePopup()
                        const value = result.value
                        // log.info(user)
                        const json = {
                            // ctime: Date.now(),
                            // mtime: Date.now(),
                            data: encrypt(JSON.stringify({
                                creator: {
                                    // @ts-ignore
                                    name: user.displayName,
                                    // @ts-ignore
                                    avatar: user.photoUrl
                                },
                                origin: {
                                    name: item.title
                                },
                                description: value?.title ? value.title : "",
                                code: item.js
                            }))
                        }
                        storage.uploadString({
                            str: JSON.stringify(json),
                            // @ts-ignore
                            folder: `private/${user.uid}/ezExperiment`,
                            name: value.title ? value.title : uuid.getUuid(),
                            extension: "json"
                        })
                    }
                })
            },
            style: "blue"
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
            const cacheStr = localStorage.getItem("EZPSY_PRODUCTION")
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
                                description: json.data.description,
                                // modifyTime: formatDate(json.mtime),
                                modifyTime: formatDate(metadata.mtime),
                                xml: json.data.xml,
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
                localStorage.setItem("EZPSY_PRODUCTION", JSON.stringify(newCache))
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