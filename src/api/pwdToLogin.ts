import axios from 'axios'
import { useUserStore } from '../stores/user';
import { ElMessage } from 'element-plus'
import router from '../router';
//登录模块
const userStore = useUserStore();
export const pwdToLogin = () => {
    axios.post('/api/toLogin', {
        userName: userStore.userName,
        userPwd: userStore.userPwd
    })
        .then((res) => {
            const resMsg = res.data.msg;
            if (resMsg === "200") {
                ElMessage({
                    showClose: true,
                    message: 'Congrats,登陆成功.',
                    type: 'success',
                })
                setTimeout(() => {
                    sessionStorage.setItem('id', res.data.userId)
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