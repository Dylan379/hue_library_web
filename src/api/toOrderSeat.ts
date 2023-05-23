import axios from "axios";
import { ElMessage } from "element-plus";
import { OrderSeatRequestBody } from "../interface/orderSeatRequestInterface";
import { useReserveInfoStore } from "../stores/reserveInfo";
export default function toOrderSeat() {
    const reserveInfoStore = useReserveInfoStore();
    let orderSeatRequestBody: OrderSeatRequestBody;
    orderSeatRequestBody = reserveInfoStore.orderSeatRequestBody
    console.log(orderSeatRequestBody);
    axios.post('/api/toOrderSeat', {
        params: orderSeatRequestBody
    })
        .then((res) => {
            reserveInfoStore.isLoading = false;
            if (res.data.msg === 200 || res.data.msg === 201 || res.data.msg === 202) {
                ElMessage({
                    showClose: true,
                    message: '好, 预约成功.',
                    type: 'success',
                })
            } else if (res.data.msg === 400) {
                ElMessage({
                    showClose: true,
                    message: 'Oops, 该座位已达最高预约数.',
                    type: 'error',
                })
            }
            else if (res.data.msg === 401) {
                ElMessage({
                    showClose: true,
                    message: 'Oops, 时间间隔应大于2小时.',
                    type: 'error',
                })
            }
            else if (res.data.msg === 402) {
                ElMessage({
                    showClose: true,
                    message: 'Oops, 该时间段已有预约.',
                    type: 'error',
                })
            }
        })
        .catch((res) => {
            reserveInfoStore.isLoading = false;
            ElMessage({
                showClose: true,
                message: 'Oops, 请检查设备网络.',
                type: 'error',
            })
            console.log(res);
        })
}

