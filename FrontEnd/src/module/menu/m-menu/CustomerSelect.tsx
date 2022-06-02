// @flow
import React, {useState} from "react";
import Select, {SelectProps} from "@mui/material/Select";
import InputBase from "@mui/material/InputBase";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";
import {ChevronDownIcon, ChevronUpIcon} from "asset/icon/smallIcon";

type Props = {} & SelectProps;
export const CustomerSelect = ({children, value, onChange, ...reset}: Props) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Select
            // fullWidth
            autoWidth
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            {...reset}
            open={open}
            value={value}
            input={
                <InputBase
                    sx={{
                        border: "1px solid #a6a6a6",
                        borderRadius: "3px",
                        width: mpx2vw(343),
                        height: mpx2vw(33),
                        px: mpx2vw(10),
                        boxSizing: "border-box",
                        color: colors.primary.poblano,
                        fontWeight: 700,
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(33),
                    }}
                />
            }
            IconComponent={() => {
                return open ? <ChevronUpIcon fontSize="small" color="primary" /> : <ChevronDownIcon fontSize="small" color="primary" />;
            }}
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={onChange}
        >
            {children}
        </Select>
    );
};
