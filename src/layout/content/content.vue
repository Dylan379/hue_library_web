<template>
  <el-main>
    <div class="content">
      <div class="floor">
        <choseFloor></choseFloor>
      </div>
      <div class='choseTable'>
        <choseSeat></choseSeat>
      </div>
      <div>
        <RouterView name="login"></RouterView>
      </div>
      <div v-if="showOtherTable" class='otherTable'>
        <otherTable></otherTable>
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
import otherTable from '../../components/core/otherTable.vue';

import { storeToRefs } from 'pinia'
import { useOtherTableStore } from '../../stores/otherTable'
const store = useOtherTableStore()
const { showOtherTable } = storeToRefs(store)
</script>
<style scoped lang='less'>
.content {
  margin-top: 40px;
  position: relative;
  display: flex;

  .floor {
    position: fixed;
    // overflow: hidden;
  }

  .choseTable {
    display: flex;
    margin: 20px 0 0 12vw;
    // height: 1000px;
    width: 58vw;
    border-radius: 10px;
    background-color: aliceblue;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.215);
  }

  .otherTable {
    // display: flex;
    position: fixed;
    right: 1vw;
    margin: 20px 0 0 25px;
    height: 85vh;
    width: 25vw;
    border-radius: 20px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.215);
  }
}
</style>