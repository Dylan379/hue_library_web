import { createRouter, createWebHistory } from "vue-router";
import Layout from '../layout/index.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            component: Layout,
            path: '/',
            children: [
                {
                    path: '/login',
                    components: {
                        login: () => import('../components/core/login.vue')
                    },
                    // children: [
                    //     {
                    //         path: '/login/regist',
                    //         components: {
                    //             regist: () => import('../components/core/register.vue')
                    //         }
                    //     }
                    // ],
                },
                // {
                //     path: '/login/regist',
                //     components: {
                //         regist: () => import('../components/core/register.vue')
                //     }
                // }
            ]
        }
    ]
})

export default router;