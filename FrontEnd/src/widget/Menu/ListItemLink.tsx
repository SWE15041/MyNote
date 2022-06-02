// @flow
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Link as RouterLink, LinkProps as RouterLinkProps} from "react-router-dom";
import {colors} from "colors";
import {mpx2vw, textEllipsisOneLine} from "utils/transform";

interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary?: string;
    to: string;
    active?: boolean;
    subRoute?: boolean;
    onClick?: () => void;
    navCollapsed?: boolean;
}

export const ListItemLink = (props: ListItemLinkProps) => {
    const {icon, primary, to, active, navCollapsed, subRoute, onClick} = props;
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>((itemProps, ref) => {
                return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
            }),
        [to]
    );

    return (
        <li>
            <ListItemButton
                disableRipple
                sx={{
                    position: "relative",
                    height: "40px",
                    pl: "34px",
                    pr: "11px",
                    justifyContent: navCollapsed ? "initial" : "center",
                    color: colors.primary.white,
                    bgcolor: active ? "rgba(36, 107, 107, 0.5)" : colors.primary.bluishBlack,
                    "&:hover": {
                        bgcolor: active ? "rgba(36, 107, 107, 0.5)" : "rgba(56, 168, 168, .1)",
                        color: colors.primary.white,
                    },
                    "&:active": {
                        opacity: 1,
                    },
                    "&:after": active
                        ? {
                              position: "absolute",
                              top: 0,
                              bottom: 0,
                              left: 0,
                              content: "''",
                              width: "6px",
                              bgcolor: colors.primary.seaweed,
                          }
                        : {},
                    "@media screen and (max-width: 480px)": {
                        height: mpx2vw(52),
                        pl: mpx2vw(72),
                        pr: mpx2vw(11),
                        fontSize: mpx2vw(16),
                        "&:hover": {
                            bgcolor: active ? "rgba(36, 107, 107, 0.5)" : colors.primary.bluishBlack,
                        },
                    },
                }}
                component={renderLink}
                onClick={() => {
                    onClick && onClick();
                }}
            >
                {icon ? (
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: !navCollapsed ? "12px" : "auto",
                            "@media screen and (max-width: 480px)": {
                                mr: mpx2vw(12),
                            },
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                ) : null}
                <ListItemText
                    sx={{
                        opacity: navCollapsed ? 0 : 1,
                        "& span": {
                            fontWeight: `${active ? (subRoute ? 500 : 700) : 400} !important`,
                            ...textEllipsisOneLine,
                            "@media screen and (max-width: 480px)": {
                                fontSize: mpx2vw(16),
                            },
                        },
                    }}
                    primary={primary}
                />
            </ListItemButton>
        </li>
    );
};
