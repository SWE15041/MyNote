import React, {useState, useEffect} from "react";
import {useUnaryAction} from "@wonder/core-fe";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {AvailabilityStatusAJAXView, RestaurantManualCloseReasonAJAXView} from "type/api";
import {Dialog} from "widget/Dialog";
import {Radio} from "widget/MuiRadio";
import {RestaurantStatusTitle} from "./RestaurantStatusTitle";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";
import {restaurantActions} from "module/restaurant";

const RADIO = [
    {value: RestaurantManualCloseReasonAJAXView.KITCHEN_TOO_BUSY, label: "Kitchen too busy"},
    {value: RestaurantManualCloseReasonAJAXView.NOT_ENOUGH_STAFF, label: "Not enough staff"},
    {value: RestaurantManualCloseReasonAJAXView.CHANGE_IN_OPERATING_HOURS, label: "Change in operating hours"},
    {
        value: RestaurantManualCloseReasonAJAXView.PLANNED_CLOSURE,
        label: "Planned closure (e.g., renovations, holidays)",
    },
    {
        value: RestaurantManualCloseReasonAJAXView.UNPLANNED_CLOSURE,
        label: "Unplanned closure (e.g., weather issue, emergency maintenance)",
    },
];
const Panel = ({status, onChange}: {status: string | null; onChange: (str: RestaurantManualCloseReasonAJAXView | null) => void}) => {
    return (
        <Box
            sx={{
                width: "400px",
                m: "19px auto 0 auto",
                "@media screen and (max-width: 480px)": {
                    width: mpx2vw(235),
                    mt: mpx2vw(25),
                },
            }}
        >
            <RadioGroup
                value={status}
                onChange={(event, value) => {
                    onChange(value as RestaurantManualCloseReasonAJAXView);
                }}
            >
                <Stack
                    sx={{
                        "label ~ label": {
                            mt: "4px",
                        },
                        "@media screen and (max-width: 480px)": {
                            "label ~ label": {
                                mt: mpx2vw(8),
                            },
                        },
                    }}
                >
                    {RADIO.map(item => {
                        return (
                            <FormControlLabel
                                key={item.value}
                                sx={{
                                    mx: 0,
                                    alignItems: "flex-start",
                                    "& .MuiRadio-root": {
                                        mt: "-8px",
                                    },
                                    "& .MuiTypography-root": {
                                        fontSize: "14px",
                                        lineHeight: "22px",
                                        "@media screen and (max-width: 480px)": {
                                            fontSize: mpx2vw(14),
                                        },
                                    },
                                }}
                                value={item.value}
                                control={
                                    <Radio
                                        onClick={() => {
                                            if (item.value === status) {
                                                onChange(null);
                                            }
                                        }}
                                    />
                                }
                                label={item.label}
                            />
                        );
                    })}
                </Stack>
            </RadioGroup>
        </Box>
    );
};

const Close = (props: {visible: boolean; onClose: () => void; onHideMenu: () => void}) => {
    const {visible, onClose, onHideMenu} = props;
    const [closeStatus, setCloseStatus] = useState<RestaurantManualCloseReasonAJAXView | null>(null);
    const updateRestaurant = useUnaryAction(restaurantActions.updateRestaurantStatus);

    const handleConfirm = () => {
        updateRestaurant({
            status: AvailabilityStatusAJAXView.CLOSED,
            pause_orders_duration_in_minutes: null,
            reason_for_closure: closeStatus,
        });
        onHideMenu();
    };

    const uninstall = () => {
        setCloseStatus(null);
    };

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
                        width: "496px",
                    },
                }}
                open={visible}
                title={<RestaurantStatusTitle title="Close restaurant?" color={colors.status.closed} />}
                contentText={
                    <>
                        <span style={{display: "block"}}>
                            Your restaurant will <strong>automatically close</strong> at the end of your day.{" "}
                        </span>
                        <span style={{display: "block"}}>
                            <Box
                                component="span"
                                sx={{
                                    "@media screen and (max-width: 480px)": {
                                        display: "block",
                                    },
                                }}
                            >
                                Do you still want to close now?{" "}
                            </Box>
                            Please provide a reason.
                        </span>
                    </>
                }
                maskClosable={false}
                onClose={onClose}
                actions={[
                    {
                        key: "cancel",
                        text: "Cancel",
                        variant: "outlined",
                        onClick: onClose,
                    },
                    {
                        key: "confirm",
                        text: "Close Restaurant",
                        variant: "contained",
                        onClick: handleConfirm,
                    },
                ]}
            >
                <Panel status={closeStatus} onChange={setCloseStatus} />
            </Dialog>
        </>
    );
};
export default Close;
