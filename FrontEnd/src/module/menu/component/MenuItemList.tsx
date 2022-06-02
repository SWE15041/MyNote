import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {Spin} from "antd";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import {produce} from "immer";
import {Switch} from "widget/MuiSwitch";
import {ReactivateCategory} from "../Modal/ReactivateCategory";
import {useLocation} from "react-router";
import {useGlobalLoading} from "hooks/useGlobalLoading";
import {ModifierActivateOutline, ModifierDeactivateOutline, MenuItemDefaultLogoActivate, MenuItemDefaultLogoDeactivate} from "asset/icon";

import {RenderedCell} from "rc-table/lib/interface";
import {MPPublishedMenuItemStatusAJAXView, SearchPublishedMenuItemAJAXResponse$MenuItem, SearchPublishedMenuItemAJAXResponse$ModifierGroup, UpdateCategoryStatusAJAXRequest, UpdatePublishedMenuItemStatusAJAXRequest} from "../../../type/api";

import {fixedDeductedNumber} from "utils/format";
import {flatModifierGroup, bolderKeywords, px2vh, px2vw} from "../utils";

import {NoData} from "./NoData";
import {useUnaryAction} from "@wonder/core-fe";
import {actions} from "../module";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "type/state";

import {EnhancedTableHead} from "./EnhancedTableHead";
import {EnhancedTableBody} from "./EnhancedTableBody";
import {MenuSidePanel} from "./MenuSidePanel";

import {colors} from "colors";
import {DeactivateMenuItem} from "../Modal/DeactivateMenuItem";
import {DeactivateCategory} from "../Modal/DeactivateCategory";
import {Root, Footer} from "../style";

export type Data = Omit<SearchPublishedMenuItemAJAXResponse$MenuItem, "modifier_groups">;
export type Order = "asc" | "desc" | null;
export interface HeadCell<RecordType = unknown> {
    id: keyof Data;
    label: string;
    sx?: SxProps<Theme>;
    align?: "left" | "right" | "center";
    render?: (value: any, record: RecordType, index: number) => React.ReactNode | RenderedCell<RecordType>;
}

type Props = {
    menuItems: SearchPublishedMenuItemAJAXResponse$MenuItem[];
    total: number;
    loading: boolean;
    filterItemName: string | null;
    categoryId: string | null;
    categoryName?: string;
    selectedCategoryStatus: boolean;
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (orderBy === "is_active" || orderBy === "has_modifier") {
        return Number(a[orderBy]) - Number(b[orderBy]);
    } else {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }
}

