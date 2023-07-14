<template>
    <el-form ref="ruleFormRef" :model="userRuleForm" :rules="rules">
        <div class='flex-col '>
            <div class="border-2 border-solid rounded-md border-gray-200 mx-20">
                <div class='flex h-14 pl-4 py-4 pr-2 '>
                    <el-form-item label="账号" prop="userName">
                        <el-input class='w-3/4  text-sm' placeholder="请输入账号" v-model="userRuleForm.userStuId" />
                    </el-form-item>
                </div>
                <div class='h-0 w-full border-b-2 border-solid  border-gray-200'></div>
                <div class='flex pl-4 py-4 pr-2 h-14'>
                    <el-form-item label="密码" prop="userPwd">
                        <el-input type="password" class='focus:outline-none w-3/4 text-sm' placeholder="请输入密码"
                            v-model="userRuleForm.userPwd" />
                    </el-form-item>
                </div>
            </div>
            <div>
                <div class='flex mt-3  justify-between px-36'>
                    <el-button plain color="#9d1d22" size='large' @click="isRegist">注册</el-button>
                    <el-button color="#9d1d22" size='large' @click="useDebounceToLogin(ruleFormRef)">登录</el-button>
                </div>
            </div>
        </div>
    </el-form>
</template>

<script setup lang='ts'>
import { onUpdated, ref, reactive, toRefs, onBeforeUnmount, onMounted, watchEffect, computed, watch } from 'vue';
import { useUserStore } from '../../stores/user'
import type { FormInstance, FormRules } from 'element-plus'
import { pwdToLogin } from '../../api/pwdToLogin';
import usedebounce from '../../hooks/usedebounce';
import { useLoginStore } from '../../stores/login';
//控制注册跳转
const loginStore = useLoginStore()
const isRegist = () => {
    loginStore.isRegist = !loginStore.isRegist
}

//登录规则验证
const ruleFormRef = ref<FormInstance>()
const userStore = useUserStore()

const userRuleForm = reactive({
    userStuId: '',
    userPwd: ''
})

const validateUserName = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入账号'))
    } else {
        callback()
    }
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}

const rules = reactive<FormRules>({
    userPwd: [{ validator: validatePass, trigger: 'blur' }],
    userName: [{ validator: validateUserName, trigger: 'blur' }],
})

//持续更新用户登陆数据
watch(userRuleForm, () => {
    userStore.changeUserInfo(userRuleForm.userStuId, userRuleForm.userPwd);
})
//登录api
const toLogin = pwdToLogin;
//登录验证+防抖
const validToLogin = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            toLogin()
        } else {
            return false
        }
    })
}
const useDebounceToLogin = usedebounce(validToLogin, 1500, false)

</script>
<style scoped lang='less'>
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