import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router";
import {styled, Theme, CSSObject} from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

import {colors} from "colors";
import {ExpandCircleCloseOutlined, EnvoyLogoForPartners, EnvoyLogoCollapsed} from "asset/icon";

import MenuList from "../../MenuList";
import {px2vw} from "utils/transform";
import {mainActions} from "module/main";

const SiteLogo = React.memo(({open}: {open: boolean}) => {
    const history = useHistory();
    const handleTurnToHomePage = () => {
        history.push("/");
    };

    return open ? (
        <Box
            sx={{
                mt: "73px",
                mb: "93px",
                textAlign: "center",
                cursor: "pointer",
            }}
            onClick={handleTurnToHomePage}
        >
            <EnvoyLogoForPartners />
        </Box>
    ) : (
        <Box
            sx={{
                textAlign: "center",
                mt: "54px",
                mb: "99px",
                fontSize: 0,
            }}
            onClick={handleTurnToHomePage}
        >
            <EnvoyLogoCollapsed />
        </Box>
    );
});

const drawerWidth = px2vw(207);

const openedMixin = (theme: Theme): CSSObject => ({
    backgroundColor: colors.primary.bluishBlack,
    boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.25)",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    backgroundColor: colors.primary.bluishBlack,
    boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.25)",
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: px2vw(77),
    [theme.breakpoints.up("sm")]: {
        width: px2vw(77),
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== "open",
})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    position: "relative",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

interface Props {}

const Nav: React.SFC<Props> = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(true);

    return (
        <Box
            sx={{
                position: "relative",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    right: "-10px",
                    top: "130px",
                    zIndex: 1201,
                    lineHeight: 0,
                    cursor: "pointer",
                }}
            >
                <ExpandCircleCloseOutlined
                    onClick={() =>
                        setOpen(pre => {
                            dispatch(mainActions.setNavigationBarOpen(!pre));
                            return !pre;
                        })
                    }
                    style={{
                        transform: open ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "all 0.5s",
                    }}
                />
            </Box>
            <Drawer variant="permanent" open={open}>
                <SiteLogo open={open} />
                <MenuList collapsed={!open} openNav={(open: boolean) => setOpen(open)} type="PC" />
            </Drawer>
        </Box>
    );
};

export default Nav;
