<script setup lang="ts">
    import agc from '@/assets/agc/agc';
    import { decrypt, encrypt } from '@/assets/utils/crypto';
    import log from '@/assets/utils/log'
    import { hideloading, inputPopup, showloading, tipPopup } from '@/assets/utils/popup';
    import { getReg, deepClone, formatDate } from '@/assets/utils/utils';
    import { UserStore } from '@/store/store';
    import { reactive, ref, nextTick, onMounted, onBeforeUnmount } from 'vue';
    import List from './List.vue';
    import { getBase64 } from "@/assets/utils/image"
    import uuid from '@/assets/utils/uuid';
    import { DIRECTION } from '@/assets/utils/config';
    import { ObjectListSort } from '@/assets/utils/sort';
    import storeImage from '@/assets/agc/storeImage';
    import { getStorage, setStorage } from '@/assets/utils/storage';

    const storage = agc.storage

    const isReload = ref(false)
    const reload = () => {
        isReload.value = true
        nextTick(() => {
            isReload.value = false
        })
    }

    interface LIST {
        path: string
        name: string
        modifyTime: string
        origin: string
        data: string
        operations: OPERATE
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
                    if(reg.test(item.name)) {
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
            add: {
                title: "增加",
                style: "green",
                func: async () => {
                    storeImage(user)
                }
            },
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

    const operate:OPERATE = {
        delete: {
            text: "删除",
            style: "red",
            func: async (item: LIST) => {
                const res = await storage.deleteFile(decrypt(item.path))
                if(res.isSuccess) {
                    await getFileList()
                }
            }
        }
    }

    const user = UserStore().getUser
    // @ts-ignore
    data.type = `/private/${user?.uid}/ezData/`
    data.headers = {
        name: {
            type: "text",
            text: "标题",
            style: {
                width: "20%"
            },
            align: "start",
            sort: true
        },
        origin: {
            type: "link",
            text: "实验名",
            style: {
                width: "15%"
            },
            sort: true,
            action: async (list: LIST) => {
                // 暂无
            }
        },
        data: {
            type: "code",
            text: "数据",
            style: {
                width: "35%"
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

    const getFileList = async () => {
        showloading(1, 2)
        const listsRes = await storage.getFileListAll(data.type)
        if(listsRes.isSuccess){
            const cacheStr = getStorage("EZPSY_DATA")
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
                                name: title,
                                origin: json.data.sourceCode,
                                modifyTime: formatDate(metadata.mtime),
                                data: json.data.data
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
                    newCache[list.name] = list
                })
                setStorage("EZPSY_DATA", JSON.stringify(newCache))
                reload()
            }) 
        }
        hideloading()
    }

    onMounted(async () => {
        storage.setInsertFunc("reload", getFileList)
        await getFileList()
    })

    onBeforeUnmount(async () => {
        storage.deleteInsertFunc("reload")
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