<template>
    <div>B区</div>
    <div class='' v-for="table in tables" :key="table.valueOf">
        <seat></seat>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import seat from '../basic/seat.vue';
const tables = 5;
</script>
<style scoped lang='less'></style>