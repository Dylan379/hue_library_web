import { defineStore } from 'pinia';
import { ReserveInfo } from "../interface/reserveInfoInterface";
import { OrderSeatRequestBody } from '../interface/orderSeatRequestInterface';
let reserveInfoData: ReserveInfo[];
let seatReserveInfoData: ReserveInfo[];
let orderSeatRequestBody: OrderSeatRequestBody;

export const useReserveInfoStore = defineStore({
    id: 'reserveInfo',
    state: () => {
        return {
            isShowReserveInfoData: true,
            reserveInfoData,
            seatReserveInfoData,
            orderSeatRequestBody,
            isLoading: false
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
        },
        changeSeatReserveInfoData(seatReserveInfoData: Array<ReserveInfo>) {
            this.seatReserveInfoData = seatReserveInfoData;
        },
        updateOrderSeatRequestBody(orderSeatRequestBody: OrderSeatRequestBody) {
            this.orderSeatRequestBody = orderSeatRequestBody;
        }
    }
})