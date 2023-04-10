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
</script>
<style scoped lang='less'>
.table {
    width: 90px;
    height: 20px;
    border: 1px solid #000;
}
</style>