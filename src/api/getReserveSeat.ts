import axios from 'axios'
import { ElMessage } from 'element-plus'
import { OrderedSeat } from '../interface/reserveSeatDBTInterface';
import { useFloorAndDistrictStore } from '../stores/floorAndDistrict';
//验证码登录api
//创建一个预约集合
let orderedSeatData: OrderedSeat[][];
export const getReserveSeat = () => {
    //在函数内得到预约信息仓库,避免提前挂载报错
    // const reserveInfoStore = useReserveInfoStore();
    const floorAndDistrictStore = useFloorAndDistrictStore();
    axios.post('/api/getReserveSeat', {
        floor: floorAndDistrictStore.floor,
        district: floorAndDistrictStore.district
    })
        .then((res) => {
            const resData = res.data;
            orderedSeatData = resData;
            //更新仓库信息
            floorAndDistrictStore.upDateOrderedSeatDataData(orderedSeatData)
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