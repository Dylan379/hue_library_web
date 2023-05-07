<template>
    <div>A区</div>
    <div class='flex'>
        <div>
            <div class='' v-for="table in tables" :key="table">
                <seat>
                    <template v-slot:seatNum>
                        <div class='text-center'>
                            {{ table }}
                        </div>
                    </template>
                </seat>
            </div>
        </div>
        <div class='verticalSeat  mt-28 ml-7'>
            <el-scrollbar>
                <div class='flex'>
                    <div v-for="vertTable in verticalTables" :key="vertTable + tables">
                        <verticalSeat>
                            <template v-slot:vertSeatNum>
                                <div class='pt-9 pb-9 text-center'>
                                    {{ vertTable + tables }}
                                </div>
                            </template>
                        </verticalSeat>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, watch } from 'vue';
import seat from '../basic/seat.vue';
import verticalSeat from '../basic/verticalSeat.vue';
import { getReserveSeat } from '../../api/getReserveSeat';
import { useFloorAndDistrictStore } from '../../stores/floorAndDistrict';
import { storeToRefs } from 'pinia';
const floorAndDistrictStore = useFloorAndDistrictStore();
const { floor } = storeToRefs(floorAndDistrictStore);
const tables = 10;
const verticalTables = 4
onMounted(() => {
    getReserveSeat()
})
watch(floor, () => {
    if (floorAndDistrictStore.district === 'A') {
        getReserveSeat()
    }
})
</script>
<style scoped lang='less'>
.verticalSeat {
    height: 105px;
    width: 50vw;
}
</style>