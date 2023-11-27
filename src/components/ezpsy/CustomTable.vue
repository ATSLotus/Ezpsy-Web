<script setup lang="ts">
    import '@wangeditor/editor/dist/css/style.css';

    import log from '@/assets/utils/log'
    import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
    import { IDomEditor } from "@wangeditor/editor"
    import { Ref, ShallowRef, onMounted, reactive, ref, shallowRef, nextTick, onBeforeUnmount } from 'vue'
    import initBlock from "@/assets/editor/initBlock"
    import editorConfig from "@/assets/editor/editorConfig"
    import toolbarConfig from "@/assets/editor/toolbarConfig"
    import handleHtml from "@/assets/editor/handleHtml"
    import { hideloading, inputPopup, showloading } from '@/assets/utils/popup';
    import { encrypt } from '@/assets/utils/crypto';
    import { UserStore } from '@/store/store';
    import agc from '@/assets/agc/agc';
    import uuid from '@/assets/utils/uuid';

    initBlock()

    const editorRef = shallowRef() as ShallowRef<IDomEditor>
    const valueHtml = ref("")
    const toolbar = ref(null) as Ref<typeof Toolbar | null>
    const contain = ref(null) as Ref<HTMLElement | null>
    const preview = ref(null) as Ref<HTMLElement | null>
    const data = reactive({
        preview: {
            isShow: true,
            icons: [
                "/src/assets/image/imgs/expend.svg",
                "/src/assets/image/imgs/contract.svg"
            ],
            icon_item: 0,
            header: {
                height: "0px"
            }
        },
        editor: {
            width: "50%",
            isFull: false
        },
        data: {
            title: "",
            html: "",
            json: ""
        }
    })

    const user = UserStore().getUser
    const storage = agc.storage

    onMounted(async () => {
        showloading(1, 2)
        const timer = setInterval(() => {
            const h = toolbar.value?.selector.clientHeight
            if(h) {
                data.preview.header.height = `${h}px`
                clearInterval(timer)
                hideloading()
            }
        }, 100)
    })

    onBeforeUnmount(() =>{
        editorRef.value.destroy()
    })

    const handleCreated = (editor: IDomEditor) => {
        editorRef.value = editor
        
        editor.on("fullScreen", () => {
            data.editor.isFull = true
            if(contain.value) {
                contain.value.style.cssText = `
                    position: fixed;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                `
            }
            resetPreview()
            if(editor && data.preview.isShow) {
                // const edt = editorRef.value
                console.log(editor)
            }
        })
        editor.on("unFullScreen", () => {
            data.editor.isFull = false
            if(contain.value) {
                contain.value.style.cssText = ""
            }
            if(preview.value) {
                const h = `${toolbar.value?.selector.clientHeight}px`
                data.preview.header.height = h
                preview.value.style.cssText = ""
            }
        })
    }

    const handleChange = (editor: IDomEditor) => {
        data.data.html = handleHtml(editor.getHtml())
        data.data.json = JSON.stringify(editor.children)
    }

    const resetPreview = () => {
        const h = `${toolbar.value?.selector.clientHeight}px`
        data.preview.header.height = h
        if(preview.value) 
            preview.value.style.cssText = `
                background: #FFFFFF;
                position: fixed;
                left: 50%;
            `
    }

    const handlePreview = () => {
        if(data.preview.isShow) {
            data.preview.icon_item = 1
            data.editor.width = "100%"
        } else {
            data.preview.icon_item = 0
            data.editor.width = "50%"
        }
        nextTick(() => {
            if(data.editor.isFull) {
                resetPreview()
            }
        })
        data.preview.isShow = !data.preview.isShow
    }

    const save = () => {
        inputPopup({
            title: "请输入相关信息",
            html: [
                {
                    type: "input",
                    props: {
                        title: "标题",
                        placeholder: "请输入",
                        default: data.data.title,
                        // require: true
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
                        title: res[0] as string,
                        decription: res[1] as string
                    }
                }
            }
        }).then((res) => {
            if(res.isConfirmed) {
                const { title, decription } = res.value
                const json = encrypt(JSON.stringify({
                    creator: {
                        // @ts-ignore
                        name: user.displayName,
                        // @ts-ignore
                        avatar: user.photoUrl
                    },
                    description: decription,
                    html: data.data.html,
                    json: data.data.json
                }))
                // storage.uploadString({
                //     str: json,
                //     // @ts-ignore
                //     folder: `private/${user.uid}/ezTable`,
                //     name: title ? title : uuid.getUuid(),
                //     extension: "json"
                // })
            }
        })
    }
    
