import React, {useMemo} from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {useSelector, useDispatch} from "react-redux";
import {useLoadingStatus} from "@wonder/core-fe";

import {fixedNumber} from "utils/format";
import {textEllipsisOneLine, textEllipsisMultipleLine, mpx2vw} from "utils/transform";

import {px2vh, px2vw} from "../utils";

import {HotSpicyIcon, MediumSpicyIcon, MildSpicyIcon} from "asset/icon";
import {CloseOutlined, OpenInNewOutlined} from "asset/icon/smallIcon";
import {RootState} from "type/state";
import {LOADING_MENU_ITEM_DATA} from "../type";

import {ModifierGroup, NoModifier} from "./ModifierGroup";
import {Switch} from "widget/MuiSwitch";

import {colors} from "colors";

import {Spin} from "antd";
import Stack from "@mui/material/Stack";
import {SxProps, Theme} from "@mui/material/styles";
import {actions} from "../module";

export const TopicText: React.FC<{sx?: SxProps<Theme>}> = ({children, sx = []}) => {
    return (
        <Typography
            sx={[
                {
                    color: colors.primary.poblano,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 700,
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(20),
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </Typography>
    );
};

export const BodyText: React.FC<{sx?: SxProps<Theme>}> = ({children, sx = []}) => {
    return (
        <Typography
            sx={[
                {
                    fontWeight: 500,
                    color: colors.primary.bluishBlack,
                    fontSize: "14px",
                    lineHeight: "20px",
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(20),
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </Typography>
    );
};

export const spicy = {
    MILD: <MildSpicyIcon />,
    MEDIUM: <MediumSpicyIcon />,
    HOT: <HotSpicyIcon />,
};

interface Props {
    isActive: boolean;
    categoryName?: string;
    menuItemId: string | null;
    handleChange: (val: boolean) => void;
    onClose: () => void;
    categoryId: string | null;
}

export const MenuSidePanel = ({isActive, categoryName, menuItemId, handleChange, onClose, categoryId}: Props) => {
    const dispatch = useDispatch();
    const {menuItem, selectedMenu} = useSelector((state: RootState) => ({
        menuItem: state.app.menu.menuItem,
        selectedMenu: state.app.menu.selectedMenu,
    }));
    const loadingMenuItemData = useLoadingStatus(LOADING_MENU_ITEM_DATA);

    const panelContentHeight = useMemo(() => {
        const statusHeight = categoryId === null ? 0 : 45;

        const height = 58 + 31 + 17 + 32 + 77 + statusHeight + 64;
        return `calc(100vh - ${height}px)`;
    }, [categoryId]);

    const panelLoadingContentHeight = useMemo(() => {
        const statusHeight = categoryId === null ? 0 : 45;

        const height = 58 + 31 + 17 + 32 + 77 + statusHeight;
        return `calc(100vh - ${height}px)`;
    }, [categoryId]);

    if (loadingMenuItemData || !menuItem) {
        return (
            <Paper
                sx={{
                    minWidth: px2vw(523),
                    maxWidth: px2vw(523),
                    ml: px2vw(13),
                    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.11)",
                    bgcolor: "rgba(240, 240, 240, 0.2)",
                }}
            >
                <Spin spinning={loadingMenuItemData}>
                    <Box sx={{height: panelLoadingContentHeight}} />
                </Spin>
            </Paper>
        );
    }

    const imgUrl = menuItem.logo_image ? `/image/${menuItem.logo_image.image_key}` : isActive ? require("../../../asset/img/menu-item-active-logo.png") : require("../../../asset/img/menu-item-deactivate-logo.png");

    return (
        <Paper
            sx={{
                minWidth: px2vw(523),
                maxWidth: px2vw(523),
                ml: px2vw(13),
                boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.11)",
                bgcolor: "rgba(240, 240, 240, 0.2)",
                fontFamily: theme => theme.typography.fontFamily,
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
                sx={{
                    px: px2vw(20),
                    py: "20px",
                    "&>svg": {
                        cursor: "pointer",
                    },
                }}
            >
                <OpenInNewOutlined
                    sx={{mr: px2vw(20), color: colors.primary.poblano}}
                    onClick={() => {
                        dispatch(actions.turnToDetail(menuItemId!, categoryName!));
                    }}
                />
                <CloseOutlined onClick={onClose} />
            </Stack>

            <Box
                sx={{
                    height: panelContentHeight,
                    overflowY: "overlay",
                    opacity: isActive ? 1 : 0.6,
                }}
            >
                <Stack
                    direction="row"
                    alignItems="start"
                    sx={{
                        pb: px2vw(20),
                        borderBottom: "1px solid #D8D8D8",
                        ml: px2vw(21),
                        mr: px2vw(46),
                        pl: px2vw(13),
                    }}
                >
                    <Box
                        component="img"
                        src={imgUrl}
                        sx={{
                            display: "block",
                            width: "64px",
                            height: "64px",
                            mr: px2vw(23),
                            mt: "7px",
                            borderRadius: "6px",
                        }}
                    />
                    <Stack sx={{flex: 1}} justifyContent="space-between">
                        <Stack
                            direction="row"
                            sx={{
                                display: "flex",
                                overflow: "hidden",
                                fontSize: "18px",
                                lineHeight: "32px",
                                fontWeight: 700,
                                color: theme => theme.palette.primary.main,
                            }}
                        >
                            <Stack
                                direction="row"
                                sx={{
                                    flex: 1,
                                    width: 0,
                                    pr: px2vw(22),
                                    alignItems: "center",
                                }}
                            >
                                <Switch
                                    sx={{mr: "6px"}}
                                    checked={isActive}
                                    onChange={(_, value) => {
                                        handleChange(value);
                                    }}
                                />
                                <Box component="span" sx={{...textEllipsisOneLine}}>
                                    {menuItem.base_info.name}
                                </Box>
                            </Stack>
                            <Box component="span">{`$ ${fixedNumber(menuItem.base_info.base_price)}`}</Box>
                        </Stack>
                        {menuItem.base_info.long_description && (
                            <Box
                                component="p"
                                sx={{
                                    m: 0,
                                    mt: px2vh(10),
                                    width: px2vw(273),
                                    position: "relative",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: "#000",
                                    ...textEllipsisMultipleLine(2),
                                }}
                            >
                                {menuItem.base_info.long_description}
                            </Box>
                        )}
                    </Stack>
                </Stack>

                <Box sx={{ml: px2vw(34), mr: px2vw(39)}}>
                    <Grid container sx={{pt: px2vw(19)}}>
                        <Grid item container xs={5} alignItems="start">
                            <TopicText sx={{mr: px2vw(24)}}>Menu</TopicText>
                            <BodyText sx={{width: px2vw(106), ...textEllipsisOneLine}}>{selectedMenu ? selectedMenu.name : ""}</BodyText>
                        </Grid>
                        <Grid item container xs={7} alignItems="start">
                            <TopicText sx={{mr: px2vw(13)}}>Category</TopicText>
                            <BodyText sx={{width: px2vw(183), ...textEllipsisOneLine}}>{categoryName}</BodyText>
                        </Grid>
                    </Grid>

                    <Grid container sx={{pt: px2vw(14)}}>
                        <Grid item container xs={5} alignItems="start">
                            <TopicText sx={{mr: px2vw(11), width: "73px"}}>Spice Level</TopicText>
                            {menuItem.base_info.spicy_level ? spicy[menuItem.base_info.spicy_level] : <BodyText sx={{width: px2vw(29)}}>N/A</BodyText>}
                        </Grid>
                        {Boolean(menuItem.times_ordered_in_last_30_days) && (
                            <Grid item container xs={7} alignItems="start">
                                <TopicText sx={{mr: px2vw(25)}}># Times Ordered in Last 30 Days</TopicText>
                                <BodyText>{menuItem.times_ordered_in_last_30_days}</BodyText>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                <Box
                    component="h2"
                    sx={{
                        color: theme => theme.palette.primary.main,
                        fontWeight: 700,
                        lineHeight: "32px",
                        fontSize: "14px",
                        mb: px2vw(10),
                        mt: px2vw(31),
                        ml: px2vw(34),
                    }}
                >
                    Modifiers & Submodifiers
                </Box>
                {menuItem.modifier_groups.length === 0 ? (
                    <NoModifier />
                ) : (
                    menuItem.modifier_groups.map(group => (
                        <ModifierGroup
                            key={group.name}
                            group={group}
                            sx={{
                                "& .sub-modifier-name, & .option-name": {
                                    ...textEllipsisOneLine,
                                },
                                "& .sub-modifier-box:after": {
                                    opacity: isActive ? 1 : 0.6,
                                },
                            }}
                        />
                    ))
                )}
            </Box>
        </Paper>
    );
};
