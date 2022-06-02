// @flow
import React from "react";
import {classNames as cn} from "@wonder/core-fe";
import {fixedDeductedNumber} from "utils/format";
import {menuItemProps} from "../type";
import {MenuItemDefaultLogoActivate, MenuItemDefaultLogoDeactivate} from "asset/icon";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {Switch} from "widget/MuiSwitch";

import {mpx2vw, textEllipsisOneLine} from "utils/transform";
import {colors} from "colors";

type Props = {
    row: menuItemProps;
    onClick: () => void;
    onChange: (val: boolean) => void;
};
export const ListItem = ({row, onClick, onChange}: Props) => {
    return (
        <Stack
            sx={{
                position: "relative",
                height: mpx2vw(50),
                alignItems: "center",
                justifyContent: "space-between",
                "&>span": {
                    fontSize: mpx2vw(14),
                    fontWeight: 400,
                    lineHeight: mpx2vw(32),
                    fontFamily: theme => theme.typography.fontFamily,
                    color: row.is_active ? colors.black : colors.gray.medium,
                },
                "&::after": {
                    content: "''",
                    position: "absolute",
                    left: mpx2vw(-4),
                    right: 0,
                    bottom: 0,
                    height: "1px",
                    backgroundColor: "#bababa",
                    transform: "scale(1, 0.5)",
                },
            }}
            direction="row"
            onClick={(event: any) => {
                if (event.target.className.indexOf("MuiSwitch-input") === -1) onClick();
            }}
            key={row.menu_item_id}
            className={cn("menu-layout menu-row", {
                "disabled-menu-row": !row.is_active,
            })}
        >
            <Stack
                direction="row"
                sx={{
                    overflow: "hidden",
                    alignItems: "center",
                    mr: mpx2vw(35),
                    "& img": {
                        display: "block",
                        width: 30,
                        height: 30,
                        borderRadius: mpx2vw(6),
                    },
                    "& span:last-of-type": {
                        ...textEllipsisOneLine,
                        lineHeight: mpx2vw(32),
                        width: mpx2vw(100),
                        ml: mpx2vw(11),
                        color: row.is_active ? colors.black : colors.gray.medium,
                    },
                }}
            >
                {row.logo_image?.image_key && <img src={`/image/${row.logo_image?.image_key}`} alt="menuItemPage" className="logo" />}
                {!row.logo_image?.image_key && row.is_active && <MenuItemDefaultLogoActivate className="logo" />}
                {!row.logo_image?.image_key && !row.is_active && <MenuItemDefaultLogoDeactivate className="logo" />}

                <span>{row.name}</span>
            </Stack>
            <Box
                component="span"
                sx={{
                    width: mpx2vw(50),
                    mr: mpx2vw(30),
                }}
            >
                {fixedDeductedNumber(row.price)}
            </Box>
            <Box
                component="span"
                sx={{
                    width: mpx2vw(40),
                    lineHeight: mpx2vw(20),
                }}
            >
                <Switch checked={row.is_active} onChange={(event, value) => onChange(value)} />
            </Box>
        </Stack>
    );
};
