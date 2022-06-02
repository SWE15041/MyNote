import {useSelector} from "react-redux";
import {RootState} from "../type/state";
import {GlobalLoadingKey} from "../module/main/type";

export const useGlobalLoading = () => {
    const loadingState = useSelector((state: RootState) => state.loading);

    const loading = GlobalLoadingKey.some(key => loadingState[key] > 0);

    return [loading];
};
