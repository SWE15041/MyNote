import React, {useMemo, useState, useRef, useEffect} from "react";
import {Statistic} from "antd";
import {ClockCircleOutlined} from "@ant-design/icons";
import {useUnaryAction} from "@wonder/core-fe";
import {useSelector} from "react-redux";
import {styled} from "@mui/material/styles";
import {Dialog} from "widget/Dialog";
import {RootState} from "type/state";
import useAudio from "./useAudio";
const {Countdown} = Statistic;
import {StatisticProps} from "antd/lib/statistic/Statistic";
import {AvailabilityStatusAJAXView, GetServingInfoAJAXResponse$AvailabilityStatus} from "type/api";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";
import {restaurantActions} from "module/restaurant";
import {PAUSE_ORDER_MODAL_CLOSE_BY_RESTAURANT} from "module/login/type";

declare module "antd" {
    interface StatisticProps {
        onChange?: (value: number) => void;
        onFinish?: () => void;
    }
}

const EnvoyCountdown = (props: StatisticProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <Countdown {...props} />;
};

interface ClockProps {
    staticUi: boolean;
    style?: React.CSSProperties;
}

const ModalClock = styled("div")(() => ({
    marginTop: 18,
    textAlign: "center",
    fontSize: "20px",
    color: colors.primary.poblano,
    "& svg": {
        fontSize: 18,
    },
    "& .clock-label": {
        fontFamily: `"Heebo", sans-serif`,
    },
    "& .ant-statistic": {
        display: "inline-block",
        "& .ant-statistic-content": {
            color: colors.primary.poblano,
            fontFamily: `"Heebo", sans-serif`,
            fontSize: 20,
        },
        "& .ant-statistic-content-value": {
            color: colors.primary.poblano,
            fontSize: 20,
        },
    },
    "@media screen and (max-width: 480px)": {
        marginTop: mpx2vw(20),
        lineHeight: mpx2vw(20),
        "& svg": {
            fontSize: mpx2vw(16),
        },
        "& .clock-label": {
            fontSize: mpx2vw(18),
        },
        "& .ant-statistic": {
            display: "block",
            "& .ant-statistic-content": {
                color: colors.primary.poblano,
                fontSize: mpx2vw(18),
            },
            "& .ant-statistic-content-value": {
                color: colors.primary.poblano,
                fontSize: mpx2vw(18),
                paddingLeft: mpx2vw(21),
            },
        },
    },
}));

const Clock = React.memo((props: ClockProps) => {
    const {staticUi = false, style} = props;
    const tag = useRef(false);
    const [show, setShow] = useState(false);
    const {servingInfo, restaurantInfo} = useSelector((state: RootState) => state.app.restaurant);
    const seconds = servingInfo?.paused_status_left_time_in_seconds || 0;
    const isPause = restaurantInfo?.status === GetServingInfoAJAXResponse$AvailabilityStatus.PAUSE_ORDERS;

    const clockValue = useMemo(() => Date.now() + 1000 * seconds, [seconds]);

    useEffect(() => {
        tag.current = false;
    }, [seconds]);

    const updateRestaurant = useUnaryAction(restaurantActions.updateRestaurantStatus);
    const extendPauseOrdersDuration = useUnaryAction(restaurantActions.extendPauseOrdersDuration);

    useAudio(isPause && show && !staticUi);

    const handleClose = () => {
        setShow(false);
    };
    const handleChangeTime = (value: number) => {
        const isModalHadBeClosedByRestaurant = localStorage.getItem(PAUSE_ORDER_MODAL_CLOSE_BY_RESTAURANT);

        const twoMin = 2 * 60 * 1000;
        if (!show && value <= twoMin && !tag.current && isModalHadBeClosedByRestaurant !== "1") {
            setShow(true);
            tag.current = true;
        }
    };

    const handleAddTime = () => {
        extendPauseOrdersDuration({
            duration_in_minutes: 15,
        });
        handleClose();
    };
    const handleOpenOrder = () => {
        updateRestaurant({
            status: AvailabilityStatusAJAXView.OPEN,
            pause_orders_duration_in_minutes: null,
            reason_for_closure: null,
        });
        handleClose();
    };
    const Content = () => {
        return (
            <ModalClock className="modal-clock">
                <ClockCircleOutlined />
                <span className="clock-label"> Orders paused </span>
                <Countdown
                    onFinish={() => {
                        isPause && show && handleOpenOrder();
                    }}
                    value={clockValue}
                />
            </ModalClock>
        );
    };
    const text = (
        <span>
            Pause for <strong>+15 min</strong>
        </span>
    );

    return (
        <>
            <EnvoyCountdown key={clockValue} style={style} onFinish={handleOpenOrder} onChange={handleChangeTime} value={clockValue} />
            {!staticUi && (
                <Dialog
                    sx={{
                        "& .MuiPaper-root": {
                            maxWidth: "495px",
                        },
                    }}
                    open={isPause && show}
                    title="Your restaurant is about to reopen"
                    contentText="We can keep your restaurant paused for 15 more minutes, or you can pause orders again from the menu bar."
                    actions={[
                        {
                            key: "+15",
                            text: text as any,
                            variant: "outlined",
                            onClick: handleAddTime,
                        },
                        {
                            key: "open",
                            text: "Open for Orders",
                            variant: "contained",
                            onClick: handleOpenOrder,
                        },
                    ]}
                    onClose={() => {
                        setShow(false);
                        localStorage.setItem(PAUSE_ORDER_MODAL_CLOSE_BY_RESTAURANT, "1");
                    }}
                >
                    <Content />
                </Dialog>
            )}
        </>
    );
});
export default Clock;
