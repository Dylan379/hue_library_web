import { defineStore } from 'pinia'
import { User } from '../interface/userInterface'
let userInfo: User;
// 写法1
export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            userStuId: '',
            userPwd: '',
            userPhoneNum: '',
            captchaNum: 0,
            userInfo,
            userAvatarUrl: ''
        }
    },
    getters: {

    },
    actions: {
        changeUserInfo(userName: string, userPwd: string) {
            this.userStuId = userName;
            this.userPwd = userPwd;
        },
        changePhoneNum(userPhoneNum: string, captchaNum: number) {
            this.userPhoneNum = userPhoneNum;
            this.captchaNum = captchaNum;
        },
        updateUserInfo(userInfo: User) {
            this.userInfo = userInfo;
        },
        updataUserAvatarUrl(userAvatarUrl: string | null) {
            if (userAvatarUrl) this.userAvatarUrl = userAvatarUrl;
        }

    }
})