import React, {useState, useEffect, useRef, useMemo} from "react";
import {useSelector} from "react-redux";
import {useResponsive} from "hooks/useResponsive";
import {RootState} from "type/state";
import {colors} from "colors";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {ClockCircleOutlined} from "@ant-design/icons";
import {ChevronDownMediumIcon, ChevronUpMediumIcon} from "asset/icon/mediumIcon";
import {ChevronDownSmallIcon, ChevronUpSmallIcon} from "asset/icon/smallIcon";
import {Dropdown} from "widget/Dropdown";
import Block from "widget/Block";
import Clock from "./Clock";
import RestaurantStatusList from "./RestaurantStatusList";
import RestaurantList from "./RestaurantList";
import Logout from "./Logout";
import {RestaurantAvatar} from "./RestaurantAvatar";
import {mpx2vw, textEllipsisOneLine} from "utils/transform";
import {DisplayRestaurantStatus, RestaurantAvatarStatus} from "module/restaurant/type";
import {GetServingInfoAJAXResponse$AvailabilityStatus} from "type/api";

interface Props {
    type: "PC" | "Mobile";
    onHideMobileMenu?: () => void;
}

type MenuProps = {
    handleMenuVisible: (val: boolean) => void;
    show: boolean;
} & Props;

const CustomerCountDown = () => (
    <Box
        sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: colors.status.paused,
            borderRadius: "6px",
            width: "101px",
            height: "35px",
            ml: "5px",
            "& .anticon-clock-circle": {
                fontSize: "14px",
                mb: "1px",
                mr: "5px",
            },
            "& .ant-statistic-content": {
                fontSize: "16px",
                "& .ant-statistic-content-value": {
                    fontSize: "16px",
                },
            },
            "@media screen and (max-width: 480px)": {
                width: mpx2vw(253),
                mt: mpx2vw(-12),
                mb: mpx2vw(23),
                "& .anticon-clock-circle": {
                    mb: mpx2vw(2),
                    mt: mpx2vw(2),
                    color: colors.black,
                },
                "& .ant-statistic-content": {
                    color: colors.primary.bluishBlack,
                },
            },
        }}
    >
        <ClockCircleOutlined /> <Clock staticUi />
    </Box>
);

const Menu = ({show, type, handleMenuVisible, onHideMobileMenu}: MenuProps) => {
    return (
        <div>
            <RestaurantStatusList setMenuVisible={handleMenuVisible} onHideMobileMenu={onHideMobileMenu} />
            <Block show={show}>
                <Box
                    sx={{
                        "@media screen and (max-width: 480px)": {
                            pb: mpx2vw(28),
                        },
                    }}
                >
                    <Divider
                        sx={{
                            color: colors.gray.light,
                            ml: "23.5px",
                            mr: "17px",
                            "@media screen and (max-width: 480px)": {
                                bgcolor: colors.gray.light,
                                ml: mpx2vw(52),
                                mr: mpx2vw(36),
                                my: mpx2vw(23),
                            },
                        }}
                    />
                    <RestaurantList setMenuVisible={handleMenuVisible} />
                </Box>
            </Block>
            <Block show={type === "PC"}>
                <div onClick={e => e.stopPropagation()}>
                    <Divider
                        sx={{
                            color: colors.gray.light,
                            ml: "23.5px",
                            mr: "17px",
                        }}
                    />
                    <Logout type={type} handleClose={() => handleMenuVisible(false)} />
                </div>
            </Block>
        </div>
    );
};

export const Account: React.FunctionComponent<Props> = ({type, onHideMobileMenu}) => {
    const screens = useResponsive();
    const {restaurantInfo, isOutOfServiceTime, servingInfo, restaurantList} = useSelector((state: RootState) => {
        const {restaurantInfo, isOutOfServiceTime, servingInfo, restaurantList} = state.app.restaurant;
        return {
            restaurantInfo,
            isOutOfServiceTime,
            servingInfo,
            restaurantList,
        };
    });
    const [menuVisible, setMenuVisible] = useState(false);
    const dropdownRef = useRef<{close: () => void} | null>(null);
    const pausedSecond = servingInfo?.paused_status_left_time_in_seconds || 0;
    const isPc = screens.xs;
    const showClock = !!pausedSecond && restaurantInfo?.status === GetServingInfoAJAXResponse$AvailabilityStatus.PAUSE_ORDERS;
    const showOutSide = isOutOfServiceTime && restaurantInfo?.status === GetServingInfoAJAXResponse$AvailabilityStatus.OPEN;
    const iconColor = type === "Mobile" ? colors.primary.white : colors.primary.poblano;
    const handleMenuVisible = (visible: boolean) => {
        setMenuVisible(visible);
        dropdownRef.current && dropdownRef.current.close();
    };

    const menuToggleIcon = useMemo(() => {
        if (isPc) {
            return menuVisible ? <ChevronUpSmallIcon color={iconColor} /> : <ChevronDownSmallIcon color={iconColor} />;
        } else {
            return menuVisible ? <ChevronUpMediumIcon color={iconColor} /> : <ChevronDownMediumIcon color={iconColor} />;
        }
    }, [menuVisible, isPc, iconColor]);

    useEffect(() => {
        setMenuVisible(false);
        dropdownRef.current && dropdownRef.current.close();
    }, [restaurantInfo?.restaurant_name]);

    if (!restaurantInfo) {
        return null;
    }

    return (
        <Dropdown
            sx={{
                mt: "1px",
                "& .MuiPopover-paper": {
                    width: "261px",
                },
                "@media screen and (max-width: 480px)": {
                    m: 0,
                    pt: mpx2vw(23),
                    "& .MuiPopover-paper": {
                        width: "100vw",
                        maxWidth: "none",
                        bgcolor: colors.primary.bluishBlack,
                        borderRadius: "unset",
                    },
                },
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: isPc ? "right" : "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: isPc ? "right" : "left",
            }}
            marginThreshold={0}
            content={<Menu type={type} show={restaurantList.length > 0} handleMenuVisible={handleMenuVisible} onHideMobileMenu={onHideMobileMenu} />}
            ref={dropdownRef}
            onVisibleChange={setMenuVisible}
        >
            <Stack
                sx={{
                    pl: "24px",
                    pr: "37px",
                    height: "58px",
                    alignItems: "center",
                    cursor: "pointer",
                    "@media screen and (max-width: 480px)": {
                        height: mpx2vw(77),
                        pl: mpx2vw(24),
                        pr: mpx2vw(29.6),
                        pb: mpx2vw(23),
                    },
                }}
                direction="row"
            >
                <Box
                    sx={{
                        mr: "10px",
                        "@media screen and (max-width: 480px)": {
                            mr: mpx2vw(8.74),
                        },
                    }}
                >
                    <RestaurantAvatar
                        isOutOfServiceTime={showOutSide}
                        status={restaurantInfo.status ? RestaurantAvatarStatus[restaurantInfo.status] : undefined}
                        src={restaurantInfo.portal_logo_image.image_key ? `/image/${restaurantInfo.portal_logo_image.image_key}` : undefined}
                        size={isPc ? "small" : "middle"}
                    />
                </Box>
                <Stack
                    sx={{
                        flex: 1,
                        overflow: "hidden",
                        color: colors.black,
                        "@media screen and (max-width: 480px)": {
                            color: colors.primary.white,
                        },
                    }}
                >
                    <Stack direction="row">
                        <Stack
                            sx={{
                                fontSize: "14px",
                                lineHeight: "16px",
                                maxWidth: "200px",
                                ...textEllipsisOneLine,
                                "@media screen and (max-width: 480px)": {
                                    flex: 1,
                                    maxWidth: "none",
                                    fontSize: mpx2vw(16),
                                    lineHeight: mpx2vw(16),
                                },
                            }}
                        >
                            <Box component="span" sx={textEllipsisOneLine}>
                                {restaurantInfo.restaurant_name}
                            </Box>
                            <Box
                                component="span"
                                sx={{
                                    mt: "2px",
                                    fontSize: "12px",
                                    height: "16px",
                                    "@media screen and (max-width: 480px)": {
                                        fontSize: mpx2vw(14),
                                        mt: mpx2vw(2),
                                        height: mpx2vw(16),
                                    },
                                }}
                            >
                                {showOutSide ? "Outside service hours" : restaurantInfo.status ? DisplayRestaurantStatus[restaurantInfo.status] : ""}
                            </Box>
                        </Stack>
                        <Block show={showClock && isPc}>
                            <CustomerCountDown />
                        </Block>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "top",
                                pt: "6px",
                                ml: "14px",
                                "@media screen and (max-width: 480px)": {
                                    ml: mpx2vw(14),
                                    pt: mpx2vw(3),
                                },
                            }}
                        >
                            {menuToggleIcon}
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                sx={{
                    alignItems: "center",
                }}
            >
                <Block show={showClock && !isPc}>
                    <CustomerCountDown />
                </Block>
            </Stack>
        </Dropdown>
    );
};
