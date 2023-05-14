<template>
    <div class=''>
        <div>您选择的座位是:
            {{ floor }}&nbsp;楼&nbsp;{{ district }}&nbsp;区&nbsp;{{ table + '-' + ordinal }}
        </div>
        <br />
        <div class="bar">
            <div>请继续选择预约时间段:</div>
            <div class="fuzzyQueriesBar">
                <div>
                    <el-date-picker v-model="valueDatePicker" type="datetime" style="width: 11.5vw;" placeholder="选择日期和开始时间"
                        :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" format="YYYY/MM/DD HH:mm"
                        value-format="YYYY-MM-DD HH:mm" handleClose />
                </div>
                <span>To</span>
                <div>
                    <el-time-picker v-model="valueTimePicker" style="width:6.7vw;" placeholder="结束时间" format="HH:mm"
                        value-format="HH:mm" handleClose />
                </div>
                <div class="searchBtn">
                    <el-button :loading="isLoading" @click="orderSeat" type="primary" color="#9d1d22">
                        <el-icon>
                            <Select />
                        </el-icon>
                        确认提交
                    </el-button>
                </div>
            </div>
            <div>
                <br />
                <div>该座位拥有的预约信息为:</div>
                <el-table :data="seatReserveInfoData" :stripe="true">
                    <el-table-column width="60" property="floor" label="楼层" />
                    <el-table-column width="60" property="district" label="区域" />
                    <el-table-column width="90" property="seat" label="桌号-序号" />
                    <el-table-column width="80" property="date" label="日期" />
                    <el-table-column width="105" property="time" label="时间" />
                    <template v-slot:empty>
                        该座位没有预约信息
                    </template>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watch, computed } from 'vue';
import { useFloorAndDistrictStore } from '../../stores/floorAndDistrict';
import { OrderSeatRequestBody } from '../../interface/orderSeatRequestInterface'
import { useReserveInfoStore } from '../../stores/reserveInfo';
import getSeatReserveInfo from '../../api/getSeatReserveInfo'
import toOrderSeat from '../../api/toOrderSeat'
import usedebounce from '../../hooks/usedebounce'
import usethrottle from '../../hooks/usethrottle'
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
const floorAndDistrictStore = useFloorAndDistrictStore();
const { floor, district, table, ordinal } = storeToRefs(floorAndDistrictStore);
const valueDatePicker = ref('')
const valueTimePicker = ref()
const orderSeatRequestBody: OrderSeatRequestBody = {
    date: '',
    district: '',
    floor: '',
    table: '',
    ordinal: '',
    beginTime: '',
    endTime: ''
}

//发送预约座位的请求
function orderSeat() {
    if (orderSeatRequestBody.date != '' && orderSeatRequestBody.endTime != '' && orderSeatRequestBody.endTime != null && orderSeatRequestBody.endTime != undefined) {
        isLoading.value = true
        setTimeout(() => {
            toOrderSeat()
        }, 3000)
        console.log(orderSeatRequestBody.endTime);
    } else {
        ElMessage({
            showClose: true,
            message: 'Oops, 请输入完整信息.',
            type: 'error',
        })
    }
}
//预约信息
//发送查询预约信息的请求
const showSeatReserveInfoData = usethrottle(getSeatReserveInfo, 1000)
//从对应商店中拿到保存的信息
const reserveInfoStore = useReserveInfoStore()
const { seatReserveInfoData, isLoading } = storeToRefs(reserveInfoStore)

//设置分钟禁止范围
const makeRange = (start: number, end: number) => {
    const result: number[] = []
    for (let i = start; i <= end; i++) {
        result.push(i)
    }
    return result
}

const disabledHours = () => {
    return makeRange(0, 7).concat(makeRange(22, 23))
}


const disabledMinutes = () => {
    return makeRange(1, 29).concat(makeRange(31, 59))
}



onMounted(() => {
    showSeatReserveInfoData()
    orderSeatRequestBody.floor = floor.value;
    orderSeatRequestBody.district = district.value;
    orderSeatRequestBody.table = table.value;
    orderSeatRequestBody.ordinal = ordinal.value;
    orderSeatRequestBody.date = '';
    orderSeatRequestBody.beginTime = '';
    orderSeatRequestBody.endTime = valueTimePicker.value;
    reserveInfoStore.updateOrderSeatRequestBody(orderSeatRequestBody);
})

watch([floor, district, table, ordinal], () => {
    showSeatReserveInfoData()
})
watch([floor, district, table, ordinal, valueDatePicker, valueTimePicker], () => {
    if ((valueTimePicker.value != null) && (valueTimePicker.value.slice(3) < '30')) {
        valueTimePicker.value = valueTimePicker.value.slice(0, 3).concat('00')
    }
    else if (valueTimePicker.value != null) {
        valueTimePicker.value = valueTimePicker.value.slice(0, 3).concat('30')
    }
    if (valueDatePicker.value != null) {
        //将信息保存到仓库中
        orderSeatRequestBody.floor = floor.value;
        orderSeatRequestBody.district = district.value;
        orderSeatRequestBody.table = table.value;
        orderSeatRequestBody.ordinal = ordinal.value;
        orderSeatRequestBody.date = valueDatePicker.value.slice(5, 10);
        orderSeatRequestBody.beginTime = valueDatePicker.value.slice(11,);
        orderSeatRequestBody.endTime = valueTimePicker.value;
        reserveInfoStore.updateOrderSeatRequestBody(orderSeatRequestBody);
    } else if (valueDatePicker.value == null) {
        orderSeatRequestBody.floor = floor.value;
        orderSeatRequestBody.district = district.value;
        orderSeatRequestBody.table = table.value;
        orderSeatRequestBody.ordinal = ordinal.value;
        orderSeatRequestBody.date = '';
        orderSeatRequestBody.beginTime = '';
        orderSeatRequestBody.endTime = valueTimePicker.value;
        reserveInfoStore.updateOrderSeatRequestBody(orderSeatRequestBody);
    }
})
</script>
<style scoped lang='less'>
.bar {
    .fuzzyQueriesBar {
        display: flex;
        margin: 0.5vh 0 0.4vh 0.6vw;

        span {
            font-size: 15px;
            line-height: 32px;
        }

        .searchBtn {
            margin-left: 0.7vw;
        }
    }

    :deep(.el-input__wrapper.is-focus) {
        box-shadow: 0 0 0 1px #9d1d22 !important;
    }

    :deep(.el-time-panel__btn.confirm) {
        color: #9d1d22
    }
}
</style>