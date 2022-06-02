// @flow
import React from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";
import {useLoadingStatus} from "@wonder/core-fe";
import Paper from "@mui/material/Paper";
import {PaperTitle} from "./component/PaperTitle";
import {PaperSubTitle} from "./component/PaperSubTitle";

import {RootState} from "type/state";
import {Spin} from "antd";
import {PublishedMenuItemStatusAJAXView} from "type/api";
import {LOADING_MENU_ITEM_DATA} from "./type";
import {DeactivateMenuItem} from "../menu/Modal/DeactivateMenuItem";
import {Modifiers} from "./component/Modifiers";
import {useResponsive} from "../../hooks/useResponsive";
import {MenuItemDetailMobile} from "./mobile/MenuItemDetailMobile";
import {useMenuItemDetail} from "./hooks/useMenuItemDetail";

const MenuItemDetailPC = () => {
    const {state} = useLocation<{category: string; menu?: string}>();
    const {menuItem} = useSelector((state: RootState) => ({
        menuItem: state.app.menuItemDetail.menuItem,
    }));
    const loading = useLoadingStatus(LOADING_MENU_ITEM_DATA);

    const [{visible}, {toggleActivateMenuItem, onOK, onClose}] = useMenuItemDetail();

    return (
        <>
            <Spin spinning={!menuItem || loading}>
                <Paper
                    sx={{
                        border: "1px solid #D8D8D8",
                        borderRadius: "6px",
                        boxShadow: "none",
                        px: "38px",
                        pt: "25px",
                        pb: "20px",
                        mx: "70px",
                        my: "27px",
                        height: "calc(100vh - 112px)",
                        "& .paper-title, & .modifiers": {
                            opacity: menuItem?.status === PublishedMenuItemStatusAJAXView.ACTIVE ? 1 : 0.6,
                        },
                        "& .sub-modifier-box:after": {
                            opacity: menuItem?.status === PublishedMenuItemStatusAJAXView.ACTIVE ? 1 : 0.6,
                        },
                    }}
                >
                    {menuItem && (
                        <>
                            <PaperTitle />
                            <PaperSubTitle menuItem={menuItem} handleChange={val => toggleActivateMenuItem?.(val)} />
                            <Modifiers groups={menuItem.modifier_groups} />
                        </>
                    )}
                </Paper>
            </Spin>

            <DeactivateMenuItem visible={visible!} name={menuItem?.base_info.name} categoryName={state?.category} onClose={onClose!} onOk={onOK!} />
        </>
    );
};

export const MenuItemDetail = () => {
    const screen = useResponsive();
    if (screen.xs) {
        return <MenuItemDetailPC />;
    }
    return <MenuItemDetailMobile />;
};
