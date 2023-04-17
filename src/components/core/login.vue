<template>
  <div class='login-mask'>
    <div class="login">
      <div class="login-close">
        <RouterLink to="/">
          <el-icon size="35px">
            <CloseBold />
          </el-icon>
        </RouterLink>
      </div>
      <div>
        <div class='flex justify-center mb-5'>
          <div @click="loginWay = pwdLogin; toRegist = !toRegist" class='text-xl'
            :class="[loginWay == pwdLogin ? 'choseLogin' : 'notChose']">
            密码登录
          </div>
          <div class='w-0 h-7 border-solid border-r-2 border-gray-200 mx-7'></div>
          <div @click="loginWay = phoneNumLogin; toRegist = !toRegist" class="text-xl"
            :class="[loginWay == phoneNumLogin ? 'choseLogin' : 'notChose']">短信登录
          </div>
        </div>
        <div>
          <form action="">
            <div>
              <div class='border-2 border-solid rounded-md border-gray-200 mx-20'>
                <component :is="loginWay" />
              </div>
              <div class='flex justify-center'>
                <div class='flex w-56 mt-3  justify-between '>
                  <!--4月17日需 完善验证码登录的逻辑 -->
                  <component v-if="toRegist" :is="loginWithPwd"></component>
                  <component v-else :is="loginWithRegist" />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, shallowRef, onMounted, watchEffect, computed, watch } from 'vue';
import pwdLogin from '../basic/pwdLogin.vue'
import phoneNumLogin from '../basic/phoneNumLogin.vue'
import loginWithRegist from '../basic/loginWithRegist.vue'
import loginWithPwd from '../basic/loginWithPwd.vue';
import { useLoginStore } from '../../stores/login';
import { storeToRefs } from 'pinia';
const loginStore = useLoginStore()
const { isRegist } = storeToRefs(loginStore)
//控制登录面板组件跳转
let pwdLoginVue = shallowRef(pwdLogin);
let loginWay = pwdLoginVue
//控制注册跳转
let toRegist = ref(true)
watch(isRegist, () => {
  toRegist.value = !toRegist;
  loginWay.value = phoneNumLogin;
})
</script>
<style scoped lang='less'>
.login-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.471);
  display: flex;

  .login-close {
    display: flex;
    justify-content: flex-end
  }

  .login {
    width: 500px;
    height: 300px;
    margin: 150px auto 0;
    padding-top: 10px;
    padding-right: auto;
    border-radius: 10px;
    background-color: white;

    .choseLogin {
      color: #9d1d22;
      pointer-events: none;
    }

    .notChose {
      cursor: pointer;
    }
  }
}
</style>