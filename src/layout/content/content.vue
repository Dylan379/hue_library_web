<template>
  <el-main>
    <div class="content">
      <div>
        <floor></floor>
        <floorArea></floorArea>
      </div>
      <div>
        <RouterView name="login"></RouterView>
      </div>
    </div>
  </el-main>
</template>
<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import floor from '../../components/basic/floor.vue';
import floorArea from '../../components/basic/floorArea.vue';
</script>
<style scoped lang='less'>
.content {
  display: flex;
}
</style>