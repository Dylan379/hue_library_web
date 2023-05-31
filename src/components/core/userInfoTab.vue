<template>
  <div class="">
    <el-form ref="ruleFormRef" :model="changeInfoRuleForm" :rules="rules">
      <div>
        <div class="text-center mt-5">
          <el-avatar :size="70" :src="userInfo.userAvatarUrl" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
          </el-avatar>
        </div>
        <div class="pl-4">
          <div class="mb-5">
            <div class="text-lg" id="userName">
              姓名:&nbsp;&nbsp;{{ userInfo.userName }}
            </div>
          </div>
          <div class="mb-5">
            <div class="text-lg" id="userStuId">
              学号:&nbsp;&nbsp;{{ userInfo.userStuId }}
            </div>
          </div>
          <div class="mb-5">
            <div class="text-lg" id="userPhoneNum">
              电话:&nbsp;&nbsp;{{ userInfo.userPhoneNum }}
            </div>
          </div>
        </div>
        <div class="changePhone pl-4">
          <div>
            <el-switch v-model="isChangePhoneNum" size="large" inactive-text="修改电话" />
          </div>
          <div v-if="isChangePhoneNum">
            <div class="input_inner">
              <div class="flex">
                <el-form-item label="电话号码" prop="phoneNum">
                  <el-input v-model="changeInfoRuleForm.phoneNum" class="text-sm" placeholder="请输入电话号码" />
                </el-form-item>
                <button class="checkCodeBtn text-gray-300" id="checkPhone" type="button" @click="getCheckCode">
                  获取验证码
                </button>
              </div>
              <div class="w-2/4 pl-4">
                <el-form-item label="验证码" prop="captcha">
                  <el-input v-model="changeInfoRuleForm.captcha" id="captcha" class="phoneCheck focus:outline-0"
                    placeholder="请输入验证码" />
                </el-form-item>
              </div>
            </div>
          </div>
        </div>
        <div class="pl-4">
          <div>
            <el-switch v-model="isChangePwd" size="large" inactive-text="修改密码" />
          </div>
          <div v-if="isChangePwd">
            <div class="w-2/3 input_inner">
              <el-form-item class="pl-7" label="密码" prop="userPwd">
                <el-input v-model="changeInfoRuleForm.userPwd" type="password" class="text-sm" placeholder="请输入密码" />
              </el-form-item>
              <el-form-item label="确认密码" prop="userConfirmPwd">
                <el-input v-model="changeInfoRuleForm.userConfirmPwd" type="password" class="text-sm"
                  placeholder="请确认密码" />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="text-center" v-if="isChangePwd || isChangePhoneNum">
          <el-button :loading="isChanging" color="#9d1d22"
            @click="useDebounceTochangeUserInfo(ruleFormRef)">确认修改</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import { useUserStore } from "../../stores/user";
import { storeToRefs } from "pinia";
import changeUserInfoApi from '../../api/changeUserInfo'
import changeUserPwdApi from '../../api/changeUserPwd'
import changeUserPhoneApi from '../../api/changeUserPhone'
import { FormInstance, FormRules } from "element-plus/es/components/form";
import usedebounce from '../../hooks/usedebounce'
const userStore = useUserStore();
const { userInfo, isChanging } = storeToRefs(userStore);
const errorHandler = () => true;
const isChangePwd = ref(false);
const isChangePhoneNum = ref(false);
const changeUserInfoData = {
  userPhoneNum: '',
  userPwd: '',
  captcha: ''
};
const changeInfoRuleForm = reactive({
  phoneNum: "",
  captcha: "",
  userPwd: "",
  userConfirmPwd: ""
});
//表单检验
const ruleFormRef = ref<FormInstance>();
//校验电话
const validatephoneNum = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入电话"));
  } else if (value.length != 11) {
    callback(new Error("号码长度错误"));
  } else {
    callback();
  }
};
const validateCptcha = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入验证码"));
  } else if (value.length != 6) {
    callback(new Error("验证码长度错误"));
  } else {
    callback();
  }
};
//校验密码
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (changeInfoRuleForm.userConfirmPwd !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("userConfirmPwd", () => null);
    }
    callback();
  }
};
//校验密码是否一致
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请确认密码"));
  } else if (value !== changeInfoRuleForm.userPwd) {
    callback(new Error("两次输入不一致!"));
  } else {
    callback();
  }
};
//表单规则属性
const rules = reactive<FormRules>({
  phoneNum: [{ validator: validatephoneNum, trigger: "blur" }],
  userPwd: [{ validator: validatePass, trigger: "blur" }],
  userConfirmPwd: [{ validator: validatePass2, trigger: "blur" }],
  captcha: [{ validator: validateCptcha, trigger: "blur" }]
});

