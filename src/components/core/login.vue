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
          <div @click="loginWay = pwdLogin" class='text-xl' :class="[loginWay == pwdLogin ? 'choseLogin' : 'notChose']">
            密码登录
          </div>
          <div class='w-0 h-7 border-solid border-r-2 border-gray-200 mx-7'></div>
          <div @click="loginWay = phoneNumLogin" class="text-xl"
            :class="[loginWay == phoneNumLogin ? 'choseLogin' : 'notChose']">短信登录
          </div>
        </div>
        <div>
          <component :is="loginWay" />
          <div class='flex justify-center'>
            <div class='flex w-56 mt-3  justify-between '>
              <el-button plain color="#9d1d22" size='large'>注册</el-button>
              <el-button color="#9d1d22" size='large'>登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, shallowRef, onMounted, watchEffect, computed } from 'vue';
import pwdLogin from '../basic/pwdLogin.vue'
import phoneNumLogin from '../basic/phoneNumLogin.vue'
let pwdLoginVue = shallowRef(pwdLogin);
// let phoneNumLoginVue = shallowRef(phoneNumLogin)
const loginWay = pwdLoginVue
</script>
<style scoped lang='less'>
.login-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.471);

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