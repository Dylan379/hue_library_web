<template>
  <div class="app">
    <RouterView>
    </RouterView>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
console.log(import.meta.env.VITE_API);
</script>
<style scoped lang='less'>
.app {
  position: relative;
}
</style>