<template>
    <div class='flex w-56 mt-3  justify-between'>
        <el-button plain color="#9d1d22" size='large' @click="isRegist">注册</el-button>
        <el-button color="#9d1d22" size='large' @click="useDebounceToLogin">登录</el-button>
    </div>
</template>

<script setup lang='ts'>
import { pwdToLogin } from '../../api/pwdToLogin';
import usedebounce from '../../hooks/usedebounce';
import { useLoginStore } from '../../stores/login';
//控制注册跳转
const loginStore = useLoginStore()
const isRegist = () => {
    loginStore.isRegist = !loginStore.isRegist
}
//登录api
const toLogin = pwdToLogin;
//登录防抖
const useDebounceToLogin = usedebounce(toLogin, 1000, false)
</script>
<style scoped lang='less'></style>