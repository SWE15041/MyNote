// @flow
import React from "react";
import MuiLoadingButton, {LoadingButtonProps} from "@mui/lab/LoadingButton";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";

type Props = {} & LoadingButtonProps;
export const LoadingButton = ({children, sx = [], ...reset}: Props) => {
    return (
        <MuiLoadingButton
            sx={[
                {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "none",
                    borderRadius: "4px",
                    borderColor: colors.primary.poblano,
                    textTransform: "none",
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "20px",
                    letterSpacing: "0.46px",
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
                            bgcolor: "transparent",
                            borderColor: colors.primary.poblano,
                            opacity: 0.8,
                            boxShadow: "none",
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
                    "@media screen and (max-width: 480px)": {
                        borderRadius: mpx2vw(4),
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(26),
                        "&:hover": {
                            backgroundColor: colors.primary.poblano,
                        },
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...reset}
        >
            {children}
        </MuiLoadingButton>
    );
};
