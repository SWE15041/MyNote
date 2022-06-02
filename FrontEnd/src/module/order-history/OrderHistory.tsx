import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import Box from "@mui/material/Box";
import {OrderHistoryDatePicker} from "./component/OrderHistoryDatePicker";
import {RootState} from "type/state";
import useUrlState from "@ahooksjs/use-url-state";
import {Query} from "./type";
import {OrderHistoryList} from "./component/OrderHistoryList";

const translateToUrlState = (state: Query) => {
    const _state = {} as any;
    const {startTime, endTime, ...reset} = state;
    _state.startTime = startTime ? startTime.toDate().getTime() : null;
    _state.endTime = endTime ? endTime.toDate().getTime() : null;
    return {..._state, ...reset};
};
import {OrdersSummaryPC, OrdersSummaryMobile} from "./component/OrdersSummary";
import {useResponsive} from "hooks/useResponsive";
import "./orderHistory.less";

const OrderHistory = () => {
    const {query} = useSelector((state: RootState) => ({
        query: state.app.orderHistory.query,
    }));
    const [, setState] = useUrlState();
    const screens = useResponsive();

    useEffect(() => {
        setState(translateToUrlState(query));
    }, [query]);

    return (
        <Box
            className="order-history-page"
            sx={{
                p: 4,
            }}
        >
            <Box component="h1" sx={{fontSize: "20px", fontWeight: 400, mb: "20px"}}>
                Order History
            </Box>
            <OrderHistoryDatePicker startTime={query.startTime} endTime={query.endTime} />
            {screens.xs ? <OrdersSummaryPC /> : <OrdersSummaryMobile />}
            <OrderHistoryList />
        </Box>
    );
};

export default OrderHistory;
