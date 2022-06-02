// @flow
import React from "react";
import MuiLink, {LinkProps} from "@mui/material/Link";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";

type Props = {} & LinkProps;
export const Link = ({children, sx = [], ...reset}: Props) => {
    return (
        <MuiLink
            {...reset}
            underline="hover"
            sx={[
                {
                    fontSize: "14px",
                    lineHeight: "20px",
                    color: colors.primary.poblano,
                    textDecoration: "none",
                    "&:active": {
                        textDecoration: "underline",
                    },
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(20),
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </MuiLink>
    );
};
