import {Box, ClickAwayListener, Tooltip} from "@mui/material";
import {useResponsive} from "ahooks";
import {ChevronLeftSmallIcon, ChevronRightSmallIcon, InfoCircleOutlined} from "asset/icon/smallIcon";
import {colors} from "colors";
import React from "react";
import {theme} from "theme";
import {mpx2vw} from "utils/transform";

interface OrdersSummaryItem {
    label: string;
    value_key: string;
    tooltip?: string;
}

interface OrdersSummaryItemComponentProps {
    item: OrdersSummaryItem;
    tipShow: boolean;
    hideTip: () => void;
    showTip: () => void;
}

const ordersSummary: OrdersSummaryItem[] = [
    {
        label: "Total Orders",
        value_key: "total_orders",
        tooltip: "The total number of orders placed based on date and filter selection.",
    },
    {
        label: "Pre-Tax Total",
        value_key: "pre_tax_total",
        tooltip: "The total of all pre-tax subtotals based on date and filter selections.",
    },
    {
        label: "Total Tax",
        value_key: "total_tax",
    },
    {
        label: "Total Commission",
        value_key: "total_commission",
    },
    {
        label: "Total Refunds",
        value_key: "total_refunds",
        tooltip: "The total amount refunded to customers for quality issues, missing items, or cancellations.",
    },
    {
        label: "Total Fees",
        value_key: "total_fees",
        tooltip: "The total amount of fees deducted from orders based on the fee agreement established with your account partner.",
    },
    {
        label: "Estimated Payout",
        value_key: "estimated_payout",
        tooltip: "The estimated payout including restaurant tip and deducting tax, commission, refunds and fees.",
    },
];

const OrdersSummaryItemComponent = ({item, tipShow, hideTip, showTip}: OrdersSummaryItemComponentProps) => {
    const screens = useResponsive();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    color: colors.primary.poblano,
                    fontSize: "14px",
                    lineHeight: "20px",
                    fontWeight: 700,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    [theme.breakpoints.down(480)]: {
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(20),
                    },
                }}
            >
                <Box component="span"> {item.label}</Box>
                {item.tooltip && (
                    <ClickAwayListener
                        onClickAway={() => {
                            if (tipShow) {
                                hideTip();
                            }
                        }}
                    >
                        <Box>
                            <Tooltip
                                title={item.tooltip}
                                PopperProps={{
                                    className: "orders-summary-tooltip",
                                }}
                                arrow
                                open={tipShow}
                                onClose={() => {
                                    hideTip();
                                }}
                                disableFocusListener
                                disableHoverListener
                                disableTouchListener
                                placement={!screens.xs ? "bottom-start" : undefined}
                                sx={{
                                    marginLeft: "8px",
                                    display: "flex",
                                    alignContent: "center",
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                    [theme.breakpoints.down(480)]: {
                                        ml: mpx2vw(8),
                                    },
                                }}
                            >
                                <Box>
                                    <InfoCircleOutlined
                                        onClick={() => {
                                            showTip();
                                        }}
                                    />
                                </Box>
                            </Tooltip>
                        </Box>
                    </ClickAwayListener>
                )}
            </Box>
            <Box
                sx={{
                    fontSize: "16px",
                    lineHeight: "20px",
                    [theme.breakpoints.down(480)]: {
                        fontSize: mpx2vw(16),
                        lineHeight: mpx2vw(20),
                    },
                }}
            >
                {item.value_key}
            </Box>
        </Box>
    );
};

const SummaryTitle = () => {
    return (
        <Box
            sx={{
                fontSize: "16px",
                lineHeight: "20px",
                textAlign: "center",
                color: colors.black,
                pb: "24px",
                [theme.breakpoints.down(480)]: {
                    fontSize: mpx2vw(16),
                    lineHeight: mpx2vw(20),
                    pb: mpx2vw(24),
                },
            }}
        >
            Summary from{" "}
            <Box component="span" sx={{color: colors.primary.poblano, fontWeight: 700}}>
                04/20/22
            </Box>{" "}
            to{" "}
            <Box component="span" sx={{color: colors.primary.poblano, fontWeight: 700}}>
                Today
            </Box>
        </Box>
    );
};

