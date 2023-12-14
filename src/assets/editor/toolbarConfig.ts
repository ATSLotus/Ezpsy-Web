import { Boot, IDomEditor, IToolbarConfig } from "@wangeditor/editor"
import DefaultSelect from "./default/defaultSelect"
import { insertBreak } from "./utils"
import { inputPopup, tipPopup } from "../utils/popup"
import uuid from "../utils/uuid"
import { EditorKeyStore } from "@/store/store"
import { stringToBase64 } from "../utils/utils"

const nonce = uuid.getUuid()
const key_store = EditorKeyStore()

const insertSelect = new DefaultSelect({
    title: "insert-block" + nonce,
    width: 80,
    options: [
        { value: "block", text: "模块", styleForRenderMenuList: { display: "none" } },
        { value: "singleline", text: "单行输入" },
        { value: "multiline", text: "多行输入" },
        { value: "radio", text: "单选" },
        { value: "checkbox", text: "多选" }
    ],
    classFunctions: {
        exec: (editor: IDomEditor, value: string | boolean) => {
            key_store.update(editor)
            switch(value) {
                case "singleline":
                    inputPopup({
                        title: "请配置信息",
                        html: [
                            {
                                type: "input",
                                props: {
                                    title: "关键词",
                                    placeholder: "关键词",
                                    tips: "关键词指代实际使用中，用于存储数据时标识数据，请使用字母、数字或下划线(_)且以字母或下划线开头",
                                    reg: /^[a-zA-Z_][0-9a-zA-Z_]*$/
                                }
                            }
                        ],
                        preConfirm: (getValue) => {
                            return () => {
                                const res = getValue()
                                return {
                                    key: res[0] as string
                                }
                            }
                        }
                    }).then(res => {
                        if(res.isConfirmed) {
                            const key = res.value.key
                            if(key_store.validate(key)) {
                                tipPopup("error", {
                                    title: "关键词重复",
                                    tips: `您使用的关键词 <span style="color: red;">${key}</span> 存在重复，请核对您的关键词`,
                                    closeTip: "点击空白处关闭"
                                })
                            } else {
                                const singleline_node = {
                                    type: "inline-block",
                                    block: value,
                                    key: key,
                                    children: [{
                                        text: ""
                                    }]
                                }
                                editor.insertNode(singleline_node)
                            }
                        }
                    })
                    break
                case "multiline":
                    inputPopup({
                        title: "请配置信息",
                        html: [
                            {
                                type: "input",
                                props: {
                                    title: "关键词",
                                    placeholder: "关键词",
                                    tips: "关键词指代实际使用中，用于存储数据时标识数据，请使用字母、数字或下划线(_)且以字母或下划线开头",
                                    reg: /^[a-zA-Z_][0-9a-zA-Z_]*$/
                                }
                            }
                        ],
                        preConfirm: (getValue) => {
                            return () => {
                                const res = getValue()
                                return {
                                    key: res[0] as string
                                }
                            }
                        }
                    }).then(res => {
                        if(res.isConfirmed) {
                            const key = res.value.key
                            if(key_store.validate(key)) {
                                tipPopup("error", {
                                    title: "关键词重复",
                                    tips: `您使用的关键词 <span style="color: red;">${key}</span> 存在重复，请核对您的关键词`,
                                    closeTip: "点击空白处关闭"
                                })
                            } else {
                                const multiline_node = {
                                    type: "block",
                                    block: value,
                                    key: key,
                                    children: [{
                                        text: ""
                                    }]
                                }
                                editor.insertNode(multiline_node)
                                insertBreak(editor)
                            }
                        }
                    })
                    break
                case "radio":
                    inputPopup({
                        title: "请配置信息",
                        html: [
                            {
                                type: "input",
                                props: {
                                    title: "关键词",
                                    placeholder: "关键词",
                                    tips: "关键词指代实际使用中，用于存储数据时标识数据，请使用字母、数字或下划线(_)且以字母或下划线开头",
                                    reg: /^[a-zA-Z_][0-9a-zA-Z_]*$/
                                }
                            },
                            {
                                type: "input",
                                props: {
                                    title: "标题",
                                    placeholder: "标题",
                                    require: true
                                }
                            },
                            {
                                type: "option",
                                props: {
                                    title: "选项"
                                }
                            }
                        ],
                        preConfirm: (getValue) => {
                            return () => {
                                const res = getValue()
                                return {
                                    key: res[0] as string,
                                    title: res[1] as string,
                                    options: res[2] as string
                                }
                            }
                        }
                    }).then(res => {
                        if(res.isConfirmed) {
                            const key = res.value.key
                            if(key_store.validate(key)) {
                                tipPopup("error", {
                                    title: "关键词重复",
                                    tips: `您使用的关键词 <span style="color: red;">${key}</span> 存在重复，请核对您的关键词`,
                                    closeTip: "点击空白处关闭"
                                })
                            } else {
                                const title = res.value.title
                                const options = res.value.options 
                                const multiline_node = {
                                    type: "block",
                                    block: value,
                                    value: stringToBase64(JSON.stringify({
                                        title: title,
                                        options: options
                                    })),
                                    key: key,
                                    children: [{
                                        text: ""
                                    }]
                                }
                                editor.insertNode(multiline_node)
                                insertBreak(editor)
                            }
                        }
                    })
                    break
                case "checkbox":
                    break
                default:
                    break
            }
        }
    } 
})

const insertSelectConf = {
    key: insertSelect.title,
    factory() {
        return insertSelect
    }
}

Boot.registerMenu(insertSelectConf)

const toolbarConfig: Partial<IToolbarConfig> = {
    excludeKeys: [
        "blockquote",
        "todo",
        "group-image",
        "group-video",
        "emotion",
        "insertLink",
        "code",
        "codeBlock",
        "|"
    ],
    insertKeys: {
        index: 30,
        keys: [
            insertSelect.title 
        ]
    }
}

export default toolbarConfig