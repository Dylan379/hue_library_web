<template>
  <el-main>
    <floor></floor>
    <floorArea></floorArea>
  </el-main>
</template>
<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import floor from '../../components/basic/floor.vue';
import floorArea from '../../components/basic/floorArea.vue';
</script>
<style scoped lang='less'></style>