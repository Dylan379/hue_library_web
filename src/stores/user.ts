import { defineStore } from 'pinia'
import { User } from '../interface/userInterface'
import { ChangeUserInfoInterface } from '../interface/changeUserInfoInterface';
let userInfo: User;
const changeUserInfoData: ChangeUserInfoInterface = {
    userPwd: '',
    userPhoneNum: '',
    captcha: ''
};
// 写法1
export const useUserStore = defineStore({
    id: 'user', // id必填，且需要唯一
    state: () => {
        return {
            userStuId: '',
            userPwd: '',
            userPhoneNum: '',
            isChanging: false,
            changeUserInfoData,
            captchaNum: '',
            userInfo,
            userAvatarUrl: '',
            isShowUserInfo: false
        }
    },
    getters: {

    },
    actions: {
        changeUserInfo(userStuId: string, userPwd: string) {
            this.userStuId = userStuId;
            this.userPwd = userPwd;
        },
        changePhoneNum(userPhoneNum: string, captchaNum: string) {
            this.userPhoneNum = userPhoneNum;
            this.captchaNum = captchaNum;
        },
        updateUserInfo(userInfo: User) {
            this.userInfo = userInfo;
        },
        updataUserAvatarUrl(userAvatarUrl: string | null) {
            if (userAvatarUrl) this.userAvatarUrl = userAvatarUrl;
        },
        updateIsShowUserInfo() {
            this.isShowUserInfo = !this.isShowUserInfo;
        },
        updataChangeUserInfo(changeUserInfoData: ChangeUserInfoInterface) {
            this.changeUserInfoData = changeUserInfoData;

        }

    }
})