import { Boot, IDomEditor, IToolbarConfig } from "@wangeditor/editor"
import DefaultSelect from "./default/defaultSelect"
import { insertBreak } from "./utils"
import { inputPopup } from "../utils/popup"
import uuid from "../utils/uuid"

const insertSelect = new DefaultSelect({
    title: "insert-block",
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
                            const singleline_node = {
                                type: "inline-block",
                                block: value,
                                key: res.value.key,
                                children: [{
                                    text: ""
                                }]
                            }
                            editor.insertNode(singleline_node)
                        }
                    })
                    
                    break
                case "multiline":
                    const multiline_node = {
                        type: "block",
                        block: value,
                        key: "key_test0",
                        children: [{
                            text: ""
                        }]
                    }
                    editor.insertNode(multiline_node)
                    insertBreak(editor)
                    break
                case "radio":
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