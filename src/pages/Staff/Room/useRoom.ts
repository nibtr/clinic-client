import { useGetRooms } from '@/services/staff/services';

function getData() {
    const { data, isLoading } = useGetRooms();
    return {
        listRoom: data?.data || [],
        isLoading
    }
}

function useRoom() {
    const { listRoom, isLoading } = getData();

    return {
        listRoom,
        isLoading
    }
}

export default useRoom;