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



// // export const useReserveInfoStore = defineStore({
// //     id: 'reserveInfo',

// //     state: () => {
// //         return {
// //             floor: 0,
// //             district: '',
// //             table: 0,
// //             ordinal: 0,
// //             date: '',
// //             beginTime: '',
// //             endTime: ''
// //         }
// //     },
// //     getters: {

// //     },
// //     actions: {
// //         changeReserveInfo(floor: number,
// //             district: string,
// //             table: number,
// //             ordinal: number,
// //             date: string,
// //             beginTime: string,
// //             endTime: string) {
// //             this.district = district
// //             this.table = table
// //             this.ordinal = ordinal
// //             this.date = date
// //             this.beginTime = beginTime
// //             this.endTime = endTime
// //         }
// //     }

// // })


