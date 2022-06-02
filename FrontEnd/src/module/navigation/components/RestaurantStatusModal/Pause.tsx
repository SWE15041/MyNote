import React, {useState, useEffect, useRef} from "react";
import {useUnaryAction} from "@wonder/core-fe";
import Block from "widget/Block";
import {Dialog} from "widget/Dialog";
import {useResponsive} from "hooks/useResponsive";
import {AvailabilityStatusAJAXView} from "type/api";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import {RestaurantStatusTitle} from "./RestaurantStatusTitle";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";
import {ExclamationCircleOutline} from "asset/icon";
import {restaurantActions} from "module/restaurant";

type timeGridType = "15" | "30" | "45" | "60" | "90" | "other";
const timeGrid: timeGridType[] = ["15", "30", "45", "60", "90", "other"];

interface Props {
    onChangeOtherTime: (str: string | null) => void;
    otherTime: string | null;
    time: timeGridType | null;
    onChangeTime: (str: timeGridType | null) => void;
    warning: boolean;
}

const TimePanel = (props: Props) => {
    const inputRef = useRef(null);
    const {onChangeTime, time: value, otherTime, onChangeOtherTime, warning} = props;
    const screens = useResponsive();

    const isPc = screens.xs;

    const timeBoxSx = (active: boolean) => ({
        width: "169px",
        height: "107px",
        border: `1px solid ${colors.primary.poblano}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: colors.primary.poblano,
        bgcolor: active ? "rgba(0, 116, 115, 0.23)" : colors.primary.white,
        fontWeight: active ? 700 : 400,
        cursor: "pointer",
        "@media screen and (max-width: 480px)": {
            width: mpx2vw(129),
            height: mpx2vw(50),
            mb: mpx2vw(10),
            fontWeight: 400,
            "&:nth-of-type(5),&:nth-of-type(6)": {
                mb: 0,
            },
        },
    });

    return (
        <Stack
            sx={{
                margin: "16px auto 0 auto",
                width: "507px",
                flexWrap: "wrap",
                fontSize: "16px",
                "@media screen and (max-width: 480px)": {
                    border: 0,
                    justifyContent: "space-around",
                    width: mpx2vw(270),
                    mt: mpx2vw(16),
                    fontSize: mpx2vw(18),
                },
            }}
            direction="row"
        >
            {timeGrid.map((timeKey: timeGridType, idx: number) => {
                const style: React.CSSProperties = {
                    borderRightWidth: (idx + 1) % 3 !== 0 ? 0 : 1,
                    borderBottomWidth: idx < 3 ? 0 : 1,
                };

                if (timeKey === "other") {
                    return (
                        <Box
                            component="span"
                            sx={timeBoxSx(timeKey === value)}
                            style={(isPc && style) || {}}
                            key={timeKey}
                            onClick={() => {
                                onChangeTime(timeKey);
                            }}
                        >
                            <Block show={value !== "other"}>Other</Block>
                            <Block show={value === "other"}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flex: 0.4,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        "& .adm-input": {
                                            flex: 1.5,
                                            input: {
                                                color: colors.primary.poblano,
                                            },
                                            "input[type='number']": {
                                                MozAppearance: "textfield",
                                            },
                                            "input[type='number']::-webkit-inner-spin-button,input[type='number']::-webkit-outer-spin-button": {
                                                WebkitAppearance: "none",
                                                m: 0,
                                            },
                                        },
                                        "& .unit": {
                                            flex: 0.5,
                                        },
                                        "@media screen and (max-width: 480px)": {
                                            flex: 0.6,
                                            "& input": {
                                                fontSize: mpx2vw(18),
                                            },
                                        },
                                    }}
                                >
                                    <div className="adm-input">
                                        <InputBase
                                            style={{fontWeight: isPc ? "bold" : "normal"}}
                                            className="adm-input-element"
                                            autoFocus
                                            ref={inputRef}
                                            inputProps={{
                                                "aria-valuemin": 1,
                                                min: 1,
                                            }}
                                            type="number"
                                            value={otherTime || ""}
                                            onChange={({target: {value}}) => {
                                                if (value) {
                                                    onChangeOtherTime(Number(value) >= 1 ? Number(value).toFixed(0) : "1");
                                                } else {
                                                    onChangeOtherTime(value);
                                                }
                                            }}
                                        />
                                    </div>
                                    <span className="unit">min</span>
                                </Box>
                            </Block>
                        </Box>
                    );
                }

                return (
                    <Box
                        component="span"
                        sx={timeBoxSx(timeKey === value)}
                        style={(isPc && style) || {}}
                        key={timeKey}
                        onClick={() => {
                            onChangeTime(timeKey);
                        }}
                    >
                        {timeKey} min
                    </Box>
                );
            })}

            <Block show={warning}>
                <Box
                    component="p"
                    sx={{
                        display: "flex",
                        mt: "5px",
                        mb: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        color: colors.validation.red,
                        fontSize: "14px",
                        lineHeight: "23px",
                        "& svg": {
                            mr: "8px",
                        },
                        "@media screen and (max-width: 480px)": {
                            fontSize: mpx2vw(14),
                            mt: mpx2vw(7),
                            alignItems: "flex-start",
                            "& svg": {
                                mt: mpx2vw(4),
                                mr: mpx2vw(8),
                                ml: mpx2vw(2),
                            },
                        },
                    }}
                    className="danger-text"
                >
                    <ExclamationCircleOutline color="#D93927" />
                    <span> The time entered exceeds the time limit (1440 min)</span>
                </Box>
            </Block>
        </Stack>
    );
};

const Pause = (props: {visible: boolean; onClose: () => void; onHideMenu: () => void}) => {
    const {visible, onClose, onHideMenu} = props;
    const [time, setTime] = useState<timeGridType | null>(null);
    const [otherTime, setOtherTime] = useState<string | null>(null);
    const updateRestaurant = useUnaryAction(restaurantActions.updateRestaurantStatus);
    const uninstall = () => {
        setTime(null);
        setOtherTime(null);
    };

    const handlePause = () => {
        const minutes = time !== "other" ? time : otherTime;

        updateRestaurant({
            status: AvailabilityStatusAJAXView.PAUSE_ORDERS,
            pause_orders_duration_in_minutes: Number(minutes),
            reason_for_closure: null,
        });

        onHideMenu();
    };

    const limitTime = otherTime && Number(otherTime) > 1440 && time === "other";

    const disabled = !((time && time !== "other") || (time === "other" && otherTime && !limitTime));

    useEffect(() => {
        if (!visible) {
            uninstall();
        }
    }, [visible]);

    return (
        <>
            <Dialog
                sx={{
                    "& .MuiPaper-root": {
                        maxWidth: "585px",
                        "@media screen and (max-width: 480px)": {
                            maxHeight: "none",
                        },
                    },
                }}
                open={visible}
                title={<RestaurantStatusTitle title="Need to pause your orders?" color={colors.status.paused} />}
                contentText="Select the amount of time you need, and we’ll reopen your restaurant when you’re ready"
                maskClosable={false}
                actions={[
                    {
                        key: "cancel",
                        text: "Cancel",
                        variant: "outlined",
                        onClick: onClose,
                    },
                    {
                        key: "pause",
                        text: "Pause Orders",
                        variant: "contained",
                        disabled,
                        onClick: handlePause,
                    },
                ]}
                onClose={onClose}
            >
                <TimePanel warning={!!limitTime} time={time} onChangeTime={setTime} otherTime={otherTime} onChangeOtherTime={setOtherTime} />
            </Dialog>
        </>
    );
};
export default Pause;
