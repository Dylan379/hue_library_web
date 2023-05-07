import { defineStore } from 'pinia'
import { AvailableSeatRequstBody } from "../interface/availableSeatRequstInterface";
import { AvailableSeatInfo } from '../interface/availableSeatInfoInterface';
// let availableSeatRequstBody: AvailableSeatRequstBody;
let availableSeatInfoData: AvailableSeatInfo[];


export const useAvailableSeatStore = defineStore({
    id: 'availableSeat', // id必填，且需要唯一
    state: () => {
        return {
            showOtherTable: false,
            availableSeatRequstBody: {
                beginTime: "",
                date: "",
                district: "",
                endTime: "",
                floor: ""
            },
            availableSeatInfoData
        }
    },
    getters: {

    },
    actions: {
        updateShowOtherTable() {
            this.showOtherTable = !this.showOtherTable;
        },
        changeAvailableSeatRequstBody(availableSeatRequstBody: AvailableSeatRequstBody) {
            this.availableSeatRequstBody = availableSeatRequstBody;
        },
        changeAvailableSeatInfoData(availableSeatInfoData: Array<AvailableSeatInfo>) {
            this.availableSeatInfoData = availableSeatInfoData;
        }
    }
})