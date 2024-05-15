import { IDomEditor } from "@wangeditor/editor";
import { inputPopup, tipPopup } from "../utils/popup";
import { EditorKeyStore } from "@/store/store";
import { block_type } from "./interface";
import { decrypt, encrypt } from "../utils/crypto";

const key_store = EditorKeyStore()

export const insertBreak = (editor: IDomEditor) => {
    const node = {
        type: "paragraph",
        children: [
            {
                text: ""
            }
        ]
    }
    editor.insertNode(node)
}

export const insertBlock = (editor: IDomEditor, block: block_type, default_opt?: {
    value?: string
    key?: string
    isSkip?: boolean,
    selection?: any
}) => {
    key_store.update(editor)
    let value = null
    let key = ""
    let skip = false
    if(default_opt) {
        key = default_opt?.key ? default_opt.key : ""
        if(default_opt?.value) {
            value = JSON.parse(decrypt(default_opt.value))
        }
        skip = default_opt?.isSkip ? default_opt.isSkip : false
    }
    switch (block) {
        case "singleline":
            inputPopup({
                title: "请配置单行输入框信息",
                html: [
                    {
                        type: "input",
                        props: {
                            title: "关键词",
                            placeholder: "关键词",
                            tips: "关键词指代实际使用中，用于存储数据时标识数据，请使用字母、数字或下划线(_)且以字母或下划线开头",
                            reg: /^[a-zA-Z_][0-9a-zA-Z_]*$/,
                            default: key
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
                if (res.isConfirmed) {
                    const key = res.value.key
                    if (key_store.validate(key) && !skip) {
                        tipPopup("error", {
                            title: "关键词重复",
                            tips: `您使用的关键词 <span style="color: red;">${key}</span> 存在重复，请核对您的关键词`,
                            closeTip: "点击空白处关闭"
                        })
                    } else {
                        const singleline_node = {
                            type: "inline-block",
                            block: block,
                            key: key,
                            children: [{
                                text: ""
                            }]
                        }
                        if(skip) {
                            let selection = default_opt?.selection
                            editor.focus()
                            editor.select(selection)
                            editor.deleteBackward("character")
                        }
                        editor.insertNode(singleline_node)
                    }
                }
            })
            break
        case "multiline":
            inputPopup({
                title: "请配置多行输入框信息",
                html: [
                    {
                        type: "input",
                        props: {
                            title: "关键词",
                            placeholder: "关键词",
                            tips: "关键词指代实际使用中，用于存储数据时标识数据，请使用字母、数字或下划线(_)且以字母或下划线开头",
                            reg: /^[a-zA-Z_][0-9a-zA-Z_]*$/,
                            default: key
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
                if (res.isConfirmed) {
                    const key = res.value.key
                    if (key_store.validate(key) && !skip) {
                        tipPopup("error", {
                            title: "关键词重复",
                            tips: `您使用的关键词 <span style="color: red;">${key}</span> 存在重复，请核对您的关键词`,
                            closeTip: "点击空白处关闭"
                        })
                    } else {
                        const multiline_node = {
                            type: "block",
                            block: block,
                            key: key,
                            children: [{
                                text: ""
                            }]
                        }
                        if(skip) {
                            let selection = default_opt?.selection
                            editor.focus()
                            editor.select(selection)
                            editor.deleteBackward("character")
                            editor.deleteBackward("character")
                        }
                        editor.insertNode(multiline_node)
                        insertBreak(editor)
                    }
                }
            })
            break
        case "radio":
            inputPopup({
                title: "请配置单选项信息",
                html: [
                    {
                        type: "input",
                        props: {
                            title: "关键词",
                            placeholder: "关键词",
                            tips: "关键词指代实际使用中，用于存储数据时标识数据，请使用字母、数字或下划线(_)且以字母或下划线开头",
                            reg: /^[a-zA-Z_][0-9a-zA-Z_]*$/,
                            default: key
                        }
                    },
                    {
                        type: "input",
                        props: {
                            title: "标题",
                            placeholder: "标题",
                            require: true,
                            default: value?.title
                        }
                    },
                    {
                        type: "option",
                        props: {
                            title: "选项",
                            default: value?.options
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
                if (res.isConfirmed) {
                    const key = res.value.key
                    if (key_store.validate(key) && !skip) {
                        tipPopup("error", {
                            title: "关键词重复",
                            tips: `您使用的关键词 <span style="color: red;">${key}</span> 存在重复，请核对您的关键词`,
                            closeTip: "点击空白处关闭"
                        })
                    } else {
                        const title = res.value.title
                        const options = JSON.parse(res.value.options)
                        const multiline_node = {
                            type: "block",
                            block: block,
                            value: encrypt(JSON.stringify({
                                title: title,
                                options: options
                            })),
                            key: key,
                            children: [{
                                text: ""
                            }]
                        }
                        if(skip) {
                            let selection = default_opt?.selection
                            editor.focus()
                            editor.select(selection)
                            editor.deleteBackward("character")
                            editor.deleteBackward("character")
                        }
                        editor.insertNode(multiline_node)
                        insertBreak(editor)
                    }
                }
            })
            break
        case "checkbox":
            inputPopup({
                title: "请配置多选项信息",
                html: [
                    {
                        type: "input",
                        props: {
                            title: "关键词",
                            placeholder: "关键词",
                            tips: "关键词指代实际使用中，用于存储数据时标识数据，请使用字母、数字或下划线(_)且以字母或下划线开头",
                            reg: /^[a-zA-Z_][0-9a-zA-Z_]*$/,
                            default: key
                        }
                    },
                    {
                        type: "input",
                        props: {
                            title: "标题",
                            placeholder: "标题",
                            require: true,
                            default: value?.title
                        }
                    },
                    {
                        type: "option",
                        props: {
                            title: "选项",
                            isMulti: true,
                            default: value?.options
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
                if (res.isConfirmed) {
                    const key = res.value.key
                    if (key_store.validate(key) && !skip) {
                        tipPopup("error", {
                            title: "关键词重复",
                            tips: `您使用的关键词 <span style="color: red;">${key}</span> 存在重复，请核对您的关键词`,
                            closeTip: "点击空白处关闭"
                        })
                    } else {
                        const title = res.value.title
                        const options = JSON.parse(res.value.options)
                        const multiline_node = {
                            type: "block",
                            block: block,
                            value: encrypt(JSON.stringify({
                                title: title,
                                options: options
                            })),
                            key: key,
                            children: [{
                                text: ""
                            }]
                        }
                        if(skip) {
                            let selection = default_opt?.selection
                            editor.focus()
                            editor.select(selection)
                            editor.deleteBackward("character")
                            editor.deleteBackward("character")
                        }
                        editor.insertNode(multiline_node)
                        insertBreak(editor)
                    }
                }
            })
            break
        default:
            break
    }
}