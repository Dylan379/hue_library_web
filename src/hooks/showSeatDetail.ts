import { useFloorAndDistrictStore } from '../stores/floorAndDistrict';
import getSeatReserveInfo from '../api/getSeatReserveInfo';
import { useLoginStore } from '../stores/login'
import { ElMessage } from 'element-plus';
export default function showSeatDetail(table: number, ordinal: number) {
    const floorAndDistrictStore = useFloorAndDistrictStore();
    const loginStore = useLoginStore();
    floorAndDistrictStore.updateTable(table + '');
    floorAndDistrictStore.updateOrdinal(ordinal + '');
    getSeatReserveInfo();
}