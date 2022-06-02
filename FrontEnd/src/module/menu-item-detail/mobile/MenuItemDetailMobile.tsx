// @flow
import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {useLocation} from "react-router";

import Box from "@mui/material/Box";

import {RootState} from "type/state";
import {PublishedMenuItemStatusAJAXView} from "type/api";
import {mpx2vw} from "utils/transform";
import {Banner} from "./component/Banner";

import {PaperTitle} from "../component/PaperTitle";
import {PaperSubTitle} from "./component/PaperSubTitle";
import {Modifiers} from "./component/Modifiers";
import {useMenuItemDetail} from "../hooks/useMenuItemDetail";
import {DeactivateMenuItem} from "module/menu/Modal/DeactivateMenuItem";
import {Spin} from "antd";
import {useLoadingStatus} from "@wonder/core-fe";
import {LOADING_MENU_ITEM_DATA} from "../type";
import {useSize} from "ahooks";

export const MenuItemDetailMobile = () => {
    const {state} = useLocation<{category: string; menu?: string}>();
    const {menuItem} = useSelector((state: RootState) => ({
        menuItem: state.app.menuItemDetail.menuItem,
    }));
    const [{visible}, {toggleActivateMenuItem, onOK, onClose}] = useMenuItemDetail();
    const loading = useLoadingStatus(LOADING_MENU_ITEM_DATA);
    const divRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(0);

    const isActive = menuItem?.status === PublishedMenuItemStatusAJAXView.ACTIVE;
    const imgUrl = menuItem?.logo_image ? `/image/${menuItem.logo_image.image_key}` : isActive ? require("asset/img/menu-item-active-logo.png") : require("asset/img/menu-item-deactivate-logo.png");
    const size = useSize(document.body);

    useEffect(() => {
        if (divRef.current) {
            setHeight(window.innerHeight - divRef.current.getBoundingClientRect().top);
        }
    }, [size]);

    return (
        <>
            <Spin spinning={!menuItem || loading}>
                <PaperTitle />

                <Box
                    component="div"
                    ref={divRef}
                    sx={{
                        height: mpx2vw(height),
                        overflowY: "overlay",
                        opacity: isActive ? 1 : 0.6,
                        "& .sub-modifier-box:after": {
                            opacity: isActive ? 1 : 0.6,
                        },
                    }}
                >
                    {menuItem && (
                        <>
                            {menuItem?.logo_image ? (
                                <Box
                                    sx={{
                                        backgroundImage: `url('${imgUrl}')`,
                                        height: mpx2vw(197),
                                        backgroundPosition: "center",
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                    }}
                                />
                            ) : (
                                <Banner isActive={isActive} />
                            )}
                            <PaperSubTitle menuItem={menuItem} handleChange={val => toggleActivateMenuItem?.(val)} />
                            <Modifiers groups={menuItem.modifier_groups} />
                        </>
                    )}
                </Box>
            </Spin>
            <DeactivateMenuItem visible={visible!} name={menuItem?.base_info.name} categoryName={state?.category} onClose={onClose!} onOk={onOK!} />
        </>
    );
};
