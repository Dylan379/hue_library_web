<template>
    <form action="" class='border-2 border-solid rounded-md border-gray-200 mx-20'>
        <div class='flex-col'>
            <div class='flex h-14 pl-4 py-4 pr-2 '>
                <div style="line-height: 24px; font-size: 14px;">账号</div>
                <input class='focus:outline-none w-3/4 ml-2 text-sm' placeholder="请输入账号">
            </div>
            <div class='h-0 w-full border-b-2 border-solid  border-gray-200'></div>
            <div class='flex pl-4 py-4 pr-2 h-14'>
                <div style="line-height: 24px; font-size: 14px;">密码</div>
                <input type="password" class='focus:outline-none w-3/4 ml-2 text-sm' placeholder="请输入密码">
            </div>
        </div>
    </form>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
</script>
<style scoped lang='less'></style>