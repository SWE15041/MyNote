import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import {colors} from "colors";
import {mpx2vw, textEllipsisOneLine} from "utils/transform";
import {Link as RouterLink, LinkProps as RouterLinkProps} from "react-router-dom";
import {ChevronDownMediumIcon, ChevronUpMediumIcon} from "asset/icon/mediumIcon";
import {ChevronDownSmallIcon, ChevronUpSmallIcon} from "asset/icon/smallIcon";
import useMediaQuery from "@mui/material/useMediaQuery";
import {EnvoyRoute} from "route/type";
type Props = {
    menu: EnvoyRoute;
    active?: boolean;
    onClick?: () => void;
    toggleMenuDrawer: (menuPath: string) => void;
    navCollapsed?: boolean;
};
export const SubMenuListItem: React.FC<Props> = props => {
    const isMobile = useMediaQuery("(max-width: 480px)");
    const {menu, navCollapsed, active, children, onClick, toggleMenuDrawer} = props;

    const toggleDrawer = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        toggleMenuDrawer(menu.path);
    };

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to">>((itemProps, ref) => {
                if (menu.children && menu.children[0].path) {
                    return <RouterLink to={`/${menu.path}/${menu.children[0].path}`} ref={ref} {...itemProps} role={undefined} />;
                } else {
                    return <RouterLink to={`/${menu.path}`} ref={ref} {...itemProps} role={undefined} />;
                }
            }),
        [menu]
    );

    const menuToggleIcon = () => {
        return (
            <Box
                sx={{
                    height: "20px",
                    width: "20px",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    alignItems: "center",
                    "@media screen and (max-width: 480px)": {
                        height: mpx2vw(20),
                        width: mpx2vw(20),
                    },
                }}
                onClick={toggleDrawer}
            >
                {isMobile && menu.collapsed && <ChevronUpMediumIcon color={colors.primary.white} />}
                {isMobile && !menu.collapsed && <ChevronDownMediumIcon color={colors.primary.white} />}
                {!isMobile && menu.collapsed && <ChevronUpSmallIcon color={colors.primary.white} />}
                {!isMobile && !menu.collapsed && <ChevronDownSmallIcon color={colors.primary.white} />}
            </Box>
        );
    };

    return (
        <Box
            sx={{
                position: "relative",
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
            }}
        >
            <ListItemButton
                disableRipple
                sx={{
                    height: "40px",
                    color: colors.primary.white,
                    bgcolor: active ? "rgba(36, 107, 107, 0.5)" : colors.primary.bluishBlack,
                    justifyContent: menu.collapsed ? "initial" : "center",
                    pl: "34px",
                    pr: "9px",
                    "&:hover": {
                        bgcolor: active ? "rgba(36, 107, 107, 0.5)" : "rgba(56, 168, 168, .1)",
                        color: colors.primary.white,
                    },
                    "@media screen and (max-width: 480px)": {
                        height: mpx2vw(52),
                        fontSize: mpx2vw(16),
                        pl: mpx2vw(72),
                        pr: mpx2vw(28),
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
                {!!menu.icon && (
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: !navCollapsed ? "12px" : "auto",
                            "@media screen and (max-width: 480px)": {
                                mr: mpx2vw(12),
                            },
                        }}
                    >
                        {menu.icon}
                    </ListItemIcon>
                )}
                <ListItemText
                    sx={{
                        opacity: navCollapsed ? 0 : 1,
                        "& span": {
                            fontWeight: active ? 700 : 400,
                            ...textEllipsisOneLine,
                        },
                    }}
                    primary={menu.menu}
                />
                {!navCollapsed && !active ? menuToggleIcon() : null}
            </ListItemButton>
            {!!menu.collapsed && (
                <Collapse in={!navCollapsed} timeout="auto" unmountOnExit>
                    <List
                        sx={{
                            "& .MuiListItemButton-root": {
                                pl: "59px",
                                height: "30px",
                                color: colors.primary.white,
                                bgcolor: active ? "rgba(36, 107, 107, 0.5)" : colors.primary.bluishBlack,
                                fontWeight: active ? 500 : 400,
                                "&:hover": {
                                    bgcolor: active ? "rgba(36, 107, 107, 0.5)" : "rgba(56, 168, 168, .1)",
                                    color: colors.primary.white,
                                },
                                "& .MuiListItemText-root": {
                                    opacity: 1,
                                    "& .MuiTypography-root": {
                                        fontWeight: active ? 500 : 400,
                                        fontSize: "14px",
                                        "@media screen and (max-width: 480px)": {
                                            fontSize: mpx2vw(16),
                                        },
                                    },
                                },
                                "@media screen and (max-width: 480px)": {
                                    pl: mpx2vw(97),
                                    height: mpx2vw(38),
                                    "& .MuiTypography-root": {
                                        fontSize: mpx2vw(16),
                                    },
                                },
                            },
                        }}
                        component="ul"
                        disablePadding
                    >
                        {children}
                    </List>
                </Collapse>
            )}
        </Box>
    );
};
