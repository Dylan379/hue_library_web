import { defineStore } from 'pinia'
export const useFloorAreaStore = defineStore({
    id: 'floorArea', // id必填，且需要唯一
    state: () => {
        return {
            showFloorArea: 'districtA'
        }
    },
    getters: {

    },
    actions: {
        updateFloorArea(district: string) {
            this.showFloorArea = district
        }
    }
})