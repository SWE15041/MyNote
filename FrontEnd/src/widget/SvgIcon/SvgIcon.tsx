// @flow
import React from "react";
import MuiSvgIcon, {SvgIconProps} from "@mui/material/SvgIcon";
import {styled} from "@mui/material/styles";
import {mpx2vw} from "utils/transform";

const StyleSvgIcon = styled(MuiSvgIcon)(() => ({
    "&.MuiSvgIcon-fontSizeSmall": {
        fontSize: "1rem",
    },
    "@media screen and (max-width: 480px)": {
        fontSize: mpx2vw(24),
        "&.MuiSvgIcon-fontSizeSmall": {
            fontSize: mpx2vw(16),
        },
    },
}));

type Props = {} & SvgIconProps;
export const SvgIcon = ({children, ...reset}: Props) => {
    return <StyleSvgIcon {...reset}>{children}</StyleSvgIcon>;
};
