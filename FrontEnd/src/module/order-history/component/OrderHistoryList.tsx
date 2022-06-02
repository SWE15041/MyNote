// @flow
import React, {useMemo, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";
import {OrderHistoryTableHead} from "./OrderHistoryTableHead";
import {Order} from "module/menu/component/MenuItemList";
import {SearchOrderAJAXResponse$Order} from "type/api";

import {Footer} from "module/menu/style";
import {RootState} from "type/state";
import {actions} from "module/order-history/module";
import {ColumnCell} from "../type";
import {OrderHistoryTableBody} from "./OrderHistoryTableBody";
import useSize from "ahooks/lib/useSize";

const createData = () => {
    const arr = new Array(25).fill(0);
    return arr.map(
        (item, index) =>
            ({
                id: index + "",
                order_number: index + "order_number",
                order_date: new Date(),
                status: index + "status",
                customer_name: index + "customer_name",
                order_amount: Math.random(),
                dining_option: index + "dining_option",
                item_quantity: Math.random(),
                containsRefund: false,
                refund_amount: null,
            } as SearchOrderAJAXResponse$Order)
    );
};

const data = createData();

export const OrderHistoryList = () => {
    const dispatch = useDispatch();
    const {query} = useSelector((state: RootState) => ({
        query: state.app.orderHistory.query,
    }));
    const size = useSize(document.body);
    const [order, setOrder] = React.useState<Order>(null);
    const [orderBy, setOrderBy] = React.useState<null | keyof SearchOrderAJAXResponse$Order>(null);
    const tableRef = useRef<HTMLDivElement | null>(null);

    const height = useMemo(() => {
        return tableRef.current ? window.innerHeight - tableRef.current.getBoundingClientRect().top - 104 : 500;
    }, [size]);

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof SearchOrderAJAXResponse$Order) => {
        const isSameColumn = orderBy === property;
        if (isSameColumn) {
            switch (order) {
                case "asc":
                    setOrder("desc");
                    break;
                case "desc":
                    setOrder(null);
                    break;
                default:
                    setOrder("asc");
                    break;
            }
        } else {
            setOrder("asc");
            setOrderBy(property);
        }
    };

    const columns: ColumnCell<SearchOrderAJAXResponse$Order>[] = useMemo(() => {
        return [
            {
                id: "order_number",
                label: "Order",
                align: "center",
            },
            {
                id: "order_date",
                label: "Date",
                align: "center",
                render: (value: Date) => value.toLocaleString(),
            },
            {
                id: "status",
                label: "Status",
                align: "center",
            },
            {
                id: "customer_name",
                label: "Customer",
                align: "center",
            },
            {
                id: "order_amount",
                label: "order_amount",
                align: "center",
            },
            {
                id: "dining_option",
                label: "dining_option",
                align: "center",
            },
        ];
    }, []);

    return (
        <Paper
            sx={{
                mt: 3,
                bgcolor: "#fdfdfd",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
            }}
        >
            <TableContainer>
                <Table sx={{tableLayout: "fixed"}} stickyHeader aria-label="sticky table">
                    <OrderHistoryTableHead order={order} orderBy={orderBy} isFilter={false} onRequestSort={handleRequestSort} />
                </Table>
                <TableContainer ref={tableRef} sx={{maxHeight: height, overflowY: "overlay"}}>
                    <OrderHistoryTableBody columns={columns} dataSource={data} />
                </TableContainer>
            </TableContainer>
            <Footer>
                <Stack direction="row" justifyContent="space-between">
                    Showing 25/110 results
                    <Pagination count={10} page={query.page} color="primary" size="small" onChange={(_, page) => dispatch(actions.setQuery({page}))} />
                </Stack>
            </Footer>
        </Paper>
    );
};
