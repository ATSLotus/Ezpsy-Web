import { Boot, IDomEditor, IToolbarConfig } from "@wangeditor/editor"
import DefaultSelect from "./default/defaultSelect"

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
            const node = {
                type: "block",
                block: value,
                key: "key_test",
                value: "test",
                children: [{
                    text: ""
                }]
            }
            editor.insertNode(node)
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