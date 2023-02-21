import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import store from '@/store'
const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/itemMusic',
        name: 'ItemMusic',
        component: () =>
            import ( /* webpackChunkName: "ItemMusic" */ '../views/ItemMusic.vue')
    },
    {
        path: '/search',
        name: 'Search',
        component: () =>
            import ( /* webpackChunkName: "Search" */ '../views/Search.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "Login" */ '../views/Login.vue')
    },
    {
        path: '/my',
        name: 'MyInfo',
        beforeEnter: (to, from, next) => {
            if (store.state.isLogin) {
                next()
            } else {
                next('/login')
            }
        },
        component: () =>
            import ( /* webpackChunkName: "Login" */ '../views/MyInfo.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach((to, from, next) => {
    // to and from are both route objects. must call `next`.
    if (to.path == '/login') {
        store.state.isFooterShow = false
        next()
    } else {
        store.state.isFooterShow = true
        next()
    }
})
export default router