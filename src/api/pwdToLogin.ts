import axios from 'axios'
import { useUserStore } from '../stores/user';
import { ElMessage } from 'element-plus'
import router from '../router';
//登录模块
const userStore = useUserStore();
export const pwdToLogin = () => {
    //http://127.0.0.1:4523/m1/2597435-0-default/api/toLogin
    //https://yapi.pro/mock/19414/api/toLogin
    axios.post('http://127.0.0.1:4523/m1/2597435-0-default/api/toLogin', {
        userName: userStore.userName,
        userPwd: userStore.userPwd
    })
        .then((res) => {
            console.log(res);

            let resMsg = res.data.msg;
            if (resMsg === "200") {
                ElMessage({
                    showClose: true,
                    message: 'Congrats,登陆成功.',
                    type: 'success',
                })
                setTimeout(() => {
                    sessionStorage.setItem('Id', res.data.userId)
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