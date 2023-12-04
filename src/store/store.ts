import { defineStore } from 'pinia'
import { createRouter } from 'vue-router'
import { IDomEditor } from "@wangeditor/editor"
import { BlockElementWithId } from '@/assets/editor/interface'

interface MENU {
    key: string,
    title: string,
    icon: string,
    isSelected: boolean,
    component: any
}

export const EzpsyMenuStore = defineStore({
    id: 'ezpsy-menus',
    state: () => ({
        ezpsy_menus: new Array<MENU>()
    }),
    getters: {
        getEzpsyMenu: (state) => state.ezpsy_menus,
    },
    actions: {
        set(menus: Array<MENU>) {
            this.ezpsy_menus = menus
        }
    }
})

export const ScriptsStore = defineStore({
    id: "script",
    state: () => ({
        scripts: new Set<HTMLScriptElement>()
    }),
    getters: {
        getScripts: (state) => state.scripts
    },
    actions: {
        set(script: HTMLScriptElement) {
            this.scripts.add(script)
        }
    }
})

export const UserStore = defineStore({
    id: "user",
    state: () => ({
        user: new Object()
    }),
    getters: {
        getUser: (state) => state.user
    },
    actions: {
        set(user: Object) {
            this.user = user
            // @ts-ignore
            window.localStorage.setItem("userId", user?.uid)
        }
    }
})

export const EditorKeyStore = defineStore({
    id: "editor_key",
    state: () => ({
        keys: new Map<string, "singleline" | "multiline" | "radio" | "checkbox">()
    }),
    getters: {
        getKeys: (state) => state.keys
    },
    actions: {
        update(editor: IDomEditor) {
            const blocks = editor.getElemsByType("block") as BlockElementWithId[]
            const inline_blocks = editor.getElemsByType("inline-block") as BlockElementWithId[]
            this.keys.clear()
            blocks.forEach(block => {
                this.keys.set(block.key, block.block)
            })
            inline_blocks.forEach(block => {
                this.keys.set(block.key, block.block)
            })
        },
        validate(key: string) {
            return this.keys.has(key)
        }
    }
})