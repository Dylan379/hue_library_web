import axios from "axios";
import { ElMessage } from "element-plus";
import { AvailableSeatRequstBody } from "../interface/availableSeatRequstInterface";
import { AvailableSeatInfo } from "../interface/availableSeatInfoInterface";
import { useAvailableSeatStore } from "../stores/availableSeat";
export default function getAvailableSeatInfo() {
    const availableSeatStore = useAvailableSeatStore();
    let availableSeatRequstBody: AvailableSeatRequstBody;
    let availableSeatInfoData: AvailableSeatInfo[];
    availableSeatRequstBody = availableSeatStore.availableSeatRequstBody
    axios.post('/api/getAvailableSeats', {
        params: availableSeatRequstBody
    })
        .then((res) => {
            console.log(res.data.msg);
            if (!res.data.msg) {
                const resData = res.data;
                availableSeatInfoData = resData;
                for (let i = 0; i < resData.length; i++) {
                    availableSeatInfoData[i].floor = resData[i].floor + '楼';
                    availableSeatInfoData[i].district = resData[i].district + '区';
                    availableSeatInfoData[i].seat = resData[i].table + '-' + resData[i].ordinal;
                }
                availableSeatStore.changeAvailableSeatInfoData(availableSeatInfoData);

            } else {

                if (res.data.msg === 401) {
                    ElMessage({
                        showClose: true,
                        message: '时间间隔应大于等于2小时.',
                        duration: 5000,
                        type: 'error',
                    })
                }
                if (res.data.msg === 402) {
                    ElMessage({
                        showClose: true,
                        message: '起止时间错误.',
                        duration: 5000,
                        type: 'error',
                    })
                }
            }
        })
        .catch((res) => {
            ElMessage({
                showClose: true,
                message: 'Oops, 请检查设备网络.',
                type: 'error',
            })
            console.log(res);
        })
}

