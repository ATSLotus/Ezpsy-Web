import { closePopup } from '@/assets/utils/popup'
import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'

const getRouters = (): Array<Object> => {
    // @ts-ignore
    const routersOBJ = env.routers
    const routers = new Array()
    routers.push({
        path: `/`,
        name: `default`,
        component: () => import(`@/pages/index/index.vue`),
        meta: {
            title: 'Ezpsy: Index',
        } 
    })
    Object.keys(routersOBJ).forEach(key => {
        const obj = routersOBJ[key]
        obj.forEach((name: string) => {
            routers.push({
                path: `/${key}/${name}`,
                name: `${name}`,
                component: () => import(`@/pages/${key}/${name}.vue`),
                meta: {
                    title: 'Ezpsy: ' + name
                }
            })
        })
    })
    return routers
}

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    // @ts-ignore
    routes: getRouters()
})

router.beforeEach((to, from, next) => {
    closePopup()
    next()
})

router.afterEach((to, from) => {
    
})

// const oldBack = router.back

// router.back = () => {
//     // log.info(router.options.history.state)
//     // if(router.options.history.state.back) 
//     //     oldBack()
//     // else 
//     //     router.push({
//     //         path: '/index'
//     //     })
// }

export default router