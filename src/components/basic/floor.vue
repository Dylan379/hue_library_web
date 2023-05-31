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
import { useFloorAndDistrictStore } from '../../stores/floorAndDistrict';
const floorAndDistrctStore = useFloorAndDistrictStore();

//code for css
onMounted(() => {
    const container1 = document.querySelector(".floor");
    const btn1 = container1!.querySelector('.first');
    const firstBtn = (btn1 as HTMLButtonElement);
    firstBtn.style.backgroundColor = '#9e1a26';
    firstBtn.style.color = 'white';
    firstBtn.style.cursor = 'not-allowed';
    firstBtn.disabled = true;
})
const change = (e: Event) => {
    let currentBtn = (e.target as HTMLButtonElement);
    let container = document.querySelector(".floor");
    let btn = container!.querySelectorAll('.floor > button');
    for (let j = 0; j < btn.length; j++) {
        let otherBtn = (btn[j] as HTMLButtonElement);
        otherBtn.removeAttribute('disabled');
        otherBtn.style.cursor = 'pointer'
        otherBtn.style.backgroundColor = '';
        otherBtn.style.color = 'black';
    }
    currentBtn.disabled = true;
    currentBtn.style.cursor = 'not-allowed'
    currentBtn.style.backgroundColor = '#9e1a26';
    currentBtn.style.color = 'white';
    floorAndDistrctStore.updateFloor(currentBtn.innerText.slice(0, 1))
}
//code for function
</script>
<style scoped lang='less'>
.floor {
    display: flex;
    flex-direction: column;
    width: 40px;
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
    }
}
</style>