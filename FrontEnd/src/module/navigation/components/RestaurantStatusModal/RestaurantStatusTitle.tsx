// @flow
import React from "react";
import Box from "@mui/material/Box";

import {colors} from "colors";
import {mpx2vw} from "utils/transform";

type Props = {
    color: string;
    title: string;
};

const Dot = React.memo(({color}: {color: string}) => (
    <Box
        component="span"
        sx={{
            display: "inline-block",
            width: "15px",
            height: "15px",
            mr: "9px",
            borderRadius: "50%",
            bgcolor: color,
            "@media screen and (max-width: 480px)": {
                mt: mpx2vw(8),
            },
        }}
    />
));

export const RestaurantStatusTitle = React.memo(({color, title}: Props) => {
    return (
        <Box
            component="h2"
            sx={{
                m: 0,
                pt: "30px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "18px ",
                lineHeight: "32px",
                color: colors.black,
                "@media screen and (max-width: 480px)": {
                    alignItems: "flex-start",
                    fontSize: mpx2vw(18),
                    lineHeight: mpx2vw(32),
                    pt: mpx2vw(30),
                },
            }}
        >
            <Dot color={color} />
            <Box
                component="span"
                sx={{
                    display: "inline-block",
                    "@media screen and (max-width: 480px)": {
                        width: "45vw",
                    },
                }}
            >
                {title}
            </Box>
        </Box>
    );
});
