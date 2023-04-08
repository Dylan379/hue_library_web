<template>
    <div class="floor">
        <floor class='shadow-lg'></floor>
        <floorArea class='shadow-lg'></floorArea>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import floor from '../basic/floor.vue';
import floorArea from '../basic/floorArea.vue';
</script>
<style scoped lang='less'>
.floor {
    overflow: hidden;
}
</style>