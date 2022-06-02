import React from "react";
import {Box, BoxProps} from "@mui/material";
import {mpx2vw} from "utils/transform";
interface IconProps extends BoxProps {
    color: string;
}

export const ChevronUpMediumIcon = ({color, ...props}: IconProps) => (
    <Box
        component="svg"
        sx={{
            width: "16px",
            height: "9px",
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(9),
                width: mpx2vw(16),
            },
        }}
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.829554 8.6705C0.390204 8.23116 0.390204 7.51884 0.829554 7.07951L7.20451 0.704554C7.64384 0.265204 8.35616 0.265204 8.7955 0.704554L15.1705 7.07951C15.6098 7.51884 15.6098 8.23116 15.1705 8.6705C14.7312 9.10983 14.0188 9.10983 13.5795 8.6705L8 3.09099L2.42045 8.6705C1.9811 9.10983 1.2689 9.10983 0.829554 8.6705Z"
            fill={color ? color : "black"}
        />
    </Box>
);

export const ChevronDownMediumIcon = ({color, ...props}: IconProps) => (
    <Box
        component="svg"
        sx={{
            width: "16px",
            height: "9px",
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(9),
                width: mpx2vw(16),
            },
        }}
        viewBox="0 0 16 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.1704 0.329501C15.6098 0.768836 15.6098 1.48116 15.1704 1.92049L8.79549 8.29545C8.35616 8.7348 7.64384 8.7348 7.2045 8.29545L0.829501 1.92049C0.390166 1.48116 0.390166 0.768836 0.829501 0.329501C1.26884 -0.109834 1.98116 -0.109834 2.42049 0.329501L8 5.909L13.5795 0.329501C14.0189 -0.109834 14.7311 -0.109834 15.1704 0.329501Z"
            fill={color ? color : "black"}
        />
    </Box>
);
