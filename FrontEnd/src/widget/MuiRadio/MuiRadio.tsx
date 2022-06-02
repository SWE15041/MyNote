// @flow
import React from "react";
import Radio, {RadioProps} from "@mui/material/Radio";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";

type Props = {} & RadioProps;

export const MuiRadio = (props: Props) => {
    return (
        <Radio
            sx={{
                "& .MuiSvgIcon-root": {
                    fontSize: "20px",
                    color: colors.gray.gray,
                },
                "&:hover": {
                    bgcolor: colors.gray.superLight,
                },
                "&.Mui-checked": {
                    "& .MuiSvgIcon-root": {
                        color: colors.primary.poblano,
                    },
                },
                "&.Mui-disabled": {
                    "& .MuiSvgIcon-root": {
                        color: colors.gray.light,
                    },
                },
                "@media screen and (max-width: 480px)": {
                    "& .MuiSvgIcon-root": {
                        fontSize: mpx2vw(20),
                    },
                    "&:hover": {
                        bgcolor: "transparent",
                    },
                },
            }}
            {...props}
        />
    );
};
