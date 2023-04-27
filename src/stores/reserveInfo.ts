import { defineStore } from 'pinia';
import { ReserveInfo } from "../interface/reserveInfoInterface";
let reserveInfoData: ReserveInfo[];

export const useReserveInfoStore = defineStore({
    id: 'reserveInfo',
    state: () => {
        return {
            isShowReserveInfoData: true,
            reserveInfoData
        }
    },
    getters: {
    },
    actions: {
        changeReserveInfo() {
            this.isShowReserveInfoData = !this.isShowReserveInfoData
        },
        changeReserveInfoData(reserveInfoData: Array<ReserveInfo>) {
            this.reserveInfoData = reserveInfoData
        }
    }
})