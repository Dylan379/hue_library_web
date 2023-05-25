import { defineStore } from 'pinia'
// 写法1
export const useLoginStore = defineStore({
    id: 'login', // id必填，且需要唯一

    state: () => {
        return {
            showLogin: false,
            isRegist: true,
            loginWay: '',
            isLogin: true
        }
    },
    getters: {

    },
    actions: {
        updateShowLogin<T>(showLogin: T) {
            this.showLogin = !showLogin
        }
    }
})