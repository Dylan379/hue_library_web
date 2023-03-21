<template>
    <el-header class="header">
        <div class="nav">
            <div class="title">
                <div><img class="titleLogo" src="../../assets/images/logo/titleLogo.svg" alt=""></div>
                <h4 class="titleText">崇德尚善, 精工铸新</h4>
            </div>
            <div class="authBar">
                <ul class="authNav">
                    <li><el-button plain circle size="large" color="#9d1d22">背景</el-button></li>
                    <li><el-button plain size="large" color="#9d1d22" @click="toLogin">登录</el-button></li>
                    <li><el-button text size="large">我的预约信息</el-button></li>
                    <li><el-button size="large" color="#9d1d22">还有座位吗?</el-button></li>
                </ul>
            </div>
        </div>
    </el-header>
</template>
<script setup lang='ts'>
import { ref, reactive } from 'vue';
import router from '../../router';
const toLogin = () => {
    router.push('/login')
}
</script>
<style scoped lang='less'>
.header {
    box-shadow: 0 0.5px 10px rgba(0, 0, 0, 0.215);
    // background-color: #f2151515;
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