//登录校验
const validToChangeUserInfo = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      changeUserInfo()
    } else {
      return false
    }
  })
}

// const updatePwd: ChangeUserPwdInterface;
// const updateInfo: ChangeUserInfoInterface;
// const updatePhoneNum: ChangeUserPhoneInterface;
const changeUserInfo = () => {
  changeUserInfoData.userPwd = changeInfoRuleForm.userConfirmPwd;
  changeUserInfoData.userPhoneNum = changeInfoRuleForm.phoneNum;
  changeUserInfoData.captcha = changeInfoRuleForm.captcha;
  userStore.updataChangeUserInfo(changeUserInfoData);
  if (changeInfoRuleForm.userPwd != '' && changeInfoRuleForm.phoneNum != '') {
    changeUserInfoApi();
  } else if (changeInfoRuleForm.userPwd != '') {
    changeUserPwdApi();
  } else if (changeInfoRuleForm.phoneNum != '') {
    changeUserPhoneApi();
  }
}

//监测电话号码长度合法性的
watch([() => changeInfoRuleForm.phoneNum, isChangePhoneNum], () => {
  function observePhoneLength() {
    const loginContainer = document.querySelector(".changePhone");
    let checkPhone = loginContainer?.querySelector("#checkPhone");
    let checkBtn = checkPhone as HTMLButtonElement;
    // console.log(checkBtn);
    if (changeInfoRuleForm.phoneNum.length == 11 && isChangeColor.value) {
      checkBtn?.removeAttribute("disabled");
      checkBtn.style.cursor = "pointer";
      checkBtn.style.color = "#9d1d22";
    } else if (changeInfoRuleForm.phoneNum.length != 11 && isChangeColor.value) {
      checkBtn?.setAttribute("disabled", "true");
      checkBtn.style.cursor = "not-allowed";
      checkBtn.style.color = "#c9ccd0";
    }
  }
  if (isChangePhoneNum.value) {
    // 处理验证码闪一下的问题
    setTimeout(() => {
      observePhoneLength();
    });
  }
});
//控制验证码能否变色
const isChangeColor = ref(true);
const getCheckCode = (e: Event) => {
  //点击获取验证码时,解除禁用验证码输入框
  const checkPhone = e.target as HTMLButtonElement;
  const loginContainer = document.querySelector(".changePhone");
  const captchaInput = loginContainer?.querySelector("#captcha") as HTMLInputElement;
  captchaInput.removeAttribute("disabled");
  captchaInput.style.cursor = "pointer";
  //此时产生修改不允许改变颜色
  isChangeColor.value = !isChangeColor;
  //实现验证码延迟获取
  const wait = 10;
  time(wait);
  function time(wait: number) {
    if (wait == 0) {
      if (changeInfoRuleForm.phoneNum.length != 11) {
        checkPhone.style.marginLeft = "15px";
        checkPhone.style.cursor = "not-allowed";
        checkPhone.innerText = "获取验证码";
        checkPhone.style.color = "#c9ccd0";
        isChangeColor.value = !isChangeColor.value;
      } else {
        checkPhone.removeAttribute("disabled");
        checkPhone.style.marginLeft = "15px";
        checkPhone.innerText = "获取验证码";
        checkPhone.style.color = "#9d1d22";
        isChangeColor.value = !isChangeColor.value;
      }
      wait = 10;
    } else {
      checkPhone.setAttribute("disabled", "true");
      checkPhone.style.marginLeft = "2em";
      checkPhone.innerText = wait + "s";
      checkPhone.style.color = "black";
      wait--;
      setTimeout(() => {
        time(wait);
      }, 1000);
    }
  }
};

//登录防抖
const useDebounceTochangeUserInfo = usedebounce(validToChangeUserInfo, 1500);
</script>
<style scoped lang="less">
.checkCodeBtn {
  font-size: 14px;
  margin-left: 15px;
  margin-bottom: 18px;
}

.input_inner {
  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px #9d1d22 !important;
  }

  :deep(.el-input.is-focus .el-input__wrapper) {
    box-shadow: 0 0 0 1px #9d1d22 !important;
  }
}

:deep(.el-switch__label.is-active) {
  color: #9d1d22;
}

:deep(.el-switch) {
  --el-switch-on-color: #9d1d22;
}

:deep(.el-form-item__error) {
  top: 32px;
  left: 0.7vw;
}
</style>
