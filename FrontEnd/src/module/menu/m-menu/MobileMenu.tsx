import React, {useState} from "react";

import EnvoySwitch from "widget/Switch";
import {Switch} from "widget/MuiSwitch";
import List from "./List";
import {useUnaryAction} from "@wonder/core-fe";
import {actions} from "../module";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "type/state";
import {Autocomplete} from "./autocomplete";
import {SearchIcon} from "asset/icon";
import Block from "widget/Block";
import {ReactivateCategory} from "../Modal/ReactivateCategory";
import {UpdateCategoryStatusAJAXRequest} from "type/api";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {SelectChangeEvent} from "@mui/material/Select";
import MenuItem, {MenuItemProps} from "@mui/material/MenuItem";
import {mpx2vw, textEllipsisOneLine} from "utils/transform";
import {colors} from "colors";
import {CustomerSelect} from "./CustomerSelect";
import {DeactivateCategory} from "../Modal/DeactivateCategory";

const Option = ({children, ...reset}: MenuItemProps) => {
    return (
        <MenuItem
            sx={{
                "@media screen and (max-width: 480px)": {
                    minHeight: "auto",
                    width: mpx2vw(343),
                    fontSize: mpx2vw(14),
                    lineHeight: mpx2vw(21),
                    px: mpx2vw(13),
                    pb: mpx2vw(11),
                    pt: 0,
                    color: colors.black,
                    "&.Mui-selected": {
                        bgcolor: "transparent !important",
                        fontWeight: 700,
                    },
                    "&:hover,&:active": {
                        bgcolor: "transparent !important",
                    },
                    "&:first-of-type": {
                        pt: mpx2vw(1),
                    },
                    "&:last-of-type": {
                        pb: mpx2vw(7),
                    },
                    "&>span:first-of-type": {
                        ...textEllipsisOneLine,
                    },
                },
            }}
            {...reset}
        >
            {children}
        </MenuItem>
    );
};

const ITEM_HEIGHT = 33;
const ITEM_PADDING_TOP = 0;

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
            width: mpx2vw(343),
            marginTop: mpx2vw(-3.5),
        },
    },
};

const MobileMenu = () => {
    const dispatch = useDispatch();
    const [showSearch, setShowSearch] = useState(true);
    const [toggleCategoryStatus, setToggleCategoryStatus] = useState<"active" | "inactive" | null>(null);
    const {selectedMenu, selectedCategory, autoCompleteOptions, selectedCategoryStatus} = useSelector((state: RootState) => ({
        selectedMenu: state.app.menu.selectedMenu,
        selectedCategory: state.app.menu.selectedCategory,
        autoCompleteOptions: state.app.menu.autoCompleteOptions,
        selectedCategoryStatus: state.app.menu.selectedCategoryStatus,
    }));
    const userInfo = useSelector((state: RootState) => state.app.restaurant.userInfo);
    const restaurantName = userInfo?.restaurant_name;
    const menuName = selectedMenu?.name;

    const setSelectedCategory = useUnaryAction(actions.setSelectedCategory);
    const setFilterItemName = useUnaryAction(actions.setFilterItemName);

    const onChange = (event: SelectChangeEvent<unknown>) => {
        const id = event.target.value;
        const optionData = selectedMenu?.categories.find(o => (o.id || "") === id);
        optionData && setSelectedCategory(optionData);
    };

    const onSearch = (val: string | null) => {
        setFilterItemName(val);
        // input keyboard
        const searchInputDOM = document.getElementById("autocomplete-input-search");
        if (searchInputDOM) {
            searchInputDOM.blur();
        }
        if (selectedMenu) {
            setSelectedCategory(selectedMenu.categories[0]);
        }
    };

    const isAll = !selectedCategory?.id;
    return (
        <>
            <Stack
                sx={{
                    fontSize: mpx2vw(14),
                    bgcolor: colors.primary.white,
                }}
            >
                <Box
                    sx={{
                        px: mpx2vw(16),
                    }}
                >
                    <Box
                        sx={{
                            fontWeight: 400,
                            lineHeight: mpx2vw(30),
                            fontSize: mpx2vw(20),
                            mb: mpx2vw(15),
                        }}
                        component="h2"
                        className="ellipsis"
                    >
                        {selectedMenu?.name}
                    </Box>
                    <Box
                        sx={{
                            mb: mpx2vw(11),
                        }}
                    >
                        <Box
                            sx={{
                                mb: mpx2vw(7),
                            }}
                        >
                            <CustomerSelect MenuProps={MenuProps} value={selectedCategory?.id || ""} displayEmpty onChange={onChange}>
                                {selectedMenu?.categories.map(item => {
                                    return (
                                        <Option key={item.id || ""} value={item.id || ""}>
                                            <>
                                                <span>{item.id ? item.name : "All Items"}</span>
                                                <span>({item.number_of_items})</span>
                                            </>
                                        </Option>
                                    );
                                })}
                            </CustomerSelect>
                            <Block show={!showSearch}>
                                <span className="search-group-btn" onClick={() => setShowSearch(true)}>
                                    <SearchIcon />
                                </span>
                            </Block>
                        </Box>
                        <Block show={showSearch}>
                            <div className="search-autoc omplete">
                                <Autocomplete key={`${restaurantName}-${menuName}`} options={autoCompleteOptions} onSearch={onSearch} />
                            </div>
                        </Block>
                    </Box>
                </Box>
                <Block show={!isAll}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            height: mpx2vw(44),
                            pl: mpx2vw(27),
                            pr: mpx2vw(39),
                            color: colors.black,
                            borderTop: "1px solid #F1F1F1",
                            "& span": {
                                lineHeight: mpx2vw(32),
                                fontSize: mpx2vw(14),
                                fontFamily: theme => theme.typography.fontFamily,
                            },
                        }}
                    >
                        <span>Category Status</span>
                        <Switch checked={selectedCategoryStatus} onChange={() => setToggleCategoryStatus(selectedCategoryStatus ? "inactive" : "active")} />
                    </Box>
                </Block>
                <List />
            </Stack>

            <DeactivateCategory
                visible={toggleCategoryStatus === "inactive"}
                categoryName={selectedCategory?.name}
                onClose={() => setToggleCategoryStatus(null)}
                onOk={request => dispatch(actions.updateCategoryStatus(request as UpdateCategoryStatusAJAXRequest, () => setToggleCategoryStatus(null)))}
            />
            <ReactivateCategory categoryName={selectedCategory?.name} visible={toggleCategoryStatus === "active"} onClose={() => setToggleCategoryStatus(null)} />
        </>
    );
};
export default MobileMenu;
