<template>
    <el-form ref="ruleFormRef" :model="phoneRuleForm" :rules="rules">
        <div class='flex-col'>
            <div class="border-2 border-solid rounded-md border-gray-200 mx-20">
                <div class='flex h-14 pl-2 py-4 '>
                    <el-form-item label="电话号码" prop="phoneNum">
                        <el-input v-model="phoneRuleForm.phoneNum" class='text-sm' placeholder="请输入电话号码" />
                    </el-form-item>
                    <button class='checkCodeBtn' id="checkPhone" type="button" @click="getCheckCode">获取验证码</button>
                </div>
                <div class='h-0 w-full border-b-2 border-solid  border-gray-200'></div>
                <div class='flex pl-2 py-4 pr-2 h-14'>
                    <el-form-item label="验证码">
                        <input v-model="phoneRuleForm.phoneCheck" id='captcha' class='phoneCheck focus:outline-0'
                            placeholder="请输入验证码" />
                    </el-form-item>
                </div>
            </div>
            <div class='flex pt-5 justify-center'>
                <el-button color="#9d1d22" size='large' @click="useDebounceToLogin">注册/登录</el-button>
            </div>
        </div>
    </el-form>
</template>
<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, toRaw, onUpdated, watch } from 'vue';
import { useUserStore } from '../../stores/user'
import type { FormInstance, FormRules } from 'element-plus'
import { captchaToLogin } from '../../api/captchaToLogin'
import useDebounce from '../../hooks/usedebounce'
const userStore = useUserStore()
const ruleFormRef = ref<FormInstance>()
const phoneRuleForm = reactive({
    phoneNum: '',
    phoneCheck: ''
})

const validatephoneNum = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入电话'))
    } else if (value.length < 11) {
        callback(new Error('号码长度错误'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules>({
    phoneNum: [{ validator: validatephoneNum, trigger: 'blur' }],
})

//登录api
const toLogin = captchaToLogin;
//登录防抖
const updateDataToLogin = () => {
    userStore.changePhoneNum(phoneRuleForm.phoneNum, phoneRuleForm.phoneCheck);
    toLogin();
}
const useDebounceToLogin = useDebounce(updateDataToLogin, 1500, false)

//将更新完成的数据存入商店


//控制验证码能否变色
let isChangeColor = true
//电话登录所需info
// const captchaNum = ref()
// const userPhoneNum = ref('')
onMounted(() => {
    const loginContainer = document.querySelector(".login")
    let checkPhone = (loginContainer?.querySelector("#checkPhone")) as HTMLButtonElement;
    let captchaInput = (loginContainer?.querySelector("#captcha")) as HTMLInputElement;
    //当页面加载完成时,检测电话长的合法性
    if (phoneRuleForm.phoneNum.length != 11) {
        checkPhone.setAttribute("disabled", 'true')
        checkPhone.style.color = '#c9ccd0'
        checkPhone.style.cursor = 'not-allowed'
    }
    else checkPhone.style.color = '#9d1d22';
    captchaInput.disabled = true;
    captchaInput.style.cursor = "not-allowed";
})

watch(phoneRuleForm, () => {
    //实现对电话号码长度合法性的动态监测
    const loginContainer = document.querySelector(".login")
    let checkPhone = loginContainer?.querySelector("#checkPhone");
    let checkBtn = checkPhone as HTMLButtonElement;
    if (phoneRuleForm.phoneNum.length == 11 && isChangeColor) {
        checkBtn?.removeAttribute('disabled');
        checkBtn.style.cursor = "pointer";
        checkBtn.style.color = "#9d1d22";
    } else if (phoneRuleForm.phoneNum.length != 11 && isChangeColor) {
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
    //实现验证码延迟获取
    const wait = 10;
    time(wait)
    function time(wait: number) {
        if (wait == 0) {
            if (phoneRuleForm.phoneNum.length != 11) {
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
<style scoped lang='less'>
.checkCodeBtn {
    font-size: 14px;
    vertical-align: bottom;
    padding-top: 5px;
    padding-left: 5px;
}

.phoneCheck {
    margin-left: 25px;
    font-size: 14px;
    line-height: 14px;
    margin-top: 6px;
}



:deep(.el-input__wrapper) {
    box-shadow: none;
}

:deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: none;
}

:deep(.el-form-item__error) {
    top: 24px;
    left: 0.7vw;
}
</style>