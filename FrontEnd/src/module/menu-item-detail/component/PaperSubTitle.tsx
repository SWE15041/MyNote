// @flow
import React from "react";
import {useLocation} from "react-router";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Switch} from "widget/MuiSwitch";

import {PublishedMenuItemAJAXResponse, PublishedMenuItemStatusAJAXView} from "type/api";
import {colors} from "colors";
import {px2vw} from "utils/transform";
import {fixedNumber} from "utils/format";

import {BodyText, TopicText, spicy} from "module/menu/component/MenuSidePanel";

type Props = {
    menuItem: PublishedMenuItemAJAXResponse;
    handleChange: (val: boolean) => void;
};
export const PaperSubTitle = ({menuItem, handleChange}: Props) => {
    const {state} = useLocation<{category: string; menu?: string}>();
    const isActive = menuItem.status === PublishedMenuItemStatusAJAXView.ACTIVE;

    const imgUrl = menuItem.logo_image ? `/image/${menuItem.logo_image.image_key}` : isActive ? require("asset/img/menu-item-active-logo.png") : require("asset/img/menu-item-deactivate-logo.png");

    return (
        <div className="paper-title">
            <Stack direction="row" alignItems="center" sx={{mt: "17px", mx: "25px"}}>
                <Box
                    component="img"
                    src={imgUrl}
                    sx={{
                        display: "block",
                        width: "106px",
                        height: "106px",
                        mr: px2vw(30),
                        borderRadius: "6px",
                    }}
                />
                <Stack sx={{flex: 1, borderBottom: "1px solid #F0F0F0"}}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        sx={{
                            pb: "14px",
                            "& .MuiTypography-root": {
                                lineHeight: "20px",
                                fontSize: "20px",
                                color: colors.primary.poblano,
                                fontWeight: 700,
                            },
                        }}
                    >
                        <Stack direction="row" alignItems="center" flex={1}>
                            <Typography component="h2" sx={{mr: "12px"}}>
                                {menuItem.base_info.name}
                            </Typography>
                            <Switch
                                checked={isActive}
                                onChange={(_, value) => {
                                    handleChange(value);
                                }}
                            />
                        </Stack>
                        <Typography component="span">{`$ ${fixedNumber(menuItem.base_info.base_price)}`}</Typography>
                    </Stack>
                    {Boolean(menuItem.base_info.long_description) && (
                        <Stack direction="row" alignItems="center" flex={1}>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 400,
                                    mb: "16px",
                                    color: "#000",
                                }}
                            >
                                {menuItem.base_info.long_description}
                            </Typography>
                            <Typography sx={{width: "120px"}} />
                        </Stack>
                    )}
                </Stack>
            </Stack>
            <Box sx={{ml: "161px"}}>
                <Stack
                    direction="row"
                    flexWrap="wrap"
                    sx={{
                        pt: "19px",
                        "&>div": {
                            mb: "27px",
                        },
                    }}
                >
                    <Stack direction="row" alignItems="start" sx={{mr: "39px"}}>
                        <TopicText sx={{mr: "10px"}}>Menu</TopicText>
                        <BodyText sx={{width: "156px"}}>{state?.menu ?? ""}</BodyText>
                    </Stack>
                    <Stack direction="row" alignItems="start" sx={{mr: "32px"}}>
                        <TopicText sx={{mr: "10px"}}>Category</TopicText>
                        <BodyText sx={{width: "152px"}}>{state?.category}</BodyText>
                    </Stack>
                    <Stack direction="row" alignItems="start" sx={{mr: "39px"}}>
                        <TopicText sx={{mr: "10px"}}>Spice Level</TopicText>
                        {menuItem.base_info.spicy_level ? spicy[menuItem.base_info.spicy_level] : <BodyText sx={{width: "29px"}}>N/A</BodyText>}
                    </Stack>
                    {Boolean(menuItem.times_ordered_in_last_30_days) && (
                        <Stack direction="row" alignItems="start">
                            <TopicText sx={{mr: "10px"}}># Times Ordered in Last 30 Days</TopicText>
                            <BodyText>{menuItem.times_ordered_in_last_30_days}</BodyText>
                        </Stack>
                    )}
                </Stack>
            </Box>
        </div>
    );
};
