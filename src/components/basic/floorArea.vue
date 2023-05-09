<template>
    <div class="floorArea">
        <button @click="change" class="first">A区</button>
        <button @click="change" class="second">B区</button>
        <button @click="change" class="third">C区</button>
        <button @click="change" class="forth">D区</button>
    </div>
</template>

<script setup lang='ts'>
import { onMounted } from 'vue';
import { useFloorAreaStore } from '../../stores/floorArea';
import { useFloorAndDistrictStore } from '../../stores/floorAndDistrict';
const areaStore = useFloorAreaStore();
const floorAndDistrctStore = useFloorAndDistrictStore();
onMounted(() => {
    const container1 = document.querySelector(".floorArea");
    const btn1 = container1!.querySelector('.first');
    const firstBtn = (btn1 as HTMLButtonElement);
    firstBtn.style.backgroundColor = '#9e1a26';
    firstBtn.style.color = 'white';
    firstBtn.style.cursor = 'not-allowed';
    firstBtn.disabled = true;
})
const change = (e: Event) => {
    let currentBtn = (e.target as HTMLButtonElement);
    let container = document.querySelector(".floorArea");
    let btn = container!.querySelectorAll('.floorArea > button');
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
    areaStore.updateFloorArea('district' + (currentBtn.innerText).slice(0, 1))
    floorAndDistrctStore.updateDistrict(currentBtn.innerText.slice(0, 1))
}
//code for function

</script>
<style scoped lang='less'>
.floorArea {
    margin-top: 15px;
    display: flex;
    max-width: 10vw;
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
    }

    .forth {
        border-radius: 0 5px 5px 0;
        border-right: 1px solid #e4e7ed;
    }
}
</style>