function getComparator(order: Order, orderBy: keyof Data): (a: Data, b: Data) => number {
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function bolderModifyText(item: SearchPublishedMenuItemAJAXResponse$ModifierGroup[], filterItemName: string | null) {
    if (filterItemName) {
        const arr = flatModifierGroup(item, filterItemName);
        return arr.length > 0 ? bolderKeywords(arr.join(", "), filterItemName) : null;
    } else {
        return null;
    }
}

const SearchResult = ({text}: {text: string | null}) => {
    if (!text) return null;
    return (
        <Box
            component="p"
            sx={{
                m: 0,
                pl: "8px",
                pt: "3px",
                lineHeight: "20px",
                position: "relative",
                "&::before": {
                    position: "absolute",
                    content: '""',
                    borderLeft: "1px dashed #797979",
                    top: 0,
                    left: 0,
                    bottom: "4px",
                },
            }}
        >
            <span style={{color: colors.gray.medium, fontWeight: 700}}>Contains: </span>
            <span dangerouslySetInnerHTML={{__html: text}} />
        </Box>
    );
};

export function MenuItemList({selectedCategoryStatus, menuItems, total, loading, filterItemName, categoryId, categoryName}: Props) {
    const dispatch = useDispatch();
    const {navigationBarOpen, selectedMenuItem, filterOption} = useSelector((state: RootState) => ({
        navigationBarOpen: state.app.main.navigationBarOpen,
        selectedMenuItem: state.app.menu.selectedMenuItem,
        filterOption: state.app.menu.filterOption,
    }));
    const [order, setOrder] = React.useState<Order>(null);
    const [orderBy, setOrderBy] = React.useState<null | keyof Data>(null);
    const setSelectedMenuItem = useUnaryAction(actions.setSelectedMenuItem);
    const location = useLocation();
    const [globalLoading] = useGlobalLoading();
    const [toggleCategoryStatus, setToggleCategoryStatus] = useState<"active" | "inactive" | null>(null);
    const [deactivateMenuItem, setDeactivateMenuItem] = useState<SearchPublishedMenuItemAJAXResponse$MenuItem | null>(null);
    const [deactivateMenuItemVisible, setDeactivateMenuItemVisible] = useState(false);
    const getMenuItem = useUnaryAction(actions.getMenuItem);
    const tableRef = useRef<HTMLDivElement | null>(null);

    const dataSource = useMemo(() => {
        return produce(menuItems, draft => (order && orderBy ? draft.sort(getComparator(order, orderBy)) : draft));
    }, [order, orderBy, menuItems]);

    const tableHeight = useMemo(() => {
        const statusHeight = categoryId === null ? 0 : 45;

        const height = 58 + 31 + 17 + 32 + 77 + 46 + 71 + statusHeight + 1;
        return `calc(100vh - ${height}px)`;
    }, [categoryId]);

    const noDataHeight = useMemo(() => {
        const statusHeight = categoryId === null ? 0 : 45;
        const height = 30 + 45 + statusHeight;
        return `calc(${px2vh(807)} - ${height}px)`;
    }, [categoryId]);

    const tableColumnWidth = useMemo(() => {
        if (navigationBarOpen) {
            return px2vw(selectedMenuItem ? 95 : 124);
        } else {
            return px2vw(selectedMenuItem ? 106 : 138);
        }
    }, [navigationBarOpen, selectedMenuItem]);

    const toggleActivateMenuItem = (val: boolean, menu_item: SearchPublishedMenuItemAJAXResponse$MenuItem) => {
        // inactive
        if (!val) {
            setDeactivateMenuItem(menu_item);
            setDeactivateMenuItemVisible(true);
        } else {
            //active, do not display modal
            const request = {
                status: MPPublishedMenuItemStatusAJAXView.ACTIVE,
                inactive_type: null,
                duration_hours: null,
            };
            dispatch(actions.updateMenuItemStatus(menu_item.menu_item_id, request));
        }
    };

    const columns: readonly HeadCell<SearchPublishedMenuItemAJAXResponse$MenuItem>[] = useMemo(
        () => [
            {
                id: "name",
                label: "Item Name",
                render: (value, record) => {
                    const text = bolderModifyText(record.modifier_groups, filterItemName);
                    return (
                        <div className="item-name" style={{alignItems: text ? "flex-start" : "center"}}>
                            {record.logo_image?.image_key ? (
                                <Box
                                    component="img"
                                    sx={{
                                        opacity: record.is_active ? 1 : 0.75,
                                    }}
                                    src={`/image/${record.logo_image?.image_key}`}
                                    alt="menuItemPage"
                                    className="logo"
                                />
                            ) : record.is_active ? (
                                <MenuItemDefaultLogoActivate className="logo" />
                            ) : (
                                <MenuItemDefaultLogoDeactivate className="logo" />
                            )}
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    overflow: "hidden",
                                }}
                            >
                                <p className="title">{filterItemName ? <span dangerouslySetInnerHTML={{__html: bolderKeywords(record.name, filterItemName)}} /> : record.name}</p>
                                <SearchResult text={text} />
                            </Box>
                        </div>
                    );
                },
            },
            {
                id: "has_modifier",
                label: "Modifiers",
                align: "center",
                render: (value, record) => (value ? record.is_active ? <ModifierActivateOutline /> : <ModifierDeactivateOutline /> : "-"),
            },
            {
                id: "category",
                label: "Category",
                render: value => <div className="category">{value}</div>,
            },
            {
                id: "price",
                label: "Price",
                render: value => fixedDeductedNumber(value),
            },
            {
                id: "is_active",
                label: "Status",
                render: (value, row) => (
                    <Switch
                        checked={value}
                        onChange={(_, value) => {
                            toggleActivateMenuItem(value, row);
                        }}
                    />
                ),
            },
        ],
        [fixedDeductedNumber, toggleActivateMenuItem, filterItemName]
    );

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
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
        tableRef.current && tableRef.current.scrollTo({top: 0, behavior: "smooth"});
    };

    const handleSelectedMenuItem = useCallback(
        (row: SearchPublishedMenuItemAJAXResponse$MenuItem) => {
            setSelectedMenuItem(row);
            getMenuItem(row.menu_item_id);
        },
        [getMenuItem]
    );

    useEffect(() => {
        setOrder(null);
        setOrderBy(null);
        setSelectedMenuItem(null);
        setToggleCategoryStatus(null);
    }, [location]);

    useEffect(() => {
        if (selectedMenuItem) {
            const index = dataSource.findIndex(item => item.menu_item_id === selectedMenuItem.menu_item_id);
            if (index > -1) {
                setSelectedMenuItem(dataSource[index]);
                if (tableRef.current) {
                    const $tr = tableRef.current.querySelectorAll("tr")[index];
                    if ($tr.offsetTop < tableRef.current.scrollTop || $tr.offsetTop > tableRef.current.scrollTop + tableRef.current.offsetHeight) {
                        requestAnimationFrame(() => $tr.scrollIntoView({behavior: "smooth"}));
                    }
                }
            } else {
                setSelectedMenuItem(null);
            }
        }
    }, [dataSource, selectedMenuItem]);

    return (
        <>
            <Spin spinning={loading} wrapperClassName="customer-spin">
                <Root style={{display: "flex", alignItems: "stretch"}}>
                    <Paper
                        sx={{
                            width: "100%",
                            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.11)",
                            backgroundColor: "#fcfcfc",
                        }}
                    >
                        {categoryId && (
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    height: "45px",
                                    backgroundColor: "rgba(240, 240, 240, 0.11)",
                                    "&>span:first-of-type": {
                                        display: "inline-block",
                                        pl: "20px",
                                        pr: "14px",
                                        fontWeight: 500,
                                        fontSize: 14,
                                        fontFamily: "Heebo, sans-serif, Roboto",
                                        lineHeight: "32px",
                                        color: colors.black,
                                    },
                                }}
                            >
                                <span>Category Status</span>
                                <Switch checked={selectedCategoryStatus} onChange={() => setToggleCategoryStatus(selectedCategoryStatus ? "inactive" : "active")} />
                            </Box>
                        )}
                        <TableContainer sx={{borderTopLeftRadius: "4px", borderTopRightRadius: "4px"}}>
                            <Table sx={{tableLayout: "fixed"}} stickyHeader aria-label="sticky table">
                                <EnhancedTableHead categoryId={categoryId} order={order} orderBy={orderBy} tableColumnWidth={tableColumnWidth} filterOption={filterOption} onRequestSort={handleRequestSort} />
                            </Table>
                            <TableContainer
                                ref={tableRef}
                                sx={{
                                    maxHeight: tableHeight,
                                    overflowY: "overlay",
                                }}
                            >
                                <EnhancedTableBody tableColumnWidth={tableColumnWidth} selected={selectedMenuItem} dataSource={dataSource} columns={columns} handleClick={handleSelectedMenuItem} />
                            </TableContainer>
                        </TableContainer>
                        {menuItems.length > 0 && (
                            <Footer>
                                Showing {dataSource.length}/{total} results
                            </Footer>
                        )}
                        {dataSource.length === 0 && !globalLoading && !loading && (
                            <Stack
                                sx={{
                                    height: noDataHeight,
                                    overflowY: "overlay",
                                    justifyContent: "center",
                                }}
                            >
                                <NoData />
                            </Stack>
                        )}
                    </Paper>
                    {selectedMenuItem && (
                        <MenuSidePanel
                            isActive={selectedMenuItem.is_active}
                            categoryName={selectedMenuItem.category}
                            menuItemId={selectedMenuItem.menu_item_id}
                            handleChange={val => toggleActivateMenuItem(val, selectedMenuItem)}
                            onClose={() => {
                                setSelectedMenuItem(null);
                            }}
                            categoryId={categoryId}
                        />
                    )}
                </Root>
            </Spin>

            <DeactivateCategory visible={toggleCategoryStatus === "inactive"} categoryName={categoryName} onClose={() => setToggleCategoryStatus(null)} onOk={request => dispatch(actions.updateCategoryStatus(request as UpdateCategoryStatusAJAXRequest, () => setToggleCategoryStatus(null)))} />
            <ReactivateCategory categoryName={categoryName} visible={toggleCategoryStatus === "active"} onClose={() => setToggleCategoryStatus(null)} />

            <DeactivateMenuItem
                visible={deactivateMenuItemVisible}
                name={deactivateMenuItem?.name}
                categoryName={deactivateMenuItem?.category}
                onClose={() => {
                    setDeactivateMenuItemVisible(false);
                }}
                onOk={request => {
                    if (deactivateMenuItem) {
                        dispatch(actions.updateMenuItemStatus(deactivateMenuItem.menu_item_id, request as UpdatePublishedMenuItemStatusAJAXRequest, () => setDeactivateMenuItemVisible(false)));
                    }
                }}
            />
        </>
    );
}
