<template>
    <div class='flex'>
        <div class='ml-4'>
            <div><el-icon class='mr-1' id="1">
                    <User />
                </el-icon>
            </div>
            <div>
                <el-icon class='mr-1' id="2">
                    <User />
                </el-icon>
            </div>
            <div>
                <el-icon class='mr-1' id="3">
                    <User />
                </el-icon>
            </div>
            <div>
                <el-icon class='mr-1' id="4">
                    <User />
                </el-icon>
            </div>
        </div>
        <div class="table">
            <slot name="vertSeatNum"></slot>
        </div>
        <div class='flex-col'>
            <div>
                <el-icon class='ml-1' id="5">
                    <User />
                </el-icon>
            </div>
            <div>
                <el-icon class='ml-1' id="6">
                    <User />
                </el-icon>
            </div>
            <div>
                <el-icon class='ml-1' id="7">
                    <User />
                </el-icon>
            </div>
            <div>
                <el-icon class='ml-1' id="8">
                    <User />
                </el-icon>
            </div>
        </div>

    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
</script>
<style scoped lang='less'>
.table {
    width: 20px;
    height: 90px;
    border: 1px solid #000;
}
</style>