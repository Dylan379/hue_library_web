import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ReserveInfo } from "../interface/reserveInfoInterface";
import { useReserveInfoStore } from '../stores/reserveInfo';
//验证码登录api
//创建一个预约集合
let reserveInfoData: ReserveInfo[];
export const getReserveInfo = () => {
    //在函数内得到预约信息仓库,避免提前挂载报错
    const reserveInfoStore = useReserveInfoStore()
    if (sessionStorage.getItem('Id') != null) {
        axios.get('/api/getReserveInfo?userId=' + sessionStorage.getItem('Id'))
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
            type: 'warning',
        })
    }

}