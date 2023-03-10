<template>
    <div class="floorArea">
        <button @click="change" class="first">A区</button>
        <button @click="change" class="second">B区</button>
        <button @click="change" class="third">C区</button>
        <button @click="change" class="forth">D区</button>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed } from 'vue';
//code for css
onMounted(() => {
    const container1 = document.querySelector(".floorArea");
    const btn1 = container1!.querySelector('.first');
    (btn1 as HTMLButtonElement).style.backgroundColor = '#9e1a26';
    (btn1 as HTMLButtonElement).style.color = 'white';
})
const change = (e: Event) => {
    var container = document.querySelector(".floorArea");
    var btn = container!.querySelectorAll('.floorArea > button');
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
.floorArea {
    margin-top: 15px;
    display: flex;
    width: 164px;
    z-index: 1;

    button {
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-top: 1px solid #e4e7ed;
        border-bottom: 1px solid #e4e7ed;
    }

    .first {
        border-radius: 5px 0 0 5px;
        border-left: 1px solid #e4e7ed;
        // background-color: #9d1d22;
    }

    .forth {
        border-radius: 0 5px 5px 0;
        border-right: 1px solid #e4e7ed;
    }
}
</style>