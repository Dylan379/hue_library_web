<template>
    <div class=''>
        <el-popover placement="bottom" :width="400" trigger="click" :hide-after="50">
            <template #reference>
                <el-button text size="large" @click="showReserveInfoData">我的预约信息</el-button>
            </template>
            <el-table :data="reserveInfoData" :stripe="true">
                <el-table-column width="60" property="floor" label="楼层" />
                <el-table-column width="60" property="district" label="区域" />
                <el-table-column width="90" property="seat" label="桌号-序号" />
                <el-table-column width="80" property="date" label="日期" />
                <el-table-column width="105" property="time" label="时间" />
            </el-table>
        </el-popover>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watch, computed } from 'vue';
import { useReserveInfoStore } from '../../stores/reserveInfo';
import { getReserveInfo } from '../../api/getReserveInfo'
import usethrottle from '../../hooks/usethrottle'
import { storeToRefs } from 'pinia';
//预约信息
//发送查询预约信息的请求
const showReserveInfoData = usethrottle(getReserveInfo, 10000)
//从对应商店中拿到保存的信息
const reserveInfoStore = useReserveInfoStore()
const { reserveInfoData } = storeToRefs(reserveInfoStore)
</script>
<style scoped lang='less'></style>