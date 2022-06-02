// @flow
import React from "react";
import MuiAvatar, {AvatarProps} from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import {styled} from "@mui/material/styles";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";

type Props = {} & AvatarProps;

const StyledBadge = styled(Badge)(() => ({
    borderRadius: "50%",
    boxShadow: "0 0 3px rgba(0, 0, 0, 0.25)",
    "& .MuiBadge-badge": {
        backgroundColor: colors.status.open,
        color: colors.status.open,
        width: "12px",
        height: "12px",
        borderRadius: "50%",
    },
    "@media screen and (max-width: 480px)": {
        "& .MuiBadge-badge": {
            width: mpx2vw(12),
            height: mpx2vw(12),
        },
    },
}));

export const Avatar = ({sx, ...reset}: Props) => {
    return (
        <StyledBadge sx={sx} overlap="circular" anchorOrigin={{vertical: "bottom", horizontal: "right"}} variant="dot">
            <MuiAvatar {...reset} />
        </StyledBadge>
    );
};
