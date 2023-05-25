import axios from 'axios'
import { ElMessage } from 'element-plus'
import { User } from "../interface/userInterface";
import { useUserStore } from '../stores/user';
//验证码登录api
//创建一个预约集合
export default function getUserInfo() {
    //在函数内得到预约信息仓库,避免提前挂载报错
    const userStore = useUserStore()
    if (sessionStorage.getItem('Id') != null) {
        axios.get('/api/getUserInfo?userId=' + sessionStorage.getItem('Id'))
            .then((res) => {
                const userInfo = res.data;
                userStore.updateUserInfo(userInfo)
                sessionStorage.setItem('userAvatarUrl', userInfo.userAvatarUrl)
            })
            .catch((res) => {
                ElMessage({
                    showClose: true,
                    message: 'Oops, 请检查设备后重试.',
                    type: 'error',
                })
                console.log(res);
            })
    } else {
        ElMessage({
            showClose: true,
            message: 'Oops, 还未登录.',
            type: 'error',
        })
        return false
    }

}