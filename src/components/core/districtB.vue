<template>
    <div>B区</div>
    <div class='flex'>
        <div class="seat">
            <div v-for="(table, index) in (orderedSeatData || '').slice(0, 11)" :key="index">
                <div class='flex'>
                    <div v-for="(item, index1) in (table || '').slice(0, 4)" :key="index1">
                        <el-icon @click="showSeatDetail(index + 1, index1 + 1); orderSeat = !orderSeat" class='mr-2'
                            :class="item.reserveNum ? (item.reserveNum > '2' ? 'fullOrdered' : 'notFullOrdered') : ''">
                            <UserFilled />
                        </el-icon>
                    </div>
                </div>
                <div class="table">
                    {{ index + 1 }}
                </div>
                <div class='flex'>
                    <div v-for="(item, index2) in (table || '').slice(4,)" :key="index2">
                        <el-icon @click="showSeatDetail(index + 1, index2 + 5); orderSeat = !orderSeat" class='mr-2 mb-4'
                            :class="item.reserveNum ? (item.reserveNum > '2' ? 'fullOrdered' : 'notFullOrdered') : ''">
                            <UserFilled />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>

        <el-scrollbar>
            <div class='verticalSeat'>
                <div class='flex' v-for="(table, index) in   (orderedSeatData || '').slice(11,)  " :key="index">
                    <div>
                        <div class='ml-4' v-for="(item, index3) in   (table || '').slice(0, 4)  " :key="index3">
                            <el-icon @click="showSeatDetail(index + 12, index3 + 1); orderSeat = !orderSeat" class='mr-1'
                                :class="item.reserveNum ? (item.reserveNum > '2' ? 'fullOrdered' : 'notFullOrdered') : ''">
                                <UserFilled />
                            </el-icon>
                        </div>
                    </div>
                    <div class='pt-9 pb-9 text-center verticalTable'>
                        {{ index + 12 }}
                    </div>
                    <div>
                        <div class='ml-1' v-for="(  item, index4  ) in   (table || '').slice(4,)  " :key="index4">
                            <el-icon @click="showSeatDetail(index + 12, index4 + 5); orderSeat = !orderSeat" class='mr-2'
                                :class="item.reserveNum ? (item.reserveNum > '2' ? 'fullOrdered' : 'notFullOrdered') : ''">
                                <UserFilled />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>
        <el-drawer ref="drawerRef" v-model="orderSeat" title="欢迎预约该座位!" direction="rtl" class="demo-drawer">
            <orderSeatVue></orderSeatVue>
        </el-drawer>
    </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, watch } from 'vue';
import { getThisFloorSeat } from '../../api/getThisFloorSeat'
import { useFloorAndDistrictStore } from '../../stores/floorAndDistrict';
import orderSeatVue from '../basic/orderSeat.vue';
import { storeToRefs } from 'pinia';
import showSeatDetail from '../../hooks/showSeatDetail';
let orderSeat = ref(false);
const floorAndDistrictStore = useFloorAndDistrictStore();
const { floor, orderedSeatData } = storeToRefs(floorAndDistrictStore);
onMounted(() => {
    getThisFloorSeat()
})
watch(floor, () => {
    if (floorAndDistrictStore.district === 'B') {
        getThisFloorSeat()
    }
})
</script>
<style scoped lang='less'>
.seat {
    margin-right: 2vw;

    .table {
        width: 90px;
        height: 20px;
        border: 1px solid #000;
        text-align: center;
    }
}

.verticalSeat {
    display: flex;
    margin-top: 17vh;
    height: 105px;
    width: 45vw;

    .verticalTable {
        width: 20px;
        height: 90px;
        border: 1px solid #000;
    }
}

.fullOrdered {
    color: #9d1d22;
}

.notFullOrdered {
    color: rgb(249, 192, 6);
}
</style>