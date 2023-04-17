import { defineStore } from 'pinia'
// 写法1
export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            userName: '',
            userPwd: '',
            userPhoneNum: '',
            captchaNum: 0
        }
    },
    getters: {

    },
    actions: {
        changeUserInfo(userName: string, userPwd: string) {
            this.userName = userName
            this.userPwd = userPwd
        },
        changePhoneNum(userPhoneNum: string, captchaNum: number) {
            this.userPhoneNum = userPhoneNum
            this.captchaNum = captchaNum
        }

    }
})