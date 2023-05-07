
import { ElMessage } from 'element-plus'
import { useAvailableSeatStore } from '../stores/availableSeat';
import { storeToRefs } from 'pinia';

export default function checkTimeRange(fn: Function) {
    const availableSeatStore = useAvailableSeatStore();
    const { availableSeatRequstBody } = storeToRefs(availableSeatStore)
    function _checkTimeRange(this: any, ...args: any[]) {
        if (availableSeatRequstBody.value.beginTime === '' && availableSeatRequstBody.value.endTime === '') {
            fn.apply(this, args)
        } else if (availableSeatRequstBody.value.beginTime === '' && availableSeatRequstBody.value.endTime === undefined) {
            fn.apply(this, args)
        }
        else if (availableSeatRequstBody.value.beginTime === '' && availableSeatRequstBody.value.endTime === null) {
            fn.apply(this, args)
        }
        else if (availableSeatRequstBody.value.beginTime.length != 0 && (availableSeatRequstBody.value.endTime) != null) {
            if ((availableSeatRequstBody.value.beginTime.slice(3,) === '00') || (availableSeatRequstBody.value.beginTime.slice(3,) === '30')) {
                if ((availableSeatRequstBody.value.endTime.slice(3,) === '00') || (availableSeatRequstBody.value.endTime.slice(3,) === '30')) {
                    fn.apply(this, args)
                }
            }
            else {
                ElMessage({
                    showClose: true,
                    message: "注意!起止时间应同时为空,或同时选择并以'00'或'30'结尾",
                    type: 'error',
                    duration: 5000,
                    center: true
                })
            }
        }
        else {
            ElMessage({
                showClose: true,
                message: "注意!起止时间应同时为空,或同时选择并以'00'或'30'结尾",
                type: 'error',
                duration: 5000,
                center: true
            })
        }

    }
    return _checkTimeRange
}

