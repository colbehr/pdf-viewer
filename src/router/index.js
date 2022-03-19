import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import PickerView from '../views/PickerView.vue'
import ViewerView from '../views/ViewerView.vue'

const routes = [{
        path: '/',
        alias: '/home',
        name: 'picker',
        component: PickerView
    },
    {
        path: '/View',
        name: 'View',
        component: ViewerView
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () =>
            // import ( /* webpackChunkName: "about" */ '../views/ViewerView.vue')
    }

]

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
    routes
})

export default router