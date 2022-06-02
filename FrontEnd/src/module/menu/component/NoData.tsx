// @flow
import React from "react";
import Box from "@mui/material/Box";
import {mpx2vw} from "utils/transform";

export const NoData = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& img": {
                    display: "block",
                    width: 348,
                    height: 348,
                },
                "@media screen and (max-width: 480px)": {
                    py: 0,
                    "& img": {
                        width: mpx2vw(208),
                        height: mpx2vw(208),
                    },
                },
            }}
        >
            <Box component="img" src={require("../../../asset/img/menu-item-not-found.png")} alt="menu-item-not-found" />
            <Box
                component="p"
                sx={{
                    fontSize: "18px",
                    lineHeight: "32px",
                    m: 0,
                    textAlign: "center",
                    pt: "13px",
                    "@media screen and (max-width: 480px)": {
                        pt: mpx2vw(26),
                        fontSize: mpx2vw(18),
                        lineHeight: mpx2vw(22),
                    },
                }}
            >
                We can’t find any items. <br />
                Please try again.
            </Box>
        </Box>
    );
};
