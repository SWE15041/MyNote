// @flow
import React, {useEffect, useState} from "react";
import InputBase, {InputBaseProps} from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import {useInputColor} from "./hooks";
import {colors} from "colors";
import {AnimateLabel} from "./AnimateLabel";
import {ExtraText} from "./ExtraText";
import {HelpText} from "./HelpText";
import {mpx2vw} from "utils/transform";

interface Props extends InputBaseProps {
    label: string;
    extra?: React.ReactNode;
    help?: React.ReactNode;
}

export const CustomerInput = ({label, value, error, onFocus, onBlur, extra, help, sx, ...reset}: Props) => {
    const [isFocus, setIsFocus] = useState(false);
    const [color] = useInputColor({value, isFocus, error});

    useEffect(() => {
        if (value) {
            setIsFocus(true);
        }
    }, [value]);

    return (
        <Box sx={{position: "relative", ...sx}}>
            <AnimateLabel label={label} isFocus={isFocus} error={error} />
            <InputBase
                {...reset}
                sx={{
                    border: `1px solid ${color}`,
                    borderRadius: "4px",
                    "& .MuiInputBase-input": {
                        position: "relative",
                        fontSize: 14,
                        width: "auto",
                        padding: "10px",
                        transition: theme => theme.transitions.create(["border-color", "background-color", "box-shadow"]),
                    },
                    "& input": {
                        flex: 1,
                        color: colors.black,
                    },
                    "@media screen and (max-width: 480px)": {
                        "& .MuiInputBase-input": {
                            fontSize: mpx2vw(14),
                            padding: mpx2vw(10),
                            borderRadius: mpx2vw(4),
                        },
                    },
                }}
                value={value}
                onFocus={e => {
                    onFocus && onFocus(e);
                    setIsFocus(true);
                }}
                onBlur={e => {
                    onBlur && onBlur(e);
                    if (!e.target.value) {
                        setIsFocus(false);
                    }
                }}
            />
            <ExtraText extra={extra} />
            <HelpText help={help} />
        </Box>
    );
};
