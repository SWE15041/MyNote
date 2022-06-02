// @flow
import React from "react";
import {PublishedModifierGroupAJAXView, PublishedModifierGroupAJAXView$ModifierOption} from "type/api";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {mpx2vw, textEllipsisOneLine} from "utils/transform";
import {fixedDeductedNumber} from "utils/format";
import Paper from "@mui/material/Paper";
import {Theme, SxProps, useTheme} from "@mui/material/styles";
import {colors} from "colors";

const Divider = ({theme}: {theme: Theme}) => (
    <Box
        sx={{
            flex: 1,
            mx: "6px",
            mb: "5px",
            height: "18px",
            borderBottom: "1px dashed #D8D8D8",
            minWidth: "15px",
            [theme.breakpoints.down(480)]: {
                mx: mpx2vw(8),
                mb: mpx2vw(6),
                minWidth: mpx2vw(15),
            },
        }}
    />
);

const ModifierWithoutSub = ({option, theme, sx = []}: {option: PublishedModifierGroupAJAXView$ModifierOption; theme: Theme; sx?: SxProps<Theme>}) => (
    <Box
        sx={[
            {
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                pb: "8px",
                [theme.breakpoints.down(480)]: {
                    pb: 0,
                },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
        ]}
    >
        <Typography
            className="option-name"
            variant="subtitle2"
            sx={{
                fontWeight: 400,
                [theme.breakpoints.down(480)]: {
                    fontSize: mpx2vw(14),
                    lineHeight: mpx2vw(20),
                },
            }}
        >
            {option.name}
        </Typography>
        <Divider theme={theme} />
        <Typography
            variant="subtitle2"
            sx={{
                width: "60px",
                fontWeight: 400,
                [theme.breakpoints.down(480)]: {
                    fontSize: mpx2vw(14),
                    lineHeight: mpx2vw(20),
                    width: mpx2vw(48),
                },
            }}
        >
            +{fixedDeductedNumber(option.price)}
        </Typography>
    </Box>
);

const ModifierWithSub = ({option, theme, isLastOne}: {option: PublishedModifierGroupAJAXView$ModifierOption; theme: Theme; isLastOne?: boolean}) => (
    <Box>
        <ModifierWithoutSub option={option} theme={theme} sx={{mb: 0}} />
        <Box
            className="sub-modifier-box"
            sx={{
                position: "relative",
                ml: "30px",
                mb: isLastOne ? "18px" : "10px",
                [theme.breakpoints.down(480)]: {
                    mt: mpx2vw(10),
                    ml: mpx2vw(31),
                    mb: 0,
                },
                "&:after": {
                    position: "absolute",
                    content: "''",
                    width: "1px",
                    top: 0,
                    bottom: "5px",
                    left: 0,
                    bgcolor: colors.primary.poblano,
                    [theme.breakpoints.down(480)]: {
                        bottom: mpx2vw(5),
                    },
                },
            }}
        >
            {option.sub_modifiers.map(sub => (
                <Box
                    key={sub.name}
                    sx={{
                        display: "flex",
                        alignItems: "end",
                        justifyContent: "space-between",
                        pl: "14px",
                        pt: "10px",
                        [theme.breakpoints.down(480)]: {
                            pt: 0,
                            pl: mpx2vw(14),
                            "&:not(:last-of-type)": {
                                mb: mpx2vw(10),
                            },
                        },
                    }}
                >
                    <Typography
                        variant="caption"
                        className="sub-modifier-name"
                        sx={{
                            [theme.breakpoints.down(480)]: {
                                fontSize: mpx2vw(12),
                                lineHeight: mpx2vw(20),
                            },
                        }}
                    >
                        {sub.name}
                    </Typography>
                    <Divider theme={theme} />
                    <Typography
                        variant="caption"
                        sx={{
                            width: "60px",
                            [theme.breakpoints.down(480)]: {
                                fontSize: mpx2vw(12),
                                lineHeight: mpx2vw(20),
                                width: mpx2vw(48),
                            },
                        }}
                    >
                        +{fixedDeductedNumber(sub.price)}
                    </Typography>
                </Box>
            ))}
        </Box>
    </Box>
);

export const NoModifier = ({sx = []}: {sx?: SxProps<Theme>}) => {
    return (
        <Paper
            sx={[
                {
                    p: `20px 26px`,
                    ml: "34px",
                    mr: "46px",
                    border: "1px solid #F0F0F0",
                    boxShadow: "none",
                    fontSize: "14px",
                    lineHeight: "22px",
                    borderRadius: "7px",
                    textAlign: "center",
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            This item has no modifiers or submodifiers
        </Paper>
    );
};

export const ModifierGroup = ({group, sx = []}: {group: PublishedModifierGroupAJAXView; sx?: SxProps<Theme>}) => {
    const theme = useTheme();
    const lastOptionHasSubmodifier = group.options[group.options.length - 1].sub_modifiers.length > 0;

    return (
        <Paper
            sx={[
                {
                    pb: lastOptionHasSubmodifier ? "9px" : "19px",
                    ml: "34px",
                    mr: "46px",
                    mb: "13px",
                    border: "1px solid #F0F0F0",
                    boxShadow: "none",
                    borderRadius: "7px",
                    "@media screen and (max-width:480px)": {
                        mb: mpx2vw(29),
                        pb: mpx2vw(27),
                        mx: 0,
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Typography
                component="h2"
                variant="subtitle1"
                sx={{
                    m: 0,
                    lineHeight: "21px",
                    fontWeight: 500,
                    pt: "21px",
                    px: "26px",
                    ...textEllipsisOneLine,
                    [theme.breakpoints.down(480)]: {
                        fontSize: mpx2vw(16),
                        lineHeight: mpx2vw(20),
                        pt: mpx2vw(21),
                        px: mpx2vw(33),
                    },
                }}
            >
                {group.name}
            </Typography>
            <Box
                pt="23px"
                ml="39px"
                mr="11px"
                sx={{
                    "& >div:not(:first-of-type)": {
                        pt: "8px",
                        [theme.breakpoints.down(480)]: {
                            pt: mpx2vw(6),
                        },
                    },
                    [theme.breakpoints.down(480)]: {
                        pt: mpx2vw(25),
                        mx: mpx2vw(33),
                    },
                }}
            >
                {group.options.map((option, index) => (option.sub_modifiers.length > 0 ? <ModifierWithSub theme={theme} option={option} key={option.name} isLastOne={index === group.options.length - 1} /> : <ModifierWithoutSub theme={theme} option={option} key={option.name} />))}
            </Box>
        </Paper>
    );
};
