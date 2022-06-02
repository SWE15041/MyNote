// @flow
import React from "react";
import Stack from "@mui/material/Stack";
import {mpx2vw} from "utils/transform";
import {colors} from "colors";

export const ListHeader = () => {
    return (
        <Stack
            sx={{
                pl: mpx2vw(37),
                pr: mpx2vw(47),
                height: mpx2vw(45),
                alignItems: "center",
                bgcolor: colors.gray.superLight,
                "& span": {
                    fontSize: mpx2vw(14),
                    fontWeight: 500,
                    lineHeight: mpx2vw(32),
                    fontFamily: theme => theme.typography.fontFamily,
                    "&:nth-of-type(1)": {
                        flex: 2,
                    },
                    "&:nth-of-type(2)": {
                        flex: 0.8,
                    },
                    "&:nth-of-type(3)": {
                        flex: 0.5,
                    },
                },
            }}
            direction="row"
        >
            <span>Item Name</span>
            <span>Price</span>
            <span>Status</span>
        </Stack>
    );
};
