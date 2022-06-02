// @flow
import React from "react";
import MuiCheckbox, {CheckboxProps} from "@mui/material/Checkbox";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";

type Props = {} & CheckboxProps;
export const Checkbox = ({checked, ...reset}: Props) => {
    return (
        <MuiCheckbox
            sx={{
                "& .MuiSvgIcon-root": {
                    fontSize: "24px",
                    color: checked ? colors.primary.poblano : colors.gray.medium,
                },
                "&:hover": {
                    bgcolor: colors.gray.superLight,
                },
                "@media screen and (max-width: 480px)": {
                    "& .MuiSvgIcon-root": {
                        fontSize: mpx2vw(24),
                    },
                    "&:hover": {
                        bgcolor: "transparent",
                    },
                },
            }}
            checked={checked}
            {...reset}
        />
    );
};
