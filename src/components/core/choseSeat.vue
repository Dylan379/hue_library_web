<template>
  <div class=''>
    <component :is="comID"></component>
  </div>
</template>

<script setup lang='ts'>
import { shallowRef, watch } from 'vue';
import districtA from '../../components/core/districtA.vue';
import districtB from '../../components/core/districtB.vue';
import districtC from '../../components/core/districtC.vue';
import districtD from '../../components/core/districtD.vue';
import { storeToRefs } from 'pinia'
import { useFloorAreaStore } from '../../stores/floorArea';
const storeFloorArea = useFloorAreaStore()
const { showFloorArea } = storeToRefs(storeFloorArea)
let comID = shallowRef(districtA)
watch(showFloorArea, () => {
  switch (showFloorArea.value) {
    case "districtA":
      comID.value = districtA
      break;
    case "districtB":
      comID.value = districtB
      break;
    case "districtC":
      comID.value = districtC
      break;
    case "districtD":
      comID.value = districtD
      break;
    default:
      break;
  }
})


</script>
<style scoped lang='less'></style>