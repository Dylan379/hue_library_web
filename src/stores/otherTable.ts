import { defineStore } from 'pinia'
export const useOtherTableStore = defineStore({
    id: 'otherTable', // id必填，且需要唯一
    state: () => {
        return {
            showOtherTable: false
        }
    },
    getters: {

    },
    actions: {
        updateShowOtherTable() {
            this.showOtherTable = !this.showOtherTable
        }
    }
})