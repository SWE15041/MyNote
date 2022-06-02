// @flow
import React from "react";
import MuiFormControlLabel, {FormControlLabelProps} from "@mui/material/FormControlLabel";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";
import {merge} from "lodash";

type Props = {} & FormControlLabelProps;
export const FormControlLabel = ({sx, ...reset}: Props) => {
    const copySx = merge(
        {
            ml: 0,
            mr: 0,
            color: colors.black,
            display: "flex",
            alignItems: "center",
            ".MuiFormControlLabel-label": {
                fontSize: "14px",
                lineHeight: "20px",
            },
            "@media screen and (max-width: 480px)": {
                ".MuiFormControlLabel-label": {
                    fontSize: mpx2vw(14),
                    lineHeight: mpx2vw(20),
                },
            },
        },
        sx
    );

    return <MuiFormControlLabel sx={copySx} {...reset} />;
};
