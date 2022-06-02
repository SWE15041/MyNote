import React, {useState, useEffect} from "react";
import {useLoadingStatus} from "@wonder/core-fe";
import {useSelector, useDispatch} from "react-redux";
import {Spin} from "antd";
import Filter from "./filter";
import {RootState} from "type/state";
import {LOADING_MENU_ITEM_LIST, menuItemProps, orderBy} from "../type";
import {useGlobalLoading} from "hooks/useGlobalLoading";
import {MPPublishedMenuItemStatusAJAXView, SearchPublishedMenuItemAJAXResponse$MenuItem, UpdatePublishedMenuItemStatusAJAXRequest} from "type/api";
import {actions} from "../module";

import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import {ListItem} from "./ListItem";
import {DeactivateMenuItem} from "../Modal/DeactivateMenuItem";

import _ from "lodash";
import {mpx2vw} from "utils/transform";
import {ListHeader} from "./ListHeader";
import {NoData} from "../component/NoData";

const List = () => {
    const dispatch = useDispatch();
    const {menuItems, selectedMenu, selectedCategory} = useSelector((state: RootState) => ({
        menuItems: state.app.menu.menuItems,
        selectedMenu: state.app.menu.selectedMenu,
        selectedCategory: state.app.menu.selectedCategory,
    }));
    const [sortValue, setSortValue] = useState<string | null>(null);
    const [, setSelected] = useState<SearchPublishedMenuItemAJAXResponse$MenuItem | null>(null);
    const loading = useLoadingStatus(LOADING_MENU_ITEM_LIST);
    const [globalLoading] = useGlobalLoading();
    const [deactivateMenuItem, setDeactivateMenuItem] = useState<SearchPublishedMenuItemAJAXResponse$MenuItem | null>(null);
    const [deactivateMenuItemVisible, setDeactivateMenuItemVisible] = useState(false);

    const [orderKey, nameKey] = (sortValue && sortValue.split(",")) || [];
    const data = sortValue ? _.orderBy(menuItems, [nameKey], [orderKey as orderBy]) : menuItems;

    // handle
    const menuId = selectedMenu?.menu_id;
    const clearSort = () => {
        setSortValue(null);
    };

    const handleChange = (val: boolean, row: menuItemProps) => {
        if (!val) {
            setDeactivateMenuItem(row);
            setDeactivateMenuItemVisible(true);
        } else {
            //turn active
            const request = {
                status: MPPublishedMenuItemStatusAJAXView.ACTIVE,
                inactive_type: null,
                duration_hours: null,
            };
            dispatch(actions.updateMenuItemStatus(row.menu_item_id, request));
        }
    };

    useEffect(() => {
        clearSort();
    }, [menuId]);

    const hasData = data?.length !== 0;
    const listHeight = selectedCategory?.id ? 352 + 44 : 352;

    return (
        <>
            <Filter sortValue={sortValue} onSetSortValue={setSortValue} nameKey={nameKey} />
            <Stack>
                <ListHeader />
                <Box
                    sx={{
                        flex: 1,
                        maxHeight: `calc(100vh - ${mpx2vw(listHeight)})`,
                        overflowY: hasData ? "overlay" : "unset",
                        pr: mpx2vw(27),
                        pl: mpx2vw(36),
                        mr: mpx2vw(12),
                    }}
                >
                    <Spin spinning={loading}>
                        {hasData && (
                            <>
                                {data?.map(row => {
                                    return (
                                        <ListItem
                                            key={row.menu_item_id}
                                            row={row}
                                            onClick={() => {
                                                setSelected(row);
                                                dispatch(actions.turnToDetail(row.menu_item_id, row.category));
                                            }}
                                            onChange={val => handleChange(val, row)}
                                        />
                                    );
                                })}
                            </>
                        )}
                    </Spin>
                </Box>
                {!hasData && !globalLoading && !loading && (
                    <Stack
                        sx={{
                            height: `calc(100vh - ${mpx2vw(listHeight)})`,
                            overflow: "overlay",
                            justifyContent: "center",
                        }}
                    >
                        <NoData />
                    </Stack>
                )}
            </Stack>

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
};
export default List;
