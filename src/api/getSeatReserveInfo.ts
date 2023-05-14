import axios from 'axios'
import { ElMessage } from 'element-plus'
import { ReserveInfo } from "../interface/reserveInfoInterface";
import { useReserveInfoStore } from '../stores/reserveInfo';
import { useFloorAndDistrictStore } from '../stores/floorAndDistrict';
import { storeToRefs } from 'pinia';
//验证码登录api
//创建一个预约集合
let seatReserveInfoData: ReserveInfo[];
export default function getSeatReserveInfo() {
    const floorAndDistrictStore = useFloorAndDistrictStore();
    const { floor, district, table, ordinal } = storeToRefs(floorAndDistrictStore);
    //在函数内得到预约信息仓库,避免提前挂载报错
    const reserveInfoStore = useReserveInfoStore()
    axios.get('/api/getSeatReserveInfo?floor=' + floor.value + '&district=' + district.value + '&table=' + table.value + '&ordinal=' + ordinal.value)
        .then((res) => {
            const resData = res.data;
            seatReserveInfoData = resData;
            for (let i = 0; i < resData.length; i++) {
                seatReserveInfoData[i].floor = resData[i].floor + '楼'
                seatReserveInfoData[i].date = resData[i].date
                seatReserveInfoData[i].district = resData[i].district + '区'
                seatReserveInfoData[i].seat = resData[i].table + '-' + resData[i].ordinal;
                seatReserveInfoData[i].time = resData[i].beginTime + '-' + resData[i].endTime;
            }
            reserveInfoStore.changeSeatReserveInfoData(seatReserveInfoData)
        })
        .catch((res) => {
            ElMessage({
                showClose: true,
                message: 'Oops, 请检查设备后重试.',
                type: 'error',
            })
            console.log(res);
        })
}