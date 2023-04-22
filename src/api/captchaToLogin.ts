import axios from 'axios'
import { useUserStore } from '../stores/user';
import { ElMessage } from 'element-plus'
import router from '../router';
//验证码登录api
const userStore = useUserStore();
export const captchaToLogin = () => {
    // http://127.0.0.1:4523/m1/2597435-0-default/api/captchaLogin
    axios.post('/api/captchaToLogin', {
        userPhoneum: userStore.userPhoneNum,
        captcha: userStore.captchaNum
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