<template>
    <div class="common-layout">
        <el-container direction="vertical">
            <elHeader></elHeader>
            <content></content>
        </el-container>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
import elHeader from './header/header.vue';
import content from './content/content.vue';
</script>
<style scoped lang='less'></style>