</script>

<template>
    <div class="editor_box">
        <div class="info">
            <div class="title">
               文档名: 
                <input 
                    type="text" 
                    class="infoTitle" 
                    placeholder="表格标题"
                    v-model="data.data.title"
                /> 
            </div>
            <div class="save" @click="save">保存</div>
        </div>
        <div class="editor_contain" ref="contain">
            <div class="wangeditor">
                <Toolbar
                    class="toolbar"
                    :editor="editorRef"
                    :defaultConfig="toolbarConfig"
                    mode="default"
                    ref="toolbar"
                />
                <Editor
                    class="editor"
                    v-model="valueHtml"
                    :defaultConfig="editorConfig"
                    mode="default"
                    @onCreated="handleCreated"
                    @onChange="handleChange"
                />
            </div>
            <div class="preview" v-if="data.preview.isShow" ref="preview">
                <div 
                    class="previewHeader" 
                    :class="data.editor.isFull ? 'previewHeader0' : ''"
                >预览</div>
                <div 
                    class="previewContent ats_no_scroll_bar" 
                    v-html="data.data.html"
                ></div>
            </div>
            <div class="expend" @click="handlePreview">
                <img :src="data.preview.icons[data.preview.icon_item]" >
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .editor_box {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .info {
            width: 90%;
            height: 40px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            font-size: 16px;
            .title {
                .infoTitle {
                    width: 240px;
                    height: 32px;
                    line-height: 32px;
                    font-size: 14px;
                    padding: 0;
                    margin: 0 0 0 10px;
                    outline: none;
                    border: 1px solid #cccccc;
                    box-sizing: border-box;
                    text-indent: .8em;
                    border-radius: 4px;
                }
            }
            .save {
                width: 48px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                background: #005795;
                border-radius: 4px;
                color: #FFFFFF;
                cursor: pointer;
            }
        }
        .editor_contain {
            width: 90%;
            height: 90%;
            border: 1px solid #cccccc;
            display: flex;
            position: relative;
            .wangeditor {
                width: v-bind("data.editor.width");
                height: 100%;
                .editor {
                    height: calc(100% - v-bind("data.preview.header.height")) !important;
                    border-bottom: 1px solid #ccc;
                    scrollbar-width: none; /* firefox */
                    -ms-overflow-style: none; /* IE 10+ */
                    overflow-x: hidden;
                    overflow-y: auto;
                }   
                .editor::-webkit-scrollbar {
                    display: none; /* Chrome Safari */
                }
                .toolbar {
                    border-bottom: 1px solid #ccc;
                }
            }
            
            .preview {
                width: calc(100% - v-bind("data.editor.width"));
                height: 100%;
                border-left: 2px solid #cccccc;
                .previewHeader {
                    width: 100%;
                    height: v-bind("data.preview.header.height");
                    border-bottom: 1px solid #cccccc;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bolder;
                    font-size: 24px;
                }
                .previewHeader0 {
                    box-sizing: border-box;
                }
                .previewContent {
                    width: 100%;
                    height: calc(100% - v-bind("data.preview.header.height"));
                    padding: 10px;
                    box-sizing: border-box;
                }
            }
            .expend {
                position: absolute;
                width: 32px;
                height: 32px;
                top: 4px;
                right: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
            }
        }
    }
</style>
<style>
    .w-e-select-list {
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        overflow-x: hidden;
        overflow-y: auto;
    }
    .w-e-select-list::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .w-e-full-screen-container {
        width: v-bind("data.editor.width") !important;
    }
    .w-e-scroll {
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        overflow-x: hidden;
        overflow-y: auto;
    }
    .w-e-scroll::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }
    .ezpsy-editor-block {
        background: #2988e6;
        color: #FFFFFF;
        margin: 0 2px;
        padding: 2px 4px;
        border-radius: 4px;
        cursor: pointer;
    }
    .ezpsy-editor-singleline-block {
        
    }
</style>