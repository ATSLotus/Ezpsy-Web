import { defineStore } from 'pinia'
import { createRouter } from 'vue-router'

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