// @flow
import React, {useMemo} from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import {styled} from "@mui/material/styles";
import {Order} from "../../menu/component/MenuItemList";
import {FilterOutlined, CaretUpAndDownOutlined, CaretDownOutlined, CaretUpOutlined} from "asset/icon/smallIcon";
import {SearchOrderAJAXResponse$Order} from "type/api";
import {colors} from "colors";
import {HeadCell} from "../type";

const _TableRow = styled(TableRow)(() => ({
    height: 45,
    "& .MuiTableCell-head": {
        padding: 0,
        fontWeight: 500,
        backgroundColor: colors.gray.superLight,
        ".table-column-sorter": {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            ">span:first-of-type": {
                marginRight: 8,
            },
        },
    },
}));

interface Props {
    order: Order;
    orderBy: string | null;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof SearchOrderAJAXResponse$Order) => void;
    isFilter: boolean;
}

export const OrderHistoryTableHead = ({order, orderBy, onRequestSort, isFilter}: Props) => {
    const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const headers: HeadCell<SearchOrderAJAXResponse$Order>[] = useMemo(() => {
        return [
            {
                id: "order_number",
                label: "Order",
            },
            {
                id: "order_date",
                label: "Date",
            },
            {
                id: "status",
                label: "Status",
            },
            {
                id: "customer_name",
                label: "Customer",
            },
            {
                id: "order_amount",
                label: "order_amount",
            },
            {
                id: "dining_option",
                label: "dining_option",
            },
        ];
    }, []);

    return (
        <TableHead>
            <_TableRow>
                <TableCell
                    sx={{
                        width: "16px",
                        px: "0 !important",
                    }}
                />
                {headers.map(header => (
                    <TableCell data-column={header.id} key={header.id} sx={header.sx}>
                        <div className="table-column-sorter" onClick={createSortHandler(header.id)}>
                            <span>{header.label}</span>
                            {orderBy === header.id ? (
                                <>{order ? order === "desc" ? <CaretDownOutlined fontSize="small" sx={{color: colors.primary.poblano}} /> : <CaretUpOutlined fontSize="small" sx={{color: colors.primary.poblano}} /> : <CaretUpAndDownOutlined fontSize="small" sx={{color: colors.gray.medium}} />}</>
                            ) : (
                                <CaretUpAndDownOutlined fontSize="small" sx={{color: colors.gray.medium}} />
                            )}
                        </div>
                    </TableCell>
                ))}
                <TableCell
                    sx={[
                        {
                            width: "38px",
                            p: "0 !important",
                            boxShadow: `0px 0px 1px rgba(0, 0, 0, 0.14)`,
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: isFilter ? colors.primary.poblano : colors.gray.light,
                            },
                            "& svg": {
                                color: isFilter ? colors.primary.white : colors.primary.poblano,
                            },
                        },
                        !isFilter && {
                            backgroundColor: colors.gray.superLight,
                        },
                        isFilter && {
                            backgroundColor: `${colors.primary.poblano}!important`,
                        },
                    ]}
                >
                    <FilterOutlined sx={{display: "flex", alignItems: "center", m: "0 auto", height: 45}} />
                </TableCell>
            </_TableRow>
        </TableHead>
    );
};
