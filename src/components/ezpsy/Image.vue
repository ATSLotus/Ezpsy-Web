<script setup lang="ts">
    import agc from '@/assets/agc/agc';
    import { decrypt, encrypt } from '@/assets/utils/crypto';
    import log from '@/assets/utils/log'
    import { hideloading, showloading } from '@/assets/utils/popup';
    import { deepClone, formatDate } from '@/assets/utils/utils';
    import { UserStore } from '@/store/store';
    import { reactive, ref, nextTick, onMounted } from 'vue';
    import List from './List.vue';
    import { getBase64 } from "@/assets/utils/image"
    import uuid from '@/assets/utils/uuid';

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
        name: string
        description: string
        modifyTime: string
        preview: string
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
                
            }
        },
        operations: {
            add: {
                title: "增加",
                style: {
                    border: "1px solid #19c37d",
                    color: "#19c37d"
                },
                func: async () => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = "image/*"
                    // input.style.display = "none"
                    // document.body.append(input)
                    input.click()
                    input.onchange = async (event: Event) => {
                        if(input.files && input.files?.length > 0){
                            const file = input.files[0]
                            const reader = new FileReader()
                            reader.onload = () => {
                                const json = {
                                    ctime: Date.now(),
                                    mtime: Date.now(),
                                    data: encrypt(JSON.stringify({
                                        creator: {
                                            // @ts-ignore
                                            name: user.displayName,
                                            // @ts-ignore
                                            avatar: user.photoUrl
                                        },
                                        description: "",
                                        image: getBase64(reader.result as string)
                                    }))
                                }
                                storage.uploadString({
                                    str: JSON.stringify(json),
                                    // @ts-ignore
                                    folder: `private/${user.uid}/ezImage`,
                                    name: uuid.getUuid(),
                                    extension: "json"
                                })
                            }
                            reader.readAsDataURL(file)
                        }
                    }
                }
            },
            delete: {
                title: "删除",
                style: {
                    border: "1px solid #ef0000",
                    color: "#ef0000",
                },
                func: async (lists: Array<any>) => {
                    
                }
            }
        }
    }

    const operate:OPERATE = {
        open: {
            text: "打开",
            func: (item: LIST) => {
                
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

    const user = UserStore().getUser
    // @ts-ignore
    data.type = `/private/${user?.uid}/ezImage/`
    data.headers = {
        name: {
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
                width: "25%"
            }
        },
        preview: {
            type: "image",
            text: "预览",
            style: {
                width: "5%"
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

    const getFileList = async () => {
        showloading(1, 2)
        const listsRes = await storage.getFileListAll(data.type)
        if(listsRes.isSuccess){
            const cacheStr = localStorage.getItem("EZPSY_IMAGE")
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
                            name: title,
                            description: json.data.description,
                            modifyTime: formatDate(json.mtime),
                            preview: json.data.image
                        }
                        data.lists.push(Object.assign(li, { operations: operate }))
                        newCache[title] = deepClone(li)
                    }
                }
            }
            localStorage.setItem("EZPSY_IMAGE", JSON.stringify(newCache))
            reload()
        }
        hideloading()
    }

    onMounted(async () => {
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