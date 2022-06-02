import React, {memo} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import {SearchPublishedMenuItemAJAXResponse$MenuItem} from "type/api";
import {HeadCell} from "./MenuItemList";

import {px2vw} from "utils/transform";
import {colors} from "colors";

interface EnhancedTableRowProps {
    index: number;
    row: SearchPublishedMenuItemAJAXResponse$MenuItem;
    isItemSelected: boolean;
    columns: readonly HeadCell<SearchPublishedMenuItemAJAXResponse$MenuItem>[];
    handleClick: (row: SearchPublishedMenuItemAJAXResponse$MenuItem) => void;
}

export const EnhancedTableRow = memo(({index, row, isItemSelected, columns, handleClick}: EnhancedTableRowProps) => {
    return (
        <TableRow
            sx={{
                "& .MuiTableCell-body": {
                    p: "5px 16px",
                    color: row.is_active ? colors.black : colors.gray.medium,
                    "&:first-of-type": {
                        border: "none",
                    },
                    "&:nth-of-type(2)": {
                        pl: px2vw(5),
                    },
                },
            }}
            hover
            onClick={(event: any) => {
                if (event.target.className.indexOf("MuiSwitch-input") === -1) handleClick(row);
            }}
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.name}
            selected={isItemSelected}
        >
            <TableCell
                sx={{
                    width: px2vw(16),
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
                    width: px2vw(38),
                    px: `${px2vw(12)} !important`,
                }}
            />
        </TableRow>
    );
});
