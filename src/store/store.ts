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