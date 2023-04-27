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
                            placeholder="选择日期和开始时间" format="YYYY/MM/DD HH:mm" value-format="YYYY-MM-DD HH:mm" />
                    </div>
                    <span>To</span>
                    <div>
                        <el-time-picker v-model="valueTimePicker" size="small" style="width:6.7vw;" placeholder="结束时间"
                            format="HH:mm" value-format="HH:mm" />
                    </div>
                    <div class="searchBtn">
                        <el-button type="primary" size="small" color="#9d1d22">
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
            <el-table :data="tableData" height="71vh">
                <el-table-column prop="floor" label="楼层" />
                <el-table-column prop="district" label="区域" />
                <el-table-column prop="seat" label="座位" />
            </el-table>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import { AvailableSeatInfo } from '../../interface/availableSeatRequstInterface';
import { useAvailableSeatStore } from '../../stores/availableSeat';
const availableSeatStore = useAvailableSeatStore()
const availableSeatRequstBody: AvailableSeatInfo = {
    date: '',
    district: '',
    floor: '',
    beginTime: '',
    endTime: ''
}
const floorValue = ref('')
const districtValue = ref('')
const valueDatePicker = ref('')
const valueTimePicker = ref('')
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

const tableData = [
    {
        floor: '1楼',
        district: 'A区',
        seat: '9-5',
    },
    {
        floor: '2楼',
        district: 'B区',
        seat: '10-6',
    },
    {
        floor: '3楼',
        district: 'C区',
        seat: '3-8',
    },
    {
        floor: '4楼',
        district: 'D区',
        seat: '4-5',
    },
    {
        floor: '3楼',
        district: 'D区',
        seat: '1-8',
    },
    {
        floor: '2楼',
        district: 'C区',
        seat: '16-8',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    },
    {
        floor: '1楼',
        district: 'B区',
        seat: '19-1',
    }
]

watch([floorValue, districtValue, valueDatePicker, valueTimePicker], () => {
    //限制时间只能选择00 或 30
    if (valueDatePicker.value.slice(14) < '30') { valueDatePicker.value = valueDatePicker.value.slice(0, 14).concat('00') }
    else { valueDatePicker.value = valueDatePicker.value.slice(0, 14).concat('30') }

    if (valueTimePicker.value.slice(3) < '30') { valueTimePicker.value = valueTimePicker.value.slice(0, 3).concat('00') }
    else { valueTimePicker.value = valueTimePicker.value.slice(0, 3).concat('30') }

    availableSeatRequstBody.floor = floorValue.value.slice(0, 1);
    availableSeatRequstBody.district = districtValue.value.slice(0, 1)
    availableSeatRequstBody.date = valueDatePicker.value.slice(5, 10)
    availableSeatRequstBody.beginTime = valueDatePicker.value.slice(11,)
    availableSeatRequstBody.endTime = valueTimePicker.value
    availableSeatStore.changeAvailableSeatInfoData(availableSeatRequstBody)
})



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