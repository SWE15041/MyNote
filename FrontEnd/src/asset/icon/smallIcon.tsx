import React from "react";
import {Box, BoxProps} from "@mui/material";
import {mpx2vw} from "utils/transform";
import {SvgIcon} from "widget/SvgIcon";
import {SvgIconProps} from "@mui/material/SvgIcon";

interface IconProps extends BoxProps {
    color?: string;
}

export const ChevronUpSmallIcon = ({color, ...props}: IconProps) => (
    <Box
        component="svg"
        sx={{
            width: "10px",
            height: "6px",
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(6),
                width: mpx2vw(10),
            },
        }}
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.219668 5.78033C-0.0732225 5.48744 -0.0732225 5.01256 0.219668 4.71967L4.46967 0.469668C4.76256 0.176777 5.23744 0.176777 5.53033 0.469668L9.7803 4.71967C10.0732 5.01256 10.0732 5.48744 9.7803 5.78033C9.4874 6.0732 9.0126 6.0732 8.7197 5.78033L5 2.06066L1.28033 5.78033C0.987438 6.0732 0.512558 6.0732 0.219668 5.78033Z"
            fill={color ? color : "black"}
        />
    </Box>
);

export const ChevronDownSmallIcon = ({color, ...props}: IconProps) => (
    <Box
        component="svg"
        sx={{
            width: "10px",
            height: "6px",
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(6),
                width: mpx2vw(10),
            },
        }}
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.7803 0.219668C10.0732 0.512558 10.0732 0.987438 9.7803 1.28033L5.53033 5.5303C5.23744 5.8232 4.76256 5.8232 4.46967 5.5303L0.219668 1.28033C-0.0732225 0.987438 -0.0732225 0.512558 0.219668 0.219668C0.512558 -0.0732225 0.987438 -0.0732225 1.28033 0.219668L5 3.93934L8.7197 0.219668C9.0126 -0.0732225 9.4874 -0.0732225 9.7803 0.219668Z"
            fill={color ? color : "black"}
        />
    </Box>
);

export const ChevronLeftSmallIcon = ({color, ...props}: IconProps) => (
    <Box
        component="svg"
        sx={{
            width: "6px",
            height: "10px",
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(10),
                width: mpx2vw(6),
            },
        }}
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.78033 9.7803C5.48744 10.0732 5.01256 10.0732 4.71967 9.7803L0.469668 5.53033C0.176777 5.23744 0.176777 4.76256 0.469668 4.46967L4.71967 0.219668C5.01256 -0.0732225 5.48744 -0.0732225 5.78033 0.219668C6.0732 0.512558 6.0732 0.987438 5.78033 1.28033L2.06066 5L5.78033 8.7197C6.0732 9.0126 6.0732 9.4874 5.78033 9.7803Z"
            fill="black"
        />
    </Box>
);

export const ChevronRightSmallIcon = ({color, ...props}: IconProps) => (
    <Box
        component="svg"
        sx={{
            width: "6px",
            height: "10px",
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(10),
                width: mpx2vw(6),
            },
        }}
        viewBox="0 0 6 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.219668 0.219668C0.512558 -0.0732225 0.987438 -0.0732225 1.28033 0.219668L5.5303 4.46967C5.8232 4.76256 5.8232 5.23744 5.5303 5.53033L1.28033 9.7803C0.987438 10.0732 0.512558 10.0732 0.219668 9.7803C-0.0732225 9.4874 -0.0732225 9.0126 0.219668 8.7197L3.93934 5L0.219668 1.28033C-0.0732225 0.987438 -0.0732225 0.512558 0.219668 0.219668Z"
            fill="black"
        />
    </Box>
);

export const ChevronDownIcon = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.1704 9.3295C19.6098 9.76884 19.6098 10.4812 19.1704 10.9205L12.7955 17.2954C12.3562 17.7348 11.6438 17.7348 11.2045 17.2954L4.8295 10.9205C4.39017 10.4812 4.39017 9.76884 4.8295 9.3295C5.26884 8.89017 5.98116 8.89017 6.42049 9.3295L12 14.909L17.5795 9.3295C18.0189 8.89017 18.7311 8.89017 19.1704 9.3295Z"
            fill="currentColor"
        />
    </SvgIcon>
);

export const ChevronUpIcon = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.82955 14.6705C4.3902 14.2312 4.3902 13.5188 4.82955 13.0795L11.2045 6.70455C11.6438 6.2652 12.3562 6.2652 12.7955 6.70455L19.1705 13.0795C19.6098 13.5188 19.6098 14.2312 19.1705 14.6705C18.7312 15.1098 18.0188 15.1098 17.5795 14.6705L12 9.09099L6.42045 14.6705C5.9811 15.1098 5.2689 15.1098 4.82955 14.6705Z"
            fill="currentColor"
        />
    </SvgIcon>
);

export const FilterOutlined = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.75 7C4.33579 7 4 7.33579 4 7.75C4 8.16421 4.33579 8.5 4.75 8.5H19.25C19.6642 8.5 20 8.16421 20 7.75C20 7.33579 19.6642 7 19.25 7H4.75ZM7 11.75C7 11.3358 7.33579 11 7.75 11H16.25C16.6642 11 17 11.3358 17 11.75C17 12.1642 16.6642 12.5 16.25 12.5H7.75C7.33579 12.5 7 12.1642 7 11.75ZM10 15.75C10 15.3358 10.3358 15 10.75 15H13.25C13.6642 15 14 15.3358 14 15.75C14 16.1642 13.6642 16.5 13.25 16.5H10.75C10.3358 16.5 10 16.1642 10 15.75Z"
            fill="currentColor"
        />
    </SvgIcon>
);

export const SearchOutlined = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path
            d="M23.6351 21.8602L17.7187 15.9194C19.2399 14.1735 20.0734 11.9768 20.0734 9.68999C20.0734 4.34701 15.5708 0 10.0367 0C4.50255 0 0 4.34701 0 9.68999C0 15.033 4.50255 19.38 10.0367 19.38C12.1143 19.38 14.0941 18.775 15.7868 17.6265L21.7482 23.6124C21.9974 23.8622 22.3325 24 22.6916 24C23.0316 24 23.3541 23.8749 23.5989 23.6474C24.119 23.1641 24.1356 22.3628 23.6351 21.8602ZM10.0367 2.52782C14.1273 2.52782 17.4551 5.74069 17.4551 9.68999C17.4551 13.6393 14.1273 16.8522 10.0367 16.8522C5.94608 16.8522 2.61827 13.6393 2.61827 9.68999C2.61827 5.74069 5.94608 2.52782 10.0367 2.52782Z"
            fill="currentColor"
        />
    </SvgIcon>
);

export const OpenInNewOutlined = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path
            d="M14.7 3.6375C14.7 3.28542 15.0022 3 15.375 3H20.325C20.6978 3 21 3.28542 21 3.6375V8.3125C21 8.66458 20.6978 8.95 20.325 8.95C19.9522 8.95 19.65 8.66458 19.65 8.3125V5.17656L14.0523 10.4633C13.7887 10.7122 13.3613 10.7122 13.0977 10.4633C12.8341 10.2143 12.8341 9.81068 13.0977 9.56172L18.6954 4.275H15.375C15.0022 4.275 14.7 3.98958 14.7 3.6375Z"
            fill="currentColor"
        />
        <path
            d="M3 5.3375C3 4.51598 3.70515 3.85 4.575 3.85H12.225C12.5978 3.85 12.9 4.13542 12.9 4.4875C12.9 4.83958 12.5978 5.125 12.225 5.125H4.575C4.45074 5.125 4.35 5.22014 4.35 5.3375V18.5125C4.35 18.6299 4.45074 18.725 4.575 18.725H18.525C18.6493 18.725 18.75 18.6299 18.75 18.5125V11.2875C18.75 10.9354 19.0522 10.65 19.425 10.65C19.7978 10.65 20.1 10.9354 20.1 11.2875V18.5125C20.1 19.334 19.3948 20 18.525 20H4.575C3.70515 20 3 19.334 3 18.5125V5.3375Z"
            fill="currentColor"
        />
    </SvgIcon>
);

export const CloseOutlined = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor" />
    </SvgIcon>
);

export const ArrowBack = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M11.6705 18.7954C11.2312 19.2348 10.5188 19.2348 10.0795 18.7954L3.7045 12.4205C3.26517 11.9812 3.26517 11.2688 3.7045 10.8295L10.0795 4.4545C10.5188 4.01517 11.2312 4.01517 11.6705 4.4545C12.1098 4.89384 12.1098 5.60616 11.6705 6.04549L7.21599 10.5H18.375C18.9963 10.5 19.5 11.0037 19.5 11.625C19.5 12.2463 18.9963 12.75 18.375 12.75H7.21599L11.6705 17.2045C12.1098 17.6439 12.1098 18.3561 11.6705 18.7954Z"
            fill="currentColor"
        />
    </SvgIcon>
);

