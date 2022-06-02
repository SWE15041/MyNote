// @flow
import React from "react";
import {useLocation} from "react-router";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {Switch} from "widget/MuiSwitch";
import {BodyText, spicy, TopicText} from "module/menu/component/MenuSidePanel";

import {mpx2vw} from "utils/transform";
import {colors} from "colors";
import {PublishedMenuItemAJAXResponse, PublishedMenuItemStatusAJAXView} from "type/api";
import {fixedNumber} from "utils/format";

type Props = {
    menuItem: PublishedMenuItemAJAXResponse;
    handleChange: (val: boolean) => void;
};
export const PaperSubTitle = ({menuItem, handleChange}: Props) => {
    const {state} = useLocation<{category: string; menu?: string}>();
    const isActive = menuItem.status === PublishedMenuItemStatusAJAXView.ACTIVE;

    return (
        <Box sx={{px: mpx2vw(16), pt: mpx2vw(22)}}>
            <Box sx={{borderBottom: "1px solid #F0F0F0"}}>
                <Stack direction="row" alignItems="start" justifyContent="space-between">
                    <Stack
                        direction="row"
                        alignItems="start"
                        sx={{
                            pb: mpx2vw(14),
                            "& .menu-item-name": {
                                display: "inline-block",
                                mr: mpx2vw(8),
                                width: mpx2vw(202),
                                fontSize: mpx2vw(20),
                                lineHeight: mpx2vw(20),
                                fontWeight: 700,
                                color: colors.primary.poblano,
                            },
                        }}
                    >
                        <span className="menu-item-name">{menuItem.base_info.name}</span>
                        <Switch
                            checked={isActive}
                            onChange={(_, value) => {
                                handleChange(value);
                            }}
                        />
                    </Stack>
                    <Box
                        sx={{
                            fontSize: mpx2vw(20),
                            lineHeight: mpx2vw(20),
                            fontWeight: 700,
                            color: colors.primary.poblano,
                        }}
                    >
                        {`$ ${fixedNumber(menuItem.base_info.base_price)}`}
                    </Box>
                </Stack>
                {Boolean(menuItem.base_info.long_description) && (
                    <Box
                        sx={{
                            fontSize: mpx2vw(14),
                            lineHeight: mpx2vw(20),
                            mb: mpx2vw(16),
                            color: colors.black,
                        }}
                    >
                        {menuItem.base_info.long_description}
                    </Box>
                )}
            </Box>
            <Grid container sx={{mt: mpx2vw(22)}}>
                <Grid container alignItems="start" item xs={6.2} sx={{mb: mpx2vw(27)}}>
                    <TopicText sx={{mr: mpx2vw(10), width: mpx2vw(36)}}>Menu</TopicText>
                    <BodyText sx={{maxWidth: mpx2vw(118)}}>{state?.menu ?? ""}</BodyText>
                </Grid>
                <Grid container alignItems="start" item xs={5.8} sx={{mb: mpx2vw(27)}}>
                    <TopicText sx={{mr: mpx2vw(10), width: mpx2vw(58)}}>Category</TopicText>
                    <BodyText sx={{maxWidth: mpx2vw(80)}}>{state?.category}</BodyText>
                </Grid>
                <Grid container alignItems="start" item xs={6.2}>
                    <TopicText sx={{mr: mpx2vw(10)}}>Spice Level</TopicText>
                    {menuItem.base_info.spicy_level ? spicy[menuItem.base_info.spicy_level] : <BodyText sx={{width: "26px"}}>N/A</BodyText>}
                </Grid>
                {Boolean(menuItem.times_ordered_in_last_30_days) && (
                    <Grid container alignItems="start" item xs={5.8}>
                        <TopicText sx={{mr: mpx2vw(10), width: mpx2vw(114)}}># Times Ordered in Last 30 Days</TopicText>
                        <BodyText sx={{flexGrow: 1}}>{menuItem.times_ordered_in_last_30_days}</BodyText>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};
