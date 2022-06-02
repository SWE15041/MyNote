import {styled} from "@mui/material/styles";
import {px2vw, textEllipsisOneLine} from "utils/transform";
import {colors} from "colors";

export const Root = styled("div")(() => ({
    display: "flex",
    alignItems: "start",
    width: "100%",

    "& .item-name": {
        display: "flex",

        ".logo": {
            display: "block",
            width: "30px",
            height: "30px",
            marginRight: "11px",
            borderRadius: "6px",
        },

        ".title": {
            margin: 0,
            padding: 0,
            flex: 1,
            ...textEllipsisOneLine,
            lineHeight: "20px",
        },
    },

    "& .category": {
        ...textEllipsisOneLine,
    },

    "& .envoy-icon": {
        display: "flex",
        justifyContent: "center",
    },

    "& .MuiTableRow-root": {
        backgroundColor: "rgba(240, 240, 240, 0.11)",
    },

    "& .MuiTableRow-hover:hover": {
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: `${colors.gray.superLight} !important`,
        cursor: "pointer",
    },

    ".MuiTableCell-head": {
        cursor: "pointer",
        color: colors.black,
        height: "45px",

        "&:nth-of-type(2)": {
            paddingLeft: "5px",

            span: {
                justifyContent: "flex-start",
            },
        },

        "&:nth-of-type(3)": {
            span: {
                justifyContent: "center",
            },
        },

        ".table-column-sorter": {
            display: "flex",
            alignItems: "center",
            cursor: "pointer",

            "&:hover": {
                ".envoy-icon": {
                    color: colors.primary.poblano,
                },
            },

            ".envoy-icon": {
                marginLeft: px2vw(9.35),
                color: colors.gray.medium,
            },
        },
    },

    ".MuiTableCell-body:last-of-type": {
        border: "none",
    },

    ".customer-spin": {
        ".ant-spin-spinning": {
            maxHeight: "calc((650 / 1024) * 100vh)",
        },
    },
}));

export const Footer = styled("div")(() => ({
    height: 72,
    fontSize: 14,
    lineHeight: "32px",
    color: colors.gray.medium,
    fontFamily: "Heebo, sans-serif, Roboto",
    padding: "30px 0 15px 16px",
    backgroundColor: "rgba(240, 240, 240, 0.11)",
}));
