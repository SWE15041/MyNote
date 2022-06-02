import React, {useState, useEffect, useRef} from "react";
import "./MNavigation.less";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import {useHistory} from "react-router";
import {useSelector} from "react-redux";
import {RestaurantAvatarStatus, RestaurantStatusMap} from "module/restaurant/type";
import {RootState} from "type/state";
import {GetServingInfoAJAXResponse$AvailabilityStatus} from "type/api";
import {Account} from "../Account";
import Logout from "../Logout";
import MenuList from "../MenuList";
import BreadCrumb from "../BreadCrumb";
import {Dropdown} from "widget/Dropdown";
import {MenuBurgerIcon, MenuCloseIcon, EnvoyLogoForPartners} from "asset/icon";
import {mpx2vw} from "utils/transform";
import {colors} from "colors";
import {useLocation} from "react-router-dom";

interface Props {
    children: React.ReactElement;
}

const Menu = ({handleMenuVisible}: {handleMenuVisible: () => void}) => (
    <Box>
        <Account type="Mobile" onHideMobileMenu={() => handleMenuVisible()} />
        <MenuList collapsed={false} type="Mobile" />
        <Divider
            sx={{
                "@media screen and (max-width: 480px)": {
                    bgcolor: colors.gray.light,
                    mt: mpx2vw(24),
                    mb: mpx2vw(4),
                    ml: mpx2vw(23),
                    mr: mpx2vw(43.5),
                    height: mpx2vw(1),
                    transform: "scale(1, 0.1)",
                },
            }}
        />
        <Logout type="Mobile" handleClose={handleMenuVisible} />
    </Box>
);

const MNavigation = ({children}: Props) => {
    const history = useHistory();
    const location = useLocation();
    const {restaurantInfo, isOutOfServiceTime} = useSelector((state: RootState) => state.app.restaurant);
    const [menuVisible, setMenuVisible] = useState(true);
    const dropdownRef = useRef<{close: () => void} | null>(null);
    const hideDot = restaurantInfo?.status === GetServingInfoAJAXResponse$AvailabilityStatus.INACTIVE || restaurantInfo?.status === GetServingInfoAJAXResponse$AvailabilityStatus.UNPUBLISHED;
    const showOutSide = isOutOfServiceTime && restaurantInfo?.status === GetServingInfoAJAXResponse$AvailabilityStatus.OPEN;
    const handleMenuVisible = () => {
        dropdownRef.current && dropdownRef.current.close();
    };

    useEffect(() => {
        handleMenuVisible();
    }, [location]);

    return (
        <Box>
            <Stack
                direction="row"
                sx={{
                    height: mpx2vw(78),
                    bgcolor: colors.primary.bluishBlack,
                    justifyContent: "center",
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "flex-start",
                        mt: mpx2vw(31),
                        position: "relative",
                    }}
                >
                    {!hideDot && restaurantInfo?.status && (
                        <Box
                            component="span"
                            sx={{
                                display: "inline-block",
                                width: mpx2vw(12),
                                height: mpx2vw(12),
                                mr: mpx2vw(10),
                                borderRadius: "50%",
                                bgcolor: showOutSide ? RestaurantStatusMap[RestaurantAvatarStatus.OUT_SERVICE] : RestaurantStatusMap[restaurantInfo.status],
                                position: "absolute",
                                left: 0,
                                top: mpx2vw(1),
                            }}
                        />
                    )}
                    <Box
                        sx={{
                            "& svg": {
                                width: mpx2vw(139),
                                height: mpx2vw(25),
                                ml: mpx2vw(22),
                            },
                        }}
                        onClick={() => history.push("/")}
                    >
                        <EnvoyLogoForPartners />
                    </Box>
                </Stack>
                <Dropdown
                    sx={{
                        "@media screen and (max-width: 480px)": {
                            mt: mpx2vw(77),
                            pt: mpx2vw(23),
                            "& .MuiPopover-paper": {
                                width: "100vw !important",
                                maxWidth: "none",
                                bgcolor: colors.primary.bluishBlack,
                                borderRadius: "unset",
                            },
                        },
                    }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    marginThreshold={0}
                    content={<Menu handleMenuVisible={handleMenuVisible} />}
                    ref={dropdownRef}
                    onVisibleChange={setMenuVisible}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            lineHeight: 0,
                            top: mpx2vw(30.75),
                            right: mpx2vw(29.25),
                        }}
                    >
                        {menuVisible ? <MenuCloseIcon /> : <MenuBurgerIcon />}
                    </Box>
                </Dropdown>
            </Stack>
            <BreadCrumb />
            {children}
        </Box>
    );
};

export default MNavigation;
