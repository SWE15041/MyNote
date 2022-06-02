import React from "react";
import InputBase, {InputBaseProps} from "@mui/material/InputBase";
import {colors} from "colors";
import _, {merge} from "lodash";
import {mpx2vw} from "utils/transform";

interface Props extends InputBaseProps {
    isFocus?: boolean;
    max?: number;
}

export const InputNumber = ({max, value, sx, isFocus, ...reset}: Props) => {
    const borderColor = isFocus ? colors.primary.poblano : colors.gray.medium;
    let copyValue = value;

    if (value) {
        if (max && Number(value) >= max) {
            copyValue = max;
        } else {
            copyValue = Number(value) >= 1 ? Number(value).toFixed(0) : "1";
        }
    }

    const copySx = merge(
        {
            height: "32px",
            width: "96px",
            border: `1px solid ${borderColor}`,
            borderRadius: "4px",
            pr: "8px",
            "& .MuiInputBase-input": {
                position: "relative",
                fontSize: "14px",
                width: "auto",
                p: "0 0 0 10px",
                height: "26px",
                // mr: "5px",
            },
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(32),
                borderRadius: mpx2vw(4),
                pr: mpx2vw(8),
                width: mpx2vw(96),
                "& .MuiInputBase-input": {
                    fontSize: mpx2vw(14),
                    width: "auto",
                    p: `0 0 0 ${mpx2vw(10)}`,
                    height: mpx2vw(26),
                    // mr: mpx2vw(5),
                },
            },
        },
        sx
    );

    return <InputBase type="number" value={copyValue} sx={copySx} {...reset} />;
};
