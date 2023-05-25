import axios from 'axios'
import { useUserStore } from '../stores/user';
import { ElMessage } from 'element-plus'
import router from '../router';
import { User } from '../interface/userInterface';
//登录模块
const userStore = useUserStore();
export const pwdToLogin = () => {
    axios.post('/api/toLogin', {
        userStuId: userStore.userStuId,
        userPwd: userStore.userPwd
    })
        .then((res) => {
            const resMsg = res.data.msg;
            if (resMsg === "200") {
                sessionStorage.setItem('Id', res.data.userId)
                sessionStorage.setItem('userAvatarUrl', res.data.userAvatarUrl)
                ElMessage({
                    showClose: true,
                    message: 'Congrats,登陆成功.',
                    type: 'success',
                })
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            } else if (resMsg === '201') {
                ElMessage({
                    showClose: true,
                    message: ':(,账户不存在.',
                    type: 'warning',
                })
            } else if (resMsg === '202') {
                ElMessage({
                    showClose: true,
                    message: ':(,密码错误.',
                    type: 'warning',
                })
            }
            else {
                ElMessage({
                    showClose: true,
                    message: 'Oops, 登陆失败.',
                    type: 'error',
                })
            }
        })
        .catch(() => {
            ElMessage({
                showClose: true,
                message: 'Oops, 请检查设备后重试.',
                type: 'error',
            })
        })
}