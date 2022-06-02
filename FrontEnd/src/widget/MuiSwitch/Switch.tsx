// @flow
import React from "react";
import MuiSwitch, {SwitchProps} from "@mui/material/Switch";
import {styled} from "@mui/material/styles";
import {colors} from "../../colors";
import {mpx2vw} from "../../utils/transform";

type Props = {} & SwitchProps;

const StyledSwitch = styled(MuiSwitch)(({theme}) => ({
    width: 40,
    height: 20,
    padding: 0,
    [theme.breakpoints.down(480)]: {
        width: mpx2vw(40),
        height: mpx2vw(20),
    },
    display: "flex",
    "& .MuiSwitch-switchBase": {
        padding: 4,
        "&.Mui-checked": {
            transform: "translateX(20px)",
            [theme.breakpoints.down(480)]: {
                transform: `translateX(${mpx2vw(20)})`,
            },
            color: "#fff",
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: colors.status.open,
            },
        },
        "&.Mui-disabled": {
            color: "#fff",
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: colors.gray.superLight,
            },
        },
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.05), 0px 0px 1px rgba(0, 0, 0, 0.25)",
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(["width"], {
            duration: 200,
        }),
        [theme.breakpoints.down(480)]: {
            width: mpx2vw(12),
            height: mpx2vw(12),
            borderRadius: mpx2vw(6),
        },
    },
    "& .MuiSwitch-track": {
        borderRadius: 20 / 2,
        [theme.breakpoints.down(480)]: {
            borderRadius: mpx2vw(20 / 2),
        },
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : colors.gray.medium,
        boxSizing: "border-box",
    },
}));

export const Switch = (props: Props) => {
    return <StyledSwitch {...props} />;
};
