<template>
  <el-main>
    <div class="content">
      <div>
        <div class="leftSide">
          <div>
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
      <div v-if="showOtherTable" class='otherTable'>
        <availableSeat></availableSeat>
      </div>
    </div>
  </el-main>
</template>
<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, shallowRef, toRaw, onUpdated } from 'vue';
// import floor from '../../components/basic/floor.vue';
// import floorArea from '../../components/basic/floorArea.vue';
import choseFloor from '../../components/core/choseFloor.vue';
import choseSeat from '../../components/core/choseSeat.vue'
import availableSeat from '../../components/core/availableSeat.vue';
import attention from '../../components/basic/attention.vue';
import { useAvailableSeatStore } from '../../stores/availableSeat'
const store = useAvailableSeatStore()
const showOtherTable = computed(() => store.showOtherTable)
</script>
<style scoped lang='less'>
.content {
  margin-top: 40px;
  position: relative;
  display: flex;

  .leftSide {
    position: fixed;

    // overflow: hidden;
    .attention {
      margin-top: 20px;
    }
  }

  .choseSeat {
    display: flex;
    margin: 20px 0 0 11vw;
    width: 59vw;
    border-radius: 10px;
    background-color: aliceblue;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.215);
  }

  .otherTable {
    position: fixed;
    right: 1vw;
    margin: 20px 0 0 25px;
    height: 86vh;
    width: 25vw;
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.215);
  }
}
</style>