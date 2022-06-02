// @flow
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import {ColumnCell} from "../type";
import {SearchOrderAJAXResponse$Order} from "type/api";
import {OrderHistoryTableRow} from "./OrderHistoryTableRow";

type Props = {
    columns: ColumnCell<SearchOrderAJAXResponse$Order>[];
    dataSource: SearchOrderAJAXResponse$Order[];
};
export const OrderHistoryTableBody = (props: Props) => {
    const {columns, dataSource} = props;

    if (!dataSource.length) return null;

    return (
        <Table>
            <TableBody>
                {dataSource.map((row, index) => {
                    return <OrderHistoryTableRow key={row.id} index={index} row={row} columns={columns} />;
                })}
            </TableBody>
        </Table>
    );
};
