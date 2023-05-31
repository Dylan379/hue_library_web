import axios from "axios";
import { ElMessage } from "element-plus";
import { useUserStore } from "../stores/user";
import { ChangeUserPwdInterface } from "../interface/changeUserInfoInterface";
export default function changeUserPwd() {
    const userStore = useUserStore();
    const params: ChangeUserPwdInterface = userStore.changeUserInfoData;
    console.log(params);
    axios.post('/api/changeUserPwd', {
        params
    })
        .then((res) => {
            userStore.isChanging = false;
            if (res.data.msg === 200 || res.data.msg === 201 || res.data.msg === 202) {
                ElMessage({
                    showClose: true,
                    message: '好, 修改成功.',
                    type: 'success',
                })
            } else if (res.data.msg === 400) {
                ElMessage({
                    showClose: true,
                    message: 'Oops, 修改失败.',
                    type: 'error',
                })
            }
            else if (res.data.msg === 401) {
                ElMessage({
                    showClose: true,
                    message: 'Oops,验证码错误.',
                    type: 'error',
                })
            }
            else if (res.data.msg === 402) {
                ElMessage({
                    showClose: true,
                    message: 'Oops, 修改频率过快.',
                    type: 'error',
                })
            }
        })
        .catch((res) => {
            userStore.isChanging = false;
            ElMessage({
                showClose: true,
                message: 'Oops, 请检查设备网络.',
                type: 'error',
            })
            console.log(res);
        })
}