export const CircleModifier = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM3.0625 12C3.0625 7.06396 7.06396 3.0625 12 3.0625C16.936 3.0625 20.9375 7.06396 20.9375 12C20.9375 16.936 16.936 20.9375 12 20.9375C7.06396 20.9375 3.0625 16.936 3.0625 12Z"
            fill="currentColor"
        />
        <path
            d="M10.8741 14.6801L9.54455 9.66868V15.0986C9.54455 15.3991 9.47289 15.6244 9.32956 15.7746C9.19 15.9249 9.0033 16 8.76945 16C8.54314 16 8.35832 15.9267 8.21499 15.78C8.07166 15.6298 8 15.4026 8 15.0986V8.87458C8 8.53119 8.0943 8.30047 8.28289 8.18243C8.47148 8.06081 8.72607 8 9.04668 8H9.56719C9.88025 8 10.1066 8.02683 10.2461 8.08048C10.3894 8.13414 10.495 8.23072 10.5629 8.37022C10.6308 8.50973 10.7082 8.73687 10.7949 9.05164L12 13.3602L13.2051 9.05164C13.2918 8.73687 13.3692 8.50973 13.4371 8.37022C13.505 8.23072 13.6087 8.13414 13.7482 8.08048C13.8916 8.02683 14.1198 8 14.4328 8H14.9533C15.2739 8 15.5285 8.06081 15.7171 8.18243C15.9057 8.30047 16 8.53119 16 8.87458V15.0986C16 15.3991 15.9283 15.6244 15.785 15.7746C15.6455 15.9249 15.4569 16 15.2192 16C14.9967 16 14.8138 15.9249 14.6704 15.7746C14.5271 15.6244 14.4554 15.3991 14.4554 15.0986V9.66868L13.1259 14.6801C13.0391 15.0056 12.9675 15.2452 12.9109 15.3991C12.8581 15.5493 12.7581 15.687 12.611 15.8122C12.4639 15.9374 12.2603 16 12 16C11.8039 16 11.6379 15.9589 11.5021 15.8766C11.3663 15.7979 11.2607 15.696 11.1853 15.5708C11.1099 15.4456 11.0495 15.3078 11.0042 15.1576C10.9628 15.0038 10.9194 14.8446 10.8741 14.6801Z"
            fill="currentColor"
        />
    </SvgIcon>
);

export const CaretUpAndDownOutlined = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path d="M6.64037 14.1402L11.7351 19.2348C11.8815 19.3813 12.119 19.3813 12.2654 19.2348L17.36 14.1402C17.5963 13.9039 17.429 13.5 17.0948 13.5H6.90554C6.57145 13.5 6.40414 13.9039 6.64037 14.1402Z" fill="currentColor" />
        <path d="M17.36 9.70449L12.2653 4.60983C12.1189 4.46339 11.8814 4.46339 11.735 4.60983L6.6404 9.70449C6.40415 9.94074 6.5714 10.3447 6.9056 10.3447L17.0949 10.3447C17.429 10.3447 17.5963 9.94073 17.36 9.70449Z" fill="currentColor" />
    </SvgIcon>
);

export const CaretDownOutlined = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path d="M6.64037 9.64017L11.7351 14.7348C11.8815 14.8813 12.119 14.8813 12.2654 14.7348L17.36 9.64018C17.5963 9.40393 17.429 9.00001 17.0948 9.00001L6.90554 9C6.57145 9 6.40414 9.40393 6.64037 9.64017Z" fill="currentColor" />
    </SvgIcon>
);

export const CaretUpOutlined = (props: Omit<SvgIconProps, "children">) => (
    <SvgIcon {...props}>
        <path d="M6.64037 14.2045L11.7351 9.10983C11.8815 8.96339 12.119 8.96339 12.2654 9.10983L17.36 14.2045C17.5962 14.4407 17.429 14.8447 17.0948 14.8447L6.90554 14.8447C6.57144 14.8447 6.40414 14.4407 6.64037 14.2045Z" fill="currentColor" />
    </SvgIcon>
);

export const InfoCircleOutlined = ({color, ...props}: IconProps) => (
    <Box
        component="svg"
        sx={{
            width: "16px",
            height: "16px",
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(16),
                width: mpx2vw(16),
            },
        }}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5Z"
            fill="#246B6B"
        />
        <path d="M8.75 4.75C8.75 4.33579 8.41421 4 8 4C7.58579 4 7.25 4.33579 7.25 4.75V8.25C7.25 8.66421 7.58579 9 8 9C8.41421 9 8.75 8.66421 8.75 8.25V4.75Z" fill="#246B6B" />
        <path d="M9 11C9 11.5523 8.55229 12 8 12C7.44772 12 7 11.5523 7 11C7 10.4477 7.44772 10 8 10C8.55229 10 9 10.4477 9 11Z" fill="#246B6B" />
    </Box>
);