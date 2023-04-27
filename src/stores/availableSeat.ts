import { defineStore } from 'pinia'
import { AvailableSeatInfo } from "../interface/availableSeatRequstInterface";
let availableSeatInfoData: AvailableSeatInfo;

export const useAvailableSeatStore = defineStore({
    id: 'otherTable', // id必填，且需要唯一
    state: () => {
        return {
            showOtherTable: false,
            availableSeatInfoData
        }
    },
    getters: {

    },
    actions: {
        updateShowOtherTable() {
            this.showOtherTable = !this.showOtherTable
        },
        changeAvailableSeatInfoData(availableSeatInfoData: AvailableSeatInfo) {
            this.availableSeatInfoData = availableSeatInfoData
        }
    }
})