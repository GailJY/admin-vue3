import type { RouteRecordRaw } from 'vue-router'
import LoginView from '@/views/login/index.vue'
import DashboardViews  from '@/views/dashboard/index.vue'
import { createRouter, createWebHashHistory } from 'vue-router' 
import { useAppStore } from '@/store'


const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: DashboardViews,
        name: 'dashboard'
    },
    {
        path: '/login',
        component: LoginView,
        name: 'login'
    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
    const appStore = useAppStore();
    if(!appStore.token){
        whiteList.indexOf(to.path) !== -1 ? next() : next(`login?redirect=${to.path}`);
    }

    if(appStore.token && to.path === '/login'){
        next({ name: "dashboard" });
    }

    next();
})
export default router