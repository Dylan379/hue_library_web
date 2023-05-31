<template>
  <el-main>
    <div class="content">
      <div>
        <div class="leftSide">
          <div class="seatColorMean">
            <seatColorMean></seatColorMean>
          </div>
          <div class="choseFloor">
            <choseFloor></choseFloor>
          </div>
          <div class="attention">
            <attention></attention>
          </div>
        </div>
        <div class='choseSeat'>
          <choseSeat></choseSeat>
        </div>
      </div>
      <div>
        <RouterView name="login"></RouterView>
      </div>
      <div v-if="showAvailableSeatTab" class='availableSeatTab'>
        <availableSeat></availableSeat>
      </div>
      <div v-if="showUserInfoTab" class='userInfoTab'>
        <userInfoTab></userInfoTab>
      </div>
    </div>
  </el-main>
</template>
<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, shallowRef, toRaw, onUpdated, watch } from 'vue';
import choseFloor from '../../components/core/choseFloor.vue';
import choseSeat from '../../components/core/choseSeat.vue'
import availableSeat from '../../components/core/availableSeat.vue';
import attention from '../../components/basic/attention.vue';
import seatColorMean from '../../components/basic/seatColorMean.vue';
import userInfoTab from '../../components/core/userInfoTab.vue';
import { useAvailableSeatStore } from '../../stores/availableSeat'
import { useUserStore } from '../../stores/user';
import { storeToRefs } from 'pinia';
const availableSeatstore = useAvailableSeatStore()
const userStore = useUserStore();
const { userInfo, isShowUserInfo } = storeToRefs(userStore);
const showAvailableSeatTab = computed(() => availableSeatstore.showAvailableSeatTab)
const showUserInfoTab = ref()

watch([userInfo, isShowUserInfo], () => {
  if (isShowUserInfo.value && userInfo.value) {
    showUserInfoTab.value = isShowUserInfo;
  } else {
    showUserInfoTab.value = false;
  }
})


</script>
<style scoped lang='less'>
.content {
  margin-top: 40px;
  position: relative;
  display: flex;

  .leftSide {
    position: fixed;
    display: table-column;

    .seatColorMean {
      margin-top: 20px;
    }
    .choseFloor{
      // position: fixed;
      margin-top:40px;
    }

    .attention {
      // position: fixed;
      margin-top:60px;
    }
  }

  .choseSeat {
    display: flex;
    margin: 20px 0 0 11vw;
    width: 59vw;
    border-radius: 10px;
    // background-color: aliceblue;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.215);
  }

  .availableSeatTab {
    position: fixed;
    left: 72vw;
    margin: 20px 0 0 25px;
    height: 86vh;
    width: 25vw;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.215);
  }

  .userInfoTab {
    position: fixed;
    left: 72vw;
    margin: 20px 0 0 25px;
    height: 86vh;
    width: 25vw;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.215);
  }
}
</style>