import { defineStore } from 'pinia'
import { ReserveSeat } from '../interface/reserveSeatInterface';
import { OrderedSeat } from '../interface/reserveSeatDBTInterface';
let reserveSeatData: ReserveSeat[];
let orderedSeatData: OrderedSeat[][];
export const useFloorAndDistrictStore = defineStore({
    id: 'floorAndDistrict', // id必填，且需要唯一
    state: () => {
        return {
            floor: '1',
            district: 'A',
            reserveSeatData,
            orderedSeatData
        }
    },
    getters: {

    },
    actions: {
        updateFloor(floor: string) {
            this.floor = floor;
        },
        updateDistrict(district: string) {
            this.district = district;
        },
        upDateReserveSeatData(reserveSeatData: Array<ReserveSeat>) {
            this.reserveSeatData = reserveSeatData;
        },
        upDateOrderedSeatDataData(orderedSeatData: Array<Array<OrderedSeat>>) {
            this.orderedSeatData = orderedSeatData;
        }

    }
})