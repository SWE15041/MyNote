import React, {useMemo, useState} from "react";
import {useLoadingStatus} from "@wonder/core-fe";
import "./filter.less";
import {SortBy, orderBy, LOADING_MENU_ITEM_LIST} from "../type";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import RadioGroup from "@mui/material/RadioGroup";
import {Radio} from "widget/MuiRadio";
import {FormControlLabel} from "@mui/material";
import Block from "widget/Block";
import {mpx2vw} from "utils/transform";
import {colors} from "colors";

import {CaretDownOutlined, CaretUpAndDownOutlined, CaretUpOutlined} from "asset/icon";
import {FilterOutlined} from "asset/icon/smallIcon";
import {FilterPopover} from "./FilterPopover";
import {useSelector} from "react-redux";
import {RootState} from "type/state";
import {isEqual} from "lodash";
import {Spin} from "antd";

const SortList = ({value, onChange, onClose}: {onClose: () => void; value: string | null; onChange: (v: string | null) => void}) => {
    return (
        <Box
            sx={{
                p: `${mpx2vw(22)} ${mpx2vw(23)} ${mpx2vw(30)} ${mpx2vw(26)}`,
            }}
        >
            <Stack
                sx={{
                    mb: mpx2vw(30),
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                direction="row"
            >
                <Box
                    component="h3"
                    sx={{
                        fontSize: mpx2vw(20),
                        lineHeight: mpx2vw(30),
                        fontWeight: 400,
                        mb: 0,
                    }}
                >
                    Sort by
                </Box>
                <Box
                    component="a"
                    sx={{
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(24),
                        fontWeight: 400,
                        textDecoration: "underline",
                    }}
                    onClick={() => {
                        onChange(null);
                        onClose();
                    }}
                >
                    Clear All
                </Box>
            </Stack>
            <RadioGroup
                value={value}
                onChange={(event, val) => {
                    onChange(val);
                    onClose();
                }}
            >
                <Stack>
                    {SortBy.map(item => {
                        return (
                            <FormControlLabel
                                sx={{
                                    ml: 0,
                                    "& .MuiTypography-root": {
                                        flexGrow: 1,
                                        fontSize: mpx2vw(14),
                                        lineHeight: mpx2vw(30),
                                        color: colors.black,
                                        fontFamily: theme => theme.typography.fontFamily,
                                    },
                                }}
                                value={item.value || ""}
                                labelPlacement="start"
                                key={item.value}
                                control={<Radio />}
                                label={item.name}
                            />
                        );
                    })}
                </Stack>
            </RadioGroup>
        </Box>
    );
};

const defaultValue = {
    active: false,
    inactive: false,
    withModifier: false,
    withoutModifier: false,
    min: "",
    max: "",
};

interface FilterProps {
    sortValue: string | null;
    onSetSortValue: (v: string | null) => void;
    nameKey: string;
}

const Filter = (props: FilterProps) => {
    const {filterOption} = useSelector((state: RootState) => ({filterOption: state.app.menu.filterOption}));
    const loading = useLoadingStatus(LOADING_MENU_ITEM_LIST);
    const {sortValue, onSetSortValue, nameKey} = props;
    const [showSortStatus, setShowSortStatus] = useState(false);
    const [filterDrawerVisible, setFilterDrawerVisible] = useState(false);

    const [orderKey] = (sortValue && sortValue.split(",")) || [];

    const scrollToTop = () => {
        const menuListDOM = document.getElementById("menu-list-body-id");
        if (menuListDOM) {
            menuListDOM.scrollTop = 0;
        }
    };

    const isFilter = useMemo(() => {
        return filterOption ? !isEqual(filterOption, defaultValue) : false;
    }, [filterOption]);

    return (
        <Stack
            direction="row"
            sx={{
                bgcolor: "#F8F8F8",
                "&>div": {
                    height: mpx2vw(50),
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: mpx2vw(5),
                    borderTopRightRadius: mpx2vw(5),
                },
            }}
        >
            <Box
                onClick={() => setShowSortStatus(pre => !pre)}
                sx={{
                    height: mpx2vw(50),
                    borderRight: "1px solid #E8E8E8",
                    color: orderKey ? colors.primary.poblano : colors.black,
                    fontWeight: orderKey ? 700 : 400,
                    fontFamily: theme => theme.typography.fontFamily,
                    "& .envoy-icon": {
                        color: orderKey ? colors.primary.poblano : colors.gray.medium,
                    },
                }}
            >
                {/* (active sort) This is an inverted sort icon */}
                <Block show={nameKey === "is_active"}>{orderKey ? orderKey !== orderBy.asc ? <CaretUpOutlined /> : <CaretDownOutlined /> : <CaretUpAndDownOutlined />}</Block>

                {/*It is a normal sort icon*/}
                <Block show={nameKey !== "is_active"}>{orderKey ? orderKey === orderBy.asc ? <CaretUpOutlined /> : <CaretDownOutlined /> : <CaretUpAndDownOutlined />}</Block>

                <span style={{marginLeft: mpx2vw(4)}}>Sort by</span>
            </Box>
            <div onClick={() => setFilterDrawerVisible(true)}>
                <FilterOutlined fontSize="medium" sx={{color: isFilter ? colors.primary.poblano : colors.gray.medium}} />
                <span
                    style={{
                        marginLeft: mpx2vw(2),
                        color: isFilter ? colors.primary.poblano : colors.black,
                        fontWeight: isFilter ? 700 : 400,
                    }}
                >
                    Filter
                </span>
            </div>
            <Drawer anchor="bottom" open={showSortStatus} onClose={() => setShowSortStatus(false)}>
                <SortList
                    value={sortValue}
                    onChange={onSetSortValue}
                    onClose={() => {
                        setShowSortStatus(false);
                        scrollToTop();
                    }}
                />
            </Drawer>
            <Drawer anchor="bottom" open={filterDrawerVisible} onClose={() => setFilterDrawerVisible(false)}>
                <Spin spinning={loading}>
                    <FilterPopover
                        visible={filterDrawerVisible}
                        onClose={() => {
                            setFilterDrawerVisible(false);
                        }}
                    />
                </Spin>
            </Drawer>
        </Stack>
    );
};
export default Filter;
