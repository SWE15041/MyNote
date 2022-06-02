import React, {useMemo} from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {px2vh, px2vw} from "utils/transform";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import {CaretDownOutlined, CaretUpAndDownOutlined, CaretUpOutlined} from "asset/icon";
import {Order, Data} from "./MenuItemList";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {colors} from "colors";
import {FilterPopover} from "./FilterPopover";
import {IFormInput} from "../type";
import {isEqual} from "lodash";

const defaultValue = {
    active: false,
    inactive: false,
    withModifier: false,
    withoutModifier: false,
    min: "",
    max: "",
};

interface HeadCell {
    id: keyof Data;
    label: string;
    sx?: SxProps<Theme>;
    align?: "left" | "right" | "center";
}

interface EnhancedTableProps {
    order: Order;
    orderBy: string | null;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    categoryId: string | null;
    tableColumnWidth: string;
    filterOption: IFormInput | null;
}

export const EnhancedTableHead = ({order, orderBy, onRequestSort, categoryId, tableColumnWidth, filterOption}: EnhancedTableProps) => {
    const createSortHandler = (property: any) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    const headers: HeadCell[] = useMemo(
        () => [
            {
                id: "name",
                label: "Item Name",
            },
            {
                id: "has_modifier",
                label: "Modifiers",
                align: "center",
                sx: {
                    width: tableColumnWidth,
                    "& .table-column-sorter > span": {
                        color: filterOption?.withModifier || filterOption?.withoutModifier ? colors.primary.poblano : colors.black,
                    },
                },
            },
            {
                id: "category",
                label: "Category",
                sx: {
                    width: tableColumnWidth,
                },
            },
            {
                id: "price",
                label: "Price",
                sx: {
                    width: tableColumnWidth,
                    "& .table-column-sorter > span": {
                        color: filterOption?.min || filterOption?.max ? colors.primary.poblano : colors.black,
                    },
                },
            },
            {
                id: "is_active",
                label: "Status",
                sx: {
                    width: tableColumnWidth,
                    "& .table-column-sorter > span": {
                        color: filterOption?.active || filterOption?.inactive ? colors.primary.poblano : colors.black,
                    },
                },
            },
        ],
        [tableColumnWidth, filterOption]
    );

    const isFilter = useMemo(() => {
        return filterOption ? !isEqual(filterOption, defaultValue) : false;
    }, [filterOption]);

    return (
        <TableHead>
            <TableRow
                sx={{
                    "& .MuiTableCell-head": {
                        p: `${px2vh(10)} ${px2vw(10)}`,
                        fontWeight: 500,
                        backgroundColor: "#F0F0F0",
                    },
                }}
            >
                <TableCell
                    sx={{
                        width: px2vw(16),
                        px: "0 !important",
                    }}
                />
                {headers.map(header => (
                    <TableCell data-column={header.id} key={header.id} sortDirection={orderBy === header.id ? (order ? order : false) : false} sx={header.sx}>
                        <Box className="table-column-sorter" onClick={categoryId !== null && header.id === "category" ? () => {} : createSortHandler(header.id)}>
                            <span>{header.label}</span>
                            {categoryId !== null && header.id === "category" ? null : orderBy === header.id ? <>{order ? order === "desc" ? <CaretDownOutlined className="active-icon" /> : <CaretUpOutlined className="active-icon" /> : <CaretUpAndDownOutlined />}</> : <CaretUpAndDownOutlined />}
                        </Box>
                    </TableCell>
                ))}
                <TableCell
                    sx={[
                        {
                            width: px2vw(38),
                            p: "0 !important",
                            boxShadow: `0px 0px 1px rgba(0, 0, 0, 0.14)`,
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
                    <FilterPopover />
                </TableCell>
            </TableRow>
        </TableHead>
    );
};