export const OrdersSummaryPC = () => {
    const [activatedTooltip, setActivatedTooltip] = React.useState<number | null>(null);
    const handleHideTip = () => {
        setActivatedTooltip(null);
    };

    return (
        <Box
            sx={{
                borderRadius: "4px",
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                backgroundColor: "#FDFDFD",
                height: "148px",
                py: "32px",
                mx: "40px",
                px: "20px",
            }}
        >
            <SummaryTitle />
            <Box sx={{display: "flex", flex: "row"}}>
                {ordersSummary.map((item, index) => {
                    return (
                        <Box sx={{width: "calc(100%/7)"}} key={item.value_key}>
                            <OrdersSummaryItemComponent item={item} showTip={() => setActivatedTooltip(index)} hideTip={handleHideTip} tipShow={activatedTooltip === index} />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export const OrdersSummaryMobile = () => {
    const [activatedTooltip, setActivatedTooltip] = React.useState<number | null>(null);
    const [showIndex, setShowIndex] = React.useState<number>(1);
    const [transitioning, setTransitioning] = React.useState(false);
    const handleHideTip = () => {
        setActivatedTooltip(null);
    };
    const handleNextOne = () => {
        if (transitioning) {
            return false;
        }
        setTransitioning(true);
        if (showIndex === 9) {
            setShowIndex(0);
        } else {
            setShowIndex(showIndex + 1);
        }
    };
    const handlePreOne = () => {
        if (transitioning) {
            return false;
        }
        setTransitioning(true);
        if (showIndex === -1) {
            setShowIndex(9);
        } else {
            setShowIndex(showIndex - 1);
        }
    };

    console.info("activatedTooltip===>", activatedTooltip);

    return (
        <Box
            sx={{
                borderRadius: mpx2vw(4),
                boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
                backgroundColor: "#FDFDFD",
                height: mpx2vw(148),
                py: mpx2vw(32),
                px: mpx2vw(10),
            }}
        >
            <SummaryTitle />
            <Box sx={{width: "100", overflow: "hidden", position: "relative"}}>
                <Box
                    style={{
                        display: "flex",
                        flex: "row",
                        width: "900%",
                        transform: `translateX(-${(100 / 9) * showIndex}%)`,
                        transition: transitioning ? "transform 0.8s" : "none",
                    }}
                    onTransitionEnd={() => {
                        setTransitioning(false);
                        if (showIndex === 8) {
                            setShowIndex(1);
                        }
                        if (showIndex === 0) {
                            setShowIndex(7);
                        }
                    }}
                >
                    {[ordersSummary[ordersSummary.length - 1]].concat(ordersSummary.concat([ordersSummary[0]])).map((item, index) => {
                        return (
                            <Box sx={{width: "calc(100%/9)"}} key={index}>
                                <OrdersSummaryItemComponent item={item} showTip={() => setActivatedTooltip(index)} hideTip={handleHideTip} tipShow={activatedTooltip === index} />
                            </Box>
                        );
                    })}
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        top: "15px",
                        left: "4px",
                        [theme.breakpoints.down(480)]: {
                            top: mpx2vw(15),
                            left: mpx2vw(4),
                        },
                    }}
                    onClick={handlePreOne}
                    component="span"
                >
                    <ChevronLeftSmallIcon />
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        top: "15px",
                        right: "4px",
                        [theme.breakpoints.down(480)]: {
                            top: mpx2vw(15),
                            right: mpx2vw(4),
                        },
                    }}
                    onClick={handleNextOne}
                    component="span"
                >
                    <ChevronRightSmallIcon />
                </Box>
            </Box>
        </Box>
    );
};
