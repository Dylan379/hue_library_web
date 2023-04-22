<template>
    <el-header class="header">
        <div class="nav">
            <div class="title">
                <div><img class="titleLogo" src="../../assets/images/logo/titleLogo.svg" alt=""></div>
                <h4 class="titleText">崇德尚善, 精工铸新</h4>
            </div>

            <!--4月18日需 编写预约信息mock数据与接口,实现预约信息展示 -->
            <div class="authBar">
                <ul class="authNav">
                    <li><el-button plain circle size="large" color="#9d1d22">背景</el-button></li>
                    <li><el-button plain size="large" color="#9d1d22" @click="toLogin">登录</el-button></li>
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
import { ref, reactive, watch, watchEffect } from 'vue';
import myReserve from '../../components/basic/myReserve.vue';
import router from '../../router';
import { useOtherTableStore } from '../../stores/otherTable'
//登录
const toLogin = () => {
    router.push('/login')
}

//还有座位吗
const store = useOtherTableStore()
const showTable = () => {
    store.updateShowOtherTable();
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