import React from "react";
import {Box} from "@mui/material";
import {mpx2vw} from "utils/transform";
import {colors} from "colors";

export const ExtraText = ({extra}: {extra?: React.ReactNode}) => {
    return extra ? (
        React.isValidElement(extra) ? (
            extra
        ) : (
            <Box
                component="div"
                sx={{
                    color: colors.gray.medium,
                    fontSize: "14px",
                    lineHeight: "20px",
                    m: 0,
                    pt: "3px",
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(20),
                    },
                }}
            >
                {extra}
            </Box>
        )
    ) : null;
};
