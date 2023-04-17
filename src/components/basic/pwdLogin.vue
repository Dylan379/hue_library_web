<template>
    <div class='flex-col'>
        <div class='flex h-14 pl-4 py-4 pr-2 '>
            <div style="line-height: 24px; font-size: 14px;">账号</div>
            <input class='focus:outline-none w-3/4 ml-2 text-sm' placeholder="请输入账号" v-model="user.userName">
        </div>
        <div class='h-0 w-full border-b-2 border-solid  border-gray-200'></div>
        <div class='flex pl-4 py-4 pr-2 h-14'>
            <div style="line-height: 24px; font-size: 14px;">密码</div>
            <input type="password" class='focus:outline-none w-3/4 ml-2 text-sm' placeholder="请输入密码" v-model="user.userPwd">
        </div>
    </div>
</template>

<script setup lang='ts'>
import { onUpdated, ref, reactive, toRefs, onBeforeUnmount, onMounted, watchEffect, computed, watch } from 'vue';
import { useUserStore } from '../../stores/user'
const userStore = useUserStore()
let user = reactive({
    userName: '',
    userPwd: ''
})
onUpdated(() => {
    userStore.changeUserInfo(user.userName, user.userPwd);
})

</script>
<style scoped lang='less'></style>