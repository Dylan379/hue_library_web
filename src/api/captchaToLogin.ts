import axios from 'axios'
import { useUserStore } from '../stores/user';
import { ElMessage } from 'element-plus'
import router from '../router';
//验证码登录api
const userStore = useUserStore();
export const captchaToLogin = () => {
    axios.post('/api/captchaToLogin', {
        userPhoneNum: userStore.userPhoneNum,
        captchaNum: userStore.captchaNum
    })
        .then((res) => {
            let resMsg = res.data.msg;
            if (resMsg === "200") {
                setTimeout(() => {
                    sessionStorage.setItem('Id', res.data.userId)
                    router.push('/')
                }, 1000)
                ElMessage({
                    showClose: true,
                    message: 'Congrats,登陆成功.',
                    type: 'success',
                })
            }
            else {
                ElMessage({
                    showClose: true,
                    message: 'Oops, 注册登录失败.',
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