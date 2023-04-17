<template>
    <div class='flex-col'>
        <div class='flex h-14 pl-4 py-4 pr-2 '>
            <div style="line-height: 24px; font-size: 14px;">电话号码</div>
            <input v-model="userPhoneNum" class='focus:outline-none w-2/4 ml-2 text-sm' placeholder="请输入电话号码">
            <button id="checkPhone" type="button" @click="getCheckCode">获取验证码</button>
        </div>
        <div class='h-0 w-full border-b-2 border-solid  border-gray-200'></div>
        <div class='flex pl-4 py-4 pr-2 h-14'>
            <div style="line-height: 24px; font-size: 14px;">验证码</div>
            <input v-model="captchaNum" id='captcha' class='focus:outline-none w-3/4 ml-5 text-sm' placeholder="请输入验证码">
        </div>
    </div>
</template>
<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, toRaw, onUpdated } from 'vue';
import { useUserStore } from '../../stores/user'
const userStore = useUserStore()
//控制验证码能否变色
let isChangeColor = true
//电话登录所需info
const captchaNum = ref()
const userPhoneNum = ref('')
onMounted(() => {
    const loginContainer = document.querySelector(".login")
    let checkPhone = (loginContainer?.querySelector("#checkPhone")) as HTMLButtonElement;
    let captchaInput = (loginContainer?.querySelector("#captcha")) as HTMLInputElement;
    //当页面加载完成时,检测电话长的合法性
    if (userPhoneNum.value.length != 11) {
        checkPhone.setAttribute("disabled", 'true')
        checkPhone.style.color = '#c9ccd0'
        checkPhone.style.cursor = 'not-allowed'
    }
    else checkPhone.style.color = '#9d1d22';
    captchaInput.disabled = true;
    captchaInput.style.cursor = "not-allowed";
})

onUpdated(() => {
    //实现对电话号码长度合法性的动态监测
    const loginContainer = document.querySelector(".login")
    let checkPhone = loginContainer?.querySelector("#checkPhone");
    let checkBtn = checkPhone as HTMLButtonElement;
    if (userPhoneNum.value.length == 11 && isChangeColor) {
        checkBtn?.removeAttribute('disabled');
        checkBtn.style.cursor = "pointer";
        checkBtn.style.color = "#9d1d22";
    } else if (userPhoneNum.value.length != 11 && isChangeColor) {
        checkPhone?.setAttribute("disabled", 'true');
        checkBtn.style.cursor = "not-allowed";
        checkBtn.style.color = "#c9ccd0"
    }
})

const getCheckCode = (e: Event) => {
    //点击获取验证码时,解除禁用验证码输入框
    const checkPhone = e.target as HTMLButtonElement;
    const loginContainer = document.querySelector(".login")
    const captchaInput = (loginContainer?.querySelector("#captcha")) as HTMLInputElement;
    captchaInput.removeAttribute('disabled');
    captchaInput.style.cursor = "pointer";
    //此时产生修改不允许改变颜色
    isChangeColor = !isChangeColor
    //将更新完成的数据存入商店
    userStore.changePhoneNum(userPhoneNum.value, captchaNum.value)
    //实现验证码延迟获取
    const wait = 10;
    time(wait)
    function time(wait: number) {
        if (wait == 0) {
            if (userPhoneNum.value.length != 11) {
                checkPhone.style.marginLeft = '0';
                checkPhone.style.cursor = "not-allowed";
                checkPhone.innerText = "获取验证码";
                checkPhone.style.color = "#c9ccd0"
                isChangeColor = !isChangeColor
            } else {
                checkPhone.removeAttribute('disabled');
                checkPhone.style.marginLeft = '0';
                checkPhone.innerText = "获取验证码";
                checkPhone.style.color = "#9d1d22"
                isChangeColor = !isChangeColor
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
<style scoped lang='less'></style>