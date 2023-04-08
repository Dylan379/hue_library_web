<template>
    <div class='flex-col'>
        <div class='flex h-14 pl-4 py-4 pr-2 '>
            <div style="line-height: 24px; font-size: 14px;">电话号码</div>
            <input v-model="account" class='focus:outline-none w-2/4 ml-2 text-sm' placeholder="请输入账号">
            <button id="checkPhone" type="button" @click="getCheckCode">获取验证码</button>
        </div>
        <div class='h-0 w-full border-b-2 border-solid  border-gray-200'></div>
        <div class='flex pl-4 py-4 pr-2 h-14'>
            <div style="line-height: 24px; font-size: 14px;">验证码</div>
            <input type="password" class='focus:outline-none w-3/4 ml-5 text-sm' placeholder="请输入验证码">
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, onUpdated } from 'vue';
const account = ref('')
onMounted(() => {
    //当页面加载完成时,检测电话长的合法性
    if (account.value.length != 11) {
        const loginContainer = document.querySelector(".login")
        var checkPhone = loginContainer?.querySelector("#checkPhone");
        checkPhone?.setAttribute("disabled", 'true');
    }
})
onUpdated(() => {
    //实现对电话号码长度合法性的动态监测
    const loginContainer = document.querySelector(".login")
    var checkPhone = loginContainer?.querySelector("#checkPhone");
    var checkBtn = checkPhone as HTMLButtonElement;
    if (account.value.length == 11) {
        checkBtn?.removeAttribute('disabled');
        checkBtn.style.cursor = "pointer";
        checkBtn.style.color = "#9d1d22"
    } else {
        checkPhone?.setAttribute("disabled", 'true');
        checkBtn.style.cursor = "not-allowed";
        checkBtn.style.color = "#c9ccd0"
    }
})

const getCheckCode = (e: Event) => {
    //实现验证码延迟获取
    var wait = 10;
    time(wait)
    function time(wait: number) {
        var checkPhone = e.target as HTMLButtonElement;
        if (wait == 0) {
            if (account.value.length != 11) {
                checkPhone.style.marginLeft = '0';
                checkPhone.style.cursor = "not-allowed";
                checkPhone.innerText = "获取验证码";
                checkPhone.style.color = "#c9ccd0"
            } else {
                checkPhone.removeAttribute('disabled');
                checkPhone.style.marginLeft = '0';
                checkPhone.innerText = "获取验证码";
                checkPhone.style.color = "#9d1d22"
            }
            wait = 10;
        } else {
            checkPhone.setAttribute("disabled", 'true');
            checkPhone.style.marginLeft = '2em';
            checkPhone.innerText = wait + 's';
            checkPhone.style.color = "black"
            wait--;
            setTimeout(() => {
                time(wait);
            }, 1000);
        }
    }
}
</script>
<style scoped lang='less'>
#checkPhone {
    color: #c9ccd0;
    cursor: not-allowed;
}
</style>