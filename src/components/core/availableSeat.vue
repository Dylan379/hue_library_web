<template>
    <div class="rightSide">
        <div>
            <div class="bar1">
                <div class="fuzzyQueriesBar1">
                    <div>
                        <el-select v-model="floorValue" size="small" clearable placeholder="选择楼层" popper-class="selectFrom">
                            <el-option v-for="item in floorOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                    <div>
                        <el-select v-model="districtValue" size="small" clearable placeholder="选择区域"
                            popper-class="selectFrom">
                            <el-option v-for="item in districtOptions" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="bar2">
                <div class="fuzzyQueriesBar2">
                    <div>
                        <el-date-picker v-model="valueDatePicker" size="small" type="datetime" style="width: 11.5vw;"
                            placeholder="选择日期和开始时间" format="YYYY/MM/DD HH:mm" value-format="YYYY-MM-DD HH:mm"
                            :disabled-hours="disabledHours" :disabled-minutes="disabledMinutes" handleClose />
                    </div>
                    <span>To</span>
                    <div>
                        <el-time-picker v-model="valueTimePicker" size="small" style="width:6.7vw;" placeholder="结束时间"
                            format="HH:mm" value-format="HH:mm" handleClose />
                    </div>
                    <div class="searchBtn">
                        <el-button @click="useDebounceToGetAvailableSeatInfoData" type="primary" size="small"
                            color="#9d1d22">
                            <el-icon>
                                <Search />
                            </el-icon>
                            查找
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <el-table :data="availableSeatInfoData" height="71vh">
                <el-table-column prop="floor" label="楼层" />
                <el-table-column prop="district" label="区域" />
                <el-table-column prop="seat" label="座位" />
            </el-table>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import { AvailableSeatRequstBody } from '../../interface/availableSeatRequstInterface';
import { useAvailableSeatStore } from '../../stores/availableSeat';
import getAvailableSeatInfo from '../../api/getAvailableSeats';
import useCheckTimeRange from "../../hooks/useCheckTimeRange"
import usethrottle from '../../hooks/usethrottle'
import { storeToRefs } from 'pinia';
const availableSeatStore = useAvailableSeatStore()
const availableSeatRequstBody: AvailableSeatRequstBody = {
    date: '',
    district: '',
    floor: '',
    beginTime: '',
    endTime: ''
}
const floorValue = ref('')
const districtValue = ref('')
const valueDatePicker = ref('')
const valueTimePicker = ref()
const floorOptions = [
    {
        value: '1F',
        label: '1F',
    },
    {
        value: '2F',
        label: '2F',
    },
    {
        value: '3F',
        label: '3F',
    },
    {
        value: '4F',
        label: '4F',
    }
]
const districtOptions = [
    {
        value: 'A区',
        label: 'A区',
    },
    {
        value: 'B区',
        label: 'B区',
    },
    {
        value: 'C区',
        label: 'C区',
    },
    {
        value: 'D区',
        label: 'D区',
    }
]

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
    availableSeatRequstBody.floor = "";
    availableSeatRequstBody.district = ""
    availableSeatRequstBody.date = ""
    availableSeatRequstBody.beginTime = ""
    availableSeatRequstBody.endTime = ""
    availableSeatStore.changeAvailableSeatRequstBody(availableSeatRequstBody)
})

watch([floorValue, districtValue, valueDatePicker, valueTimePicker], () => {
    if ((valueTimePicker.value != null) && (valueTimePicker.value.slice(3) < '30')) {
        valueTimePicker.value = valueTimePicker.value.slice(0, 3).concat('00')
    }
    else if (valueTimePicker.value != null) {
        valueTimePicker.value = valueTimePicker.value.slice(0, 3).concat('30')
    }
    if (valueDatePicker.value != null) {
        //将信息保存到仓库中
        availableSeatRequstBody.floor = floorValue.value.slice(0, 1);
        availableSeatRequstBody.district = districtValue.value.slice(0, 1)
        availableSeatRequstBody.date = valueDatePicker.value.slice(5, 10)
        availableSeatRequstBody.beginTime = valueDatePicker.value.slice(11,)
        availableSeatRequstBody.endTime = valueTimePicker.value
        availableSeatStore.changeAvailableSeatRequstBody(availableSeatRequstBody)
    } else if (valueDatePicker.value == null) {
        availableSeatRequstBody.floor = floorValue.value.slice(0, 1);
        availableSeatRequstBody.district = districtValue.value.slice(0, 1)
        availableSeatRequstBody.date = ''
        availableSeatRequstBody.beginTime = ''
        availableSeatRequstBody.endTime = valueTimePicker.value
        availableSeatStore.changeAvailableSeatRequstBody(availableSeatRequstBody)
    }
})

//从仓库中拿到保存的信息
const getAvailableSeatInfoData = useCheckTimeRange(getAvailableSeatInfo)
const useDebounceToGetAvailableSeatInfoData = usethrottle(getAvailableSeatInfoData, 3000)
const { availableSeatInfoData } = storeToRefs(availableSeatStore)

</script>
<style scoped lang='less'>
//搞搞样式

.rightSide {
    .bar1 {
        .fuzzyQueriesBar1 {
            display: flex;
            margin-top: 0.5vw;
            justify-content: space-around;
        }

        :deep(.el-select .el-input__wrapper.is-focus) {
            box-shadow: 0 0 0 1px #9d1d22 !important;

        }

        :deep(.el-select .el-input.is-focus .el-input__wrapper) {
            box-shadow: 0 0 0 1px #9d1d22 !important;
        }

    }

    .bar2 {
        .fuzzyQueriesBar2 {
            display: flex;
            margin: 0.5vh 0 0.4vh 0.6vw;

            span {
                font-size: 5px;
                line-height: 25px;
                margin-right: 0.2vw;
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
}

.selectFrom {
    .el-select-dropdown__item.selected {
        color: #9d1d22;
    }
}
</style>