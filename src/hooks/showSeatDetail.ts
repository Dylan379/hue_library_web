import { useFloorAndDistrictStore } from '../stores/floorAndDistrict';
import getSeatReserveInfo from '../api/getSeatReserveInfo';
import { useLoginStore } from '../stores/login'
import { ElMessage } from 'element-plus';
export default function showSeatDetail(table: number, ordinal: number) {
    const floorAndDistrictStore = useFloorAndDistrictStore();
    const loginStore = useLoginStore();
    if (loginStore.isLogin) {
        floorAndDistrictStore.updateTable(table + '');
        floorAndDistrictStore.updateOrdinal(ordinal + '');
        getSeatReserveInfo();
    } else {
        ElMessage({
            showClose: false,
            message: '不妨先登录.',
            type: 'warning'
        })
    }
}