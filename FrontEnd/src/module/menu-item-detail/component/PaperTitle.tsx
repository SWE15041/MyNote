// @flow
import React from "react";
import {useHistory} from "react-router";
import {ArrowBack} from "asset/icon/smallIcon";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {mpx2vw, px2vw} from "utils/transform";
import {colors} from "colors";

export const PaperTitle = () => {
    const history = useHistory();

    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{
                display: "inline-flex",
                cursor: "pointer",
                "@media screen and (max-width: 480px)": {
                    ml: mpx2vw(16),
                    mt: mpx2vw(12),
                    mb: mpx2vw(17),
                },
            }}
            onClick={() => history.goBack()}
        >
            <ArrowBack
                fontSize="small"
                sx={{
                    color: colors.primary.poblano,
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(16),
                    },
                }}
            />
            <Typography
                sx={{
                    ml: px2vw(11),
                    fontSize: "14px",
                    lineHeight: "30px",
                    fontWeight: 500,
                    color: colors.primary.poblano,
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(30),
                        ml: mpx2vw(8),
                    },
                }}
            >
                Back to All Items
            </Typography>
        </Stack>
    );
};
