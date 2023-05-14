<template>
    <div class=' bg-white  text-sm  rounded-md shadow-round'>
        <ul>
            <li class='text-center text-red-700 py-1'>注意</li>
            <li class='py-1'> 横向桌序号:</li>
            <li class='text-center py-1'>
                1&nbsp;2&nbsp;3&nbsp;4&nbsp;<br>
                5&nbsp;6&nbsp;7&nbsp;8&nbsp;<br>
            </li>
            <li class='py-1'>竖向桌序号:</li>
            <li class='text-center py-1'>
                1&nbsp;5&nbsp;<br>2&nbsp;6&nbsp;<br>
                3&nbsp;7&nbsp;<br>4&nbsp;8&nbsp;<br>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
</script>
<style scoped lang='less'></style>