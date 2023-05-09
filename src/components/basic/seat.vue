<template>
    <div>
        <div>
            <el-icon class='mr-2' id="1">
                <User />
            </el-icon>
            <el-icon class='mr-2' id="2">
                <User />
            </el-icon>
            <el-icon class='mr-2' id="3">
                <User />
            </el-icon>
            <el-icon id="4">
                <User />
            </el-icon>
        </div>
        <div class="table">
            <slot name="seatNum"></slot>
        </div>
        <div>
            <el-icon class='mr-2 mb-3' id="5">
                <User />
            </el-icon>
            <el-icon class='mr-2 mb-3' id="6">
                <User />
            </el-icon>
            <el-icon class='mr-2 mb-3' id="7">
                <User />
            </el-icon>
            <el-icon class='mb-3' id="8">
                <User />
            </el-icon>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { useFloorAndDistrictStore } from '../../stores/floorAndDistrict';
import { storeToRefs } from 'pinia';
const floorAndDistrictStore = useFloorAndDistrictStore();
const { floor, orderedSeatData } = storeToRefs(floorAndDistrictStore);
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
    margin-top: 16vh;
    height: 105px;
    width: 45vw;

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