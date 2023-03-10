<template>
    <div class="floor">
        <button @click="change" class="forth ">4F</button>
        <button @click="change" class="third ">3F</button>
        <button @click="change" class="second ">2F</button>
        <button @click="change" class="first ">1F</button>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
//code for css
onMounted(() => {
    const container1 = document.querySelector(".floor");
    const btn1 = container1!.querySelector('.first');
    (btn1 as HTMLButtonElement).style.backgroundColor = '#9e1a26';
    (btn1 as HTMLButtonElement).style.color = 'white';
})
const change = (e: Event) => {
    var container = document.querySelector(".floor");
    var btn = container!.querySelectorAll('.floor > button');
    for (var j = 0; j < btn.length; j++) {
        (btn[j] as HTMLButtonElement).style.backgroundColor = '';
        (btn[j] as HTMLButtonElement).style.color = 'black';
    }
    (e.target as HTMLButtonElement).style.backgroundColor = '#9e1a26';
    (e.target as HTMLButtonElement).style.color = 'white';
}
//code for function
</script>
<style scoped lang='less'>
.floor {
    display: flex;
    flex-direction: column;
    margin-top: 19vh;
    width: 42px;
    z-index: 1;

    button {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-left: 1px solid #e4e7ed;
        border-right: 1px solid #e4e7ed;
    }

    .forth {
        border-radius: 5px 5px 0 0;
        border-top: 1px solid #e4e7ed;
    }

    .first {
        border-radius: 0 0 5px 5px;
        border-bottom: 1px solid #e4e7ed;
        // background-color: #9e1a26;
    }
}
</style>