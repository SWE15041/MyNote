// @flow
import React from "react";
import Table from "@mui/material/Table";
import {px2vw} from "../../../utils/transform";
import TableBody from "@mui/material/TableBody";
import {EnhancedTableRow} from "./EnhancedTableRow";
import {SearchPublishedMenuItemAJAXResponse$MenuItem} from "type/api";
import {HeadCell} from "./MenuItemList";

type Props = {
    dataSource: any[];
    tableColumnWidth: string;
    selected: SearchPublishedMenuItemAJAXResponse$MenuItem | null;
    columns: readonly HeadCell<SearchPublishedMenuItemAJAXResponse$MenuItem>[];
    handleClick: (row: SearchPublishedMenuItemAJAXResponse$MenuItem) => void;
};
export const EnhancedTableBody = React.memo(({tableColumnWidth, dataSource, selected, columns, handleClick}: Props) => {
    const isSelected = (name: string) => selected?.name === name;

    if (!dataSource.length) return null;

    return (
        <Table sx={{tableLayout: "fixed"}}>
            <colgroup>
                <col style={{width: px2vw(16)}} />
                <col />
                <col style={{width: tableColumnWidth}} />
                <col style={{width: tableColumnWidth}} />
                <col style={{width: tableColumnWidth}} />
                <col style={{width: tableColumnWidth}} />
                <col />
            </colgroup>
            <TableBody>
                {dataSource.map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    return <EnhancedTableRow key={row.menu_item_id} index={index} row={row} isItemSelected={isItemSelected} columns={columns} handleClick={handleClick} />;
                })}
            </TableBody>
        </Table>
    );
});
