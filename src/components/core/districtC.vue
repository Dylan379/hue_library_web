<template>
    <div>C区</div>
    <div class='flex'>
        <div class="seat">
            <div v-for="(table, index) in (orderedSeatData || '').slice(0, 10)" :key="index">
                <div class='flex'>
                    <div v-for="(item, index1) in (table || '').slice(0, 4)" :key="index1">
                        <el-icon class='mr-2' :class="item.reserveNum ? 'ordered' : ''">
                            <UserFilled />
                        </el-icon>
                    </div>
                </div>
                <div class="table">
                    {{ index + 1 }}
                </div>
                <div class='flex'>
                    <div v-for="(item, index2) in (table || '').slice(4,)" :key="index2">
                        <el-icon class='mr-2 mb-4' :class="item.reserveNum ? 'ordered' : ''">
                            <UserFilled />
                        </el-icon>
                    </div>
                </div>
            </div>
        </div>
        <el-scrollbar>
            <div class='verticalSeat'>
                <div class='flex' v-for="(table, index) in   (orderedSeatData || '').slice(10,)  " :key="index">
                    <div>
                        <div class='ml-4' v-for="(item, index3) in   (table || '').slice(0, 4)  " :key="index3">
                            <el-icon class='mr-1' :class="item.reserveNum ? 'ordered' : ''">
                                <UserFilled />
                            </el-icon>
                        </div>
                    </div>
                    <div class='pt-9 pb-9 text-center verticalTable'>
                        {{ index + 11 }}
                    </div>
                    <div>
                        <div class='ml-1' v-for="(  item, index4  ) in   (table || '').slice(4,)  " :key="index4">
                            <el-icon class='mr-2' :class="item.reserveNum ? 'ordered' : ''">
                                <UserFilled />
                            </el-icon>
                        </div>
                    </div>
                </div>
            </div>
        </el-scrollbar>


    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watch, computed } from 'vue';
import { getReserveSeat } from '../../api/getReserveSeat'
import { useFloorAndDistrictStore } from '../../stores/floorAndDistrict';
import { storeToRefs } from 'pinia';
const floorAndDistrictStore = useFloorAndDistrictStore();
const { floor, orderedSeatData } = storeToRefs(floorAndDistrictStore);
onMounted(() => {
    getReserveSeat()
})
watch(floor, () => {
    if (floorAndDistrictStore.district === 'C') {
        getReserveSeat()
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
    margin-top: 15vh;
    height: 105px;
    width: 50vw;

    .verticalTable {
        width: 20px;
        height: 90px;
        border: 1px solid #000;
    }
}

.ordered {
    color: #9d1d22;
}
</style>