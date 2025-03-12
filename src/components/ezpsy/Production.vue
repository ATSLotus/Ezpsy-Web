<script setup lang="ts">
    import log from '@/assets/utils/log'
    import { nextTick, onBeforeMount, onBeforeUnmount, onMounted, reactive, ref } from "vue";
    import { UserStore } from "@/store/store";
    import agc from "@/assets/agc/agc";
    import { encrypt } from "@/assets/utils/crypto";
    import { formatDate } from "@/assets/utils/utils";
    import { closePopup, hideloading, inputPopup, showloading, tipPopup } from "@/assets/utils/popup";
    import router from "@/router/router";
    import { useRoute } from "vue-router";
    import { DIRECTION } from "@/assets/utils/config"
    import uuid from "@/assets/utils/uuid";
    import ListV2 from "./ListV2.vue";

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
        list: new Array<LIST>(),
        opts: {
            set: ({
                file,
                metadata
            }: {
                file: any
                metadata: any
            }) => {
                return {
                    description: file.description,
                    modifyTime: formatDate(metadata.mtime),
                    xml: file.xml,
                    js: file.code
                }
            }
        } as Record<string, Function>
    });

    data.searchOpts = {
        search: {
            title: "搜索: ",
            placeholder: "通过标题查询"
        },
        reload: {
            func: () => {
                getFileList()
            }
        },
        operations: {
            upload: {
                title: "上传",
                style: "green",
                func: async () => {
                    const input = document.createElement("input")
                    input.type = "file"
                    input.accept = ".xml"
                    input.click()
                    input.addEventListener("change", () => {
                        const files = input.files
                        if(files) {
                            const file = files[0]
                            const reader = new FileReader()
                            reader.onload = () => {
                                const result = reader.result as string | null
                                if(result) {
                                    router.replace({
                                        query: {
                                            menu: "ezpsy-block",
                                            xml: encrypt(result),
                                            isSave: "true"
                                        }
                                    })
                                }
                            }
                            reader.readAsText(file)
                        } 
                    })
                }
            },
            delete: {
                title: "删除",
                style: "red",
                func: async (lists: Array<any>) => {
                    if(lists.length > 0) {
                        await Promise.all(
                            lists.map(async (list) => {
                                await storage.deleteFile(list.path)
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
            path: "title",
            style: {
                width: "15%",
            },
            align: "start",
            sort: true
        },
        description: {
            type: "long-text",
            text: "描述",
            path: "data.description",
            style: {
                width: "35%"
            }
        },
        modifyTime: {
            type: "text",
            text: "修改时间",
            path: "data.modifyTime",
            style: {
                width: "20%",
            },
            sort: DIRECTION.REVERSE
        },
        operations: {
            type: "operate",
            text: "操作",
            path: "operations",
            style: {
                width: "30%"
            },
            grid: {
                align: "center",
                max: 4
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
                        key: item.title
                    }
                })
            },
            style: "green"
        },
        modify: {
            text: "修改",
            func: (item: LIST) => {
                inputPopup({
                    title: "请输入相关信息",
                    html: [
                        {
                            type: "input",
                            props: {
                                title: "文件名",
                                placeholder: "请输入",
                                default: item.title,
                                require: true
                            }
                        },
                        {
                            type: "multiline",
                            props: {
                                title: "描述",
                                placeholder: "请输入",
                                default: item.data.description
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
                        if(value.title === item.title && value.description === item.data.description) {
                            return
                        } else {
                            if(value.title !== item.title) {
                                storage.deleteFile(item.path)
                            }
                            const json = {
                                data: encrypt(JSON.stringify({
                                    creator: {
                                        // @ts-ignore
                                        name: user.displayName,
                                        // @ts-ignore
                                        avatar: user.photoUrl
                                    },
                                    description: value?.description ? value.description : "",
                                    xml: item.data.xml,
                                    code: item.data.js
                                }))
                            }
                            storage.uploadString({
                                str: JSON.stringify(json),
                                // @ts-ignore
                                folder: `private/${user.uid}/ezBlock`,
                                name: value.title ? value.title : uuid.getUuid(),
                                extension: "json"
                            })
                        }
                        
                    }
                })
            },
            style: "yellow"
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
                                description: value?.description ? value.description : "",
                                code: item.data.js
                            }))
                        }
                        storage.uploadString({
                            str: JSON.stringify(json),
                            // @ts-ignore
                            folder: `public/${user.uid}/ezExperiment`,
                            name: value.title ? value.title : uuid.getUuid(),
                            extension: "json"
                        })
                    }
                })
            },
            style: "blue"
        },
        share: {
            text: "分享",
            func: async (item: LIST) => {
                const link_route = router.resolve({
                    query: {
                        menu: "ezpsy-block",
                        xml: encrypt(item.data.xml)
                    }
                })
                const link = `${location.host}/${link_route.href}`
                await navigator.clipboard.writeText(link);
                tipPopup("success", {
                    title: "复制成功",
                    closeTip: "点击空白处关闭",
                    timer: 2000
                })
            },
            style: "orange"
        },
        download: {
            text: "下载",
            func: async (item: LIST) => {
                let blob = new Blob([item.data.xml], {
                    type: "text/xml;charset=utf-8"
                });
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onload = function(e) {
                    const target = e.target
                    if(target) {
                        let a = document.createElement('a');
                        a.download = uuid.getUuid();
                        a.href = target.result as string;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    }
                    
                }
            },
            style: "brown"
        },
        copy: {
            text: "复制",
            func: async (item: LIST) => {
                const json = {
                    data: encrypt(JSON.stringify({
                        creator: {
                            // @ts-ignore
                            name: user.displayName,
                            // @ts-ignore
                            avatar: user.photoUrl
                        },
                        description: item.data.description,
                        xml: item.data.xml,
                        code: item.data.js
                    }))
                }
                storage.uploadString({
                    str: JSON.stringify(json),
                    // @ts-ignore
                    folder: `private/${user.uid}/ezBlock`,
                    name: item.title + '_' + uuid.getUuid(),
                    extension: "json"
                })
            }
        },
        delete: {
            text: "删除",
            func: async (item: LIST) => {
                const res = await storage.deleteFile(item.path)
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
            const list = listsRes.data.fileList
            data.list = list.map(item => {
                return {
                    title: item.name.split('.')[0],
                    path: item.path,
                    data: {
                        description: "",
                        modifyTime: "",
                        xml: "",
                        js: ""
                    },
                    operations: operate
                }
            })
            console.log(data.list)
            reload()
        }
        hideloading()
    }

    onBeforeMount(async () => {
        await getFileList()
    })

    onMounted(async () => {
        storage.setInsertFunc("reload", getFileList)
    })

    onBeforeUnmount(async () => {
        storage.deleteInsertFunc("reload")
    })
    
</script>

<template>
    <div>
        <ListV2 
            v-if="!isReload" 
            :searchOpts="data.searchOpts"
            :headers="data.headers" 
            :list="data.list"
            :opts="data.opts"
        ></ListV2>
    </div>
</template>

<style scoped lang="scss">
    
</style>