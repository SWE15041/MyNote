import React, {useMemo, useState} from "react";
import {useUnaryAction} from "@wonder/core-fe";
import {useSelector} from "react-redux";
import CloseModal from "./RestaurantStatusModal/Close";
import PauseModal from "./RestaurantStatusModal/Pause";
import {AvailabilityStatusAJAXView, GetServingInfoAJAXResponse$AvailabilityStatus} from "type/api";
import {RootState} from "type/state";
import {formatSupportNumber} from "utils/format";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";
import {restaurantActions} from "module/restaurant";

interface Props {
    setMenuVisible: (visible: boolean) => void;
    onHideMobileMenu?: () => void;
}

type RestaurantStatusItemProps = {
    text: string;
    color: string;
    active: boolean;
    onClick: () => void;
};

const poblanoOpacity015 = "rgba(36, 107, 107, 0.15)";

const RestaurantStatusItem = ({text, color, active, onClick}: RestaurantStatusItemProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                height: "42px",
                pl: "24.76px",
                cursor: "pointer",
                color: colors.black,
                bgcolor: active ? poblanoOpacity015 : "#fff",
                "&:hover": {
                    bgcolor: active ? poblanoOpacity015 : "rgba(216, 216, 216, 0.3)",
                },
                "@media screen and (max-width: 480px)": {
                    position: "relative",
                    color: colors.primary.white,
                    height: mpx2vw(52),
                    pl: mpx2vw(53),
                    bgcolor: active ? colors.primary.poblanoOpacity : colors.primary.bluishBlack,
                    "&:hover": {
                        bgcolor: active ? colors.primary.poblanoOpacity : colors.primary.bluishBlack,
                    },
                    "&:after": active
                        ? {
                              position: "absolute",
                              content: "''",
                              width: mpx2vw(11),
                              left: 0,
                              top: 0,
                              bottom: 0,
                              bgcolor: colors.primary.seaweed,
                          }
                        : {},
                },
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "50%",
                    mr: "12px",
                    bgcolor: color,
                    "@media screen and (max-width: 480px)": {
                        width: mpx2vw(14),
                        height: mpx2vw(14),
                        mr: mpx2vw(12),
                    },
                }}
            />
            <Box
                sx={{
                    fontSize: "14px",
                    lineHeight: "32px",
                    fontWeight: active ? 700 : 400,
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(16),
                        lineHeight: mpx2vw(32),
                    },
                }}
            >
                {text}
            </Box>
        </Box>
    );
};

const ForceClosedTip = ({supportPhone}: {supportPhone: string | null}) => {
    return (
        <Box
            sx={{
                m: "19px 17px 0 10px",
                fontSize: "14px",
                lineHeight: "20px",
                bgcolor: "rgba(240, 240, 240, 0.5)",
                borderRadius: "5px",
                p: "10px 10px 15px 10px",
                "@media screen and (max-width: 480px)": {
                    color: colors.primary.white,
                    fontSize: mpx2vw(14),
                    width: mpx2vw(260),
                    m: `${mpx2vw(8)} ${mpx2vw(62)} 0 ${mpx2vw(52)}`,
                    borderRadius: mpx2vw(5),
                    p: `${mpx2vw(11)} ${mpx2vw(14)} ${mpx2vw(13)} ${mpx2vw(15)}`,
                },
            }}
        >
            <Grid container>
                <Grid item>Please visit the support page for questions or contact Envoy Support at {formatSupportNumber(supportPhone)}.</Grid>
            </Grid>
        </Box>
    );
};

const RestaurantStatusList = (props: Props) => {
    const {setMenuVisible, onHideMobileMenu} = props;
    const {supportPhone} = useSelector((state: RootState) => state.app.main);
    const {restaurantInfo, isOutOfServiceTime} = useSelector((state: RootState) => state.app.restaurant);
    const [operationStatus, setOperationStatus] = useState<AvailabilityStatusAJAXView | null>(null);
    const updateRestaurant = useUnaryAction(restaurantActions.updateRestaurantStatus);
    const restaurantStatus = useMemo(() => {
        if (!restaurantInfo) {
            return {
                isOpen: false,
                isClose: false,
                isPause: false,
                isForceClosed: false,
                inActive: false,
                isUnpublished: false,
            };
        } else {
            return {
                isOpen: restaurantInfo.status === GetServingInfoAJAXResponse$AvailabilityStatus.OPEN && !isOutOfServiceTime,
                isClose: restaurantInfo.status === GetServingInfoAJAXResponse$AvailabilityStatus.CLOSED && !isOutOfServiceTime,
                isPause: restaurantInfo.status === GetServingInfoAJAXResponse$AvailabilityStatus.PAUSE_ORDERS && !isOutOfServiceTime,
                isForceClosed: restaurantInfo.status === GetServingInfoAJAXResponse$AvailabilityStatus.FORCE_CLOSED && !isOutOfServiceTime,
                inActive: restaurantInfo.status === GetServingInfoAJAXResponse$AvailabilityStatus.INACTIVE,
                isUnpublished: restaurantInfo.status === GetServingInfoAJAXResponse$AvailabilityStatus.UNPUBLISHED,
            };
        }
    }, [restaurantInfo, isOutOfServiceTime]);
    const disabled = restaurantStatus.isForceClosed || isOutOfServiceTime || restaurantStatus.inActive || restaurantStatus.isUnpublished;
    const handleOpen = () => {
        updateRestaurant({
            status: AvailabilityStatusAJAXView.OPEN,
            pause_orders_duration_in_minutes: null,
            reason_for_closure: null,
        });
        setMenuVisible(false);
        onHideMobileMenu && onHideMobileMenu();
    };
    const handleHideMenu = () => {
        setMenuVisible(false);
        onHideMobileMenu && onHideMobileMenu();
    };
    const handleCloseModal = () => setOperationStatus(null);
    const RestaurantListArr = useMemo(
        () => [
            {
                text: "Open for orders",
                color: colors.status.open,
                active: restaurantStatus.isOpen,
                onClick: () => !restaurantStatus.isOpen && handleOpen(),
            },
            {
                text: "Pause orders",
                color: colors.status.paused,
                active: restaurantStatus.isPause,
                onClick: () => !restaurantStatus.isPause && setOperationStatus(AvailabilityStatusAJAXView.PAUSE_ORDERS),
            },
            {
                text: "Close restaurant",
                color: colors.status.closed,
                active: restaurantStatus.isClose,
                onClick: () => !restaurantStatus.isClose && setOperationStatus(AvailabilityStatusAJAXView.CLOSED),
            },
        ],
        [restaurantStatus, handleOpen]
    );

    if (!restaurantInfo) return null;

    return (
        <Box>
            {restaurantStatus.isForceClosed && <ForceClosedTip supportPhone={supportPhone} />}
            <Stack
                sx={
                    disabled
                        ? {
                              opacity: 0.25,
                              pointerEvents: "none",
                          }
                        : {}
                }
            >
                {RestaurantListArr.map(item => (
                    <RestaurantStatusItem key={item.text} {...item} />
                ))}
            </Stack>
            <PauseModal onHideMenu={handleHideMenu} visible={operationStatus === AvailabilityStatusAJAXView.PAUSE_ORDERS} onClose={handleCloseModal} />
            <CloseModal onHideMenu={handleHideMenu} visible={operationStatus === AvailabilityStatusAJAXView.CLOSED} onClose={handleCloseModal} />
        </Box>
    );
};

export default RestaurantStatusList;
