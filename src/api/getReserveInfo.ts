
//4.20任务  尽量完成得到预约信息的接口  和  预约信息mock数据编写

import axios from 'axios'
import { ElMessage } from 'element-plus'
// import router from '../router';
import { ReserveInfo } from "../interface/reserveInfoInterface";
import { useReserveInfoStore } from '../stores/reserveInfo';
//验证码登录api
// const userStore = useUserStore();
let reserveInfoData: ReserveInfo[];
export const getReserveInfo = () => {
    const reserveInfoStore = useReserveInfoStore()
    // http://127.0.0.1:4523/m1/2597435-0-default/api/captchaLogin
    // userId: sessionStorage.getItem('Id')
    if (sessionStorage.getItem('id') != 'null') {
        axios.get('/api/getReserveInfo?id=' + sessionStorage.getItem('id'))
            .then((res) => {
                const resData = res.data;
                reserveInfoData = resData;
                for (let i = 0; i < resData.length; i++) {
                    reserveInfoData[i].floor = resData[i].floor + '楼'
                    reserveInfoData[i].date = resData[i].date
                    reserveInfoData[i].district = resData[i].district + '区'
                    reserveInfoData[i].seat = resData[i].table + '-' + resData[i].ordinal;
                    reserveInfoData[i].time = resData[i].beginTime + '-' + resData[i].endTime;
                }
                reserveInfoStore.changeReserveInfoData(reserveInfoData)
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
            message: 'Oops, 忘记登陆了?.',
            type: 'error',
        })
    }

}