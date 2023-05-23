import { ElMessage } from 'element-plus'
import { useReserveInfoStore } from '../stores/reserveInfo';
import { storeToRefs } from 'pinia';

export default function checkTimeRange(fn: Function) {
    const reserveInfoStore = useReserveInfoStore();
    const { orderSeatRequestBody, isLoading } = storeToRefs(reserveInfoStore)
    function _checkTimeRange(this: any, ...args: any[]) {
        if (orderSeatRequestBody.value.beginTime.length != 0 && (orderSeatRequestBody.value.endTime) != null) {
            if ((orderSeatRequestBody.value.beginTime.slice(3,) === '00') || (orderSeatRequestBody.value.beginTime.slice(3,) === '30')) {
                if ((orderSeatRequestBody.value.endTime.slice(3,) === '00') || (orderSeatRequestBody.value.endTime.slice(3,) === '30')) {
                    fn.apply(this, args)
                }
            }
            else {
                ElMessage({
                    showClose: true,
                    message: "注意!起止时间应同时选择并以'00'或'30'结尾",
                    type: 'error',
                    duration: 5000,
                    center: true
                })
                isLoading.value = false;
            }
        }
        else {
            ElMessage({
                showClose: true,
                message: "注意!起止时间应同时选择并以'00'或'30'结尾",
                type: 'error',
                duration: 5000,
                center: true
            })
            isLoading.value = false;
        }

    }
    return _checkTimeRange
}

