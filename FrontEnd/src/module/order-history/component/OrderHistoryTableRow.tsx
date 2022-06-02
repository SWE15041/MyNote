// @flow
import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {styled} from "@mui/material/styles";

import {ColumnCell} from "../type";
import {SearchOrderAJAXResponse$Order} from "type/api";

import {colors} from "colors";

type Props = {
    columns: ColumnCell<SearchOrderAJAXResponse$Order>[];
    row: SearchOrderAJAXResponse$Order;
    index: number;
};

const _TableRow = styled(TableRow)(() => ({
    "& .MuiTableCell-body": {
        padding: 0,
        color: colors.black,
        fontSize: 14,
        lineHeight: "32px",
        fontWeight: 400,
        height: 45,
        "&:first-of-type": {
            border: "none",
        },
        "&:nth-of-type(2)": {
            paddingLeft: 5,
        },
    },
}));

export const OrderHistoryTableRow = (props: Props) => {
    const {columns, row, index} = props;
    return (
        <_TableRow hover tabIndex={-1} key={row.id}>
            <TableCell
                sx={{
                    width: 16,
                    px: "0 !important",
                }}
            />
            {columns.map(column => {
                const value = row[column.id];
                return (
                    <TableCell key={column.id} align={column.align}>
                        {column.render ? column.render(value, row, index) : value}
                    </TableCell>
                );
            })}
            <TableCell
                sx={{
                    width: "38px",
                    // px: `${px2vw(12)} !important`,
                    px: 0,
                }}
            />
        </_TableRow>
    );
};
