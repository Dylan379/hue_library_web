<template>
    <el-header class="header">
        <div class="nav">
            <div class="title">
                <div><img class="titleLogo" src="../../assets/images/logo/titleLogo.svg" alt=""></div>
                <h4 class="titleText">崇德尚善, 精工铸新</h4>
            </div>
            <div class="authBar">
                <ul class="authNav">
                    <li v-if="loginStore.isLogin">
                        <el-button plain circle color="black" size="large" @click="showUserInfoTab">
                            <el-avatar :src="userAvatarUrl" @error="errorHandler">
                                <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                            </el-avatar>
                        </el-button>
                    </li>
                    <li v-else><el-button plain size="large" color="#9d1d22" @click="toLogin">登录</el-button></li>
                    <li>
                        <component :is="myReserve"></component>
                    </li>
                    <li><el-button size="large" color="#9d1d22" @click="showTable">还有座位吗?</el-button></li>
                </ul>
            </div>
        </div>
    </el-header>
</template>
<script setup lang='ts'>
import { ref, reactive, watch, watchEffect, onMounted, onBeforeMount } from 'vue';
import myReserve from '../../components/basic/myReserve.vue';
import router from '../../router';
import { useAvailableSeatStore } from '../../stores/availableSeat'
import usethrottle from '../../hooks/usethrottle'
// import { useThrottle } from '@vueuse/core';
import getUserInfo from '../../api/getUserInfo';
import { useLoginStore } from '../../stores/login'
import { useUserStore } from '../../stores/user';
import { storeToRefs } from 'pinia';
const loginStore = useLoginStore();
const userStore = useUserStore();
const { userAvatarUrl } = storeToRefs(userStore)

//打开用户数据面板
const showUserInfoTab = () => {
    if (!userStore.isShowUserInfo) {
        userStore.updateIsShowUserInfo();
        availableSeatStore.showAvailableSeatTab = false;
        usethrottle(getUserInfo(), 5000);
    } else {
        userStore.updateIsShowUserInfo();
        availableSeatStore.showAvailableSeatTab = false;
    }
}

// const usethrottleShowUserInfoTab = usethrottle(showUserInfoTab, 5000)

//5/27解决用户信息持久化问题


const errorHandler = () => true
//查找是否登录
onMounted(() => {
    if (sessionStorage.getItem('Id')) {
        loginStore.isLogin = true
        userStore.updataUserAvatarUrl(sessionStorage.getItem('userAvatarUrl'))
    }
})
//登录
const toLogin = () => {
    router.push('/login')
}
//还有座位吗
const availableSeatStore = useAvailableSeatStore()
const showTable = () => {
    availableSeatStore.updateShowOtherTable();
    userStore.isShowUserInfo = false;
}
</script>
<style scoped lang='less'>
.header {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100vw;
    background-color: #fff;
    box-shadow: 0 0.5px 10px rgba(0, 0, 0, 0.215);
}

.nav {
    display: flex;
    justify-content: space-between;
    height: inherit;
}

.title {
    display: flex;
    margin-left: 50px;
    // margin-bottom: 5px;
    width: 175px;
    align-items: center;
    justify-content: space-between;
}

.titleLogo {
    width: 50px;
    height: 100%;
}

.titleText {
    width: 120px;
    text-align: center;
    font: italic 400 25px STXingkai;
    color: #9e1a26
}


.authBar {
    height: inherit;
    padding: 10px 0;
}

.authNav {
    display: flex;

    li {

        padding: 0em 0.5em;
    }
}
</style>