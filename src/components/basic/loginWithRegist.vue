<template>
    <div class='flex w-56 mt-3 justify-center'>
        <!-- <el-button plain color="#9d1d22" size='large'>注册</el-button> -->
        <el-button color="#9d1d22" size='large' @click="useDebounceToLogin">注册/登录</el-button>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import { captchaToLogin } from '../../api/captchaToLogin'
import useDebounce from '../../hooks/usedebounce'
//登录api
const toLogin = captchaToLogin;
//登录防抖
const useDebounceToLogin = useDebounce(toLogin, 1050)
</script>
<style scoped lang='less'></style>