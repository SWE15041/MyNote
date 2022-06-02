// @flow
import React from "react";
import MuiButton, {ButtonProps} from "@mui/material/Button";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";

type Props = {} & ButtonProps;

export const Button = ({children, sx = [], ...reset}: Props) => {
    return (
        <MuiButton
            disableRipple
            sx={[
                {
                    boxShadow: "none",
                    borderRadius: "4px",
                    borderColor: colors.primary.poblano,
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "26px",
                    letterSpacing: "0.46px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: theme => theme.transitions.create(["background-color", "opacity"]),
                    "&.MuiButton-contained": {
                        bgcolor: colors.primary.poblano,
                        "&:hover": {
                            backgroundColor: colors.primary.poblano,
                            opacity: 0.8,
                            boxShadow: "none",
                        },
                    },
                    "&.MuiButton-outlined": {
                        color: colors.primary.poblano,
                        "&:hover": {
                            bgcolor: "#fff",
                            borderColor: colors.primary.poblano,
                            opacity: 0.8,
                            boxShadow: "none",
                        },
                        "&.MuiButton-sizeSmall": {
                            p: "2px 21px",
                        },
                        "&.MuiButton-sizeMedium": {
                            p: "7px 21px",
                        },
                        "&.MuiButton-sizeLarge": {
                            p: "7px 21px",
                        },
                    },
                    "&.Mui-disabled": {
                        "&.MuiButton-contained": {
                            color: colors.gray.medium,
                            backgroundColor: colors.gray.light,
                        },
                        "&.MuiButton-outlined": {
                            borderColor: colors.gray.medium,
                            color: colors.gray.medium,
                        },
                    },
                    "&.MuiButton-sizeSmall": {
                        p: "3px 22px",
                    },
                    "&.MuiButton-sizeMedium": {
                        p: "8px 22px",
                    },
                    "&.MuiButton-sizeLarge": {
                        p: "8px 22px",
                    },
                },
                {
                    "@media screen and (max-width: 480px)": {
                        borderRadius: mpx2vw(4),
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(26),
                        "&.MuiButton-sizeSmall": {
                            p: `${mpx2vw(3)} ${mpx2vw(22)}`,
                        },
                        "&.MuiButton-sizeMedium": {
                            p: `${mpx2vw(8)} ${mpx2vw(22)}`,
                        },
                        "&.MuiButton-sizeLarge": {
                            p: `${mpx2vw(8)} ${mpx2vw(22)}`,
                        },
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...reset}
        >
            {children}
        </MuiButton>
    );
};
