// @flow
import React, {forwardRef, useEffect, useImperativeHandle} from "react";
import Box from "@mui/material/Box";

import Popover, {PopoverProps} from "@mui/material/Popover";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {PopoverOrigin} from "@mui/material/Popover/Popover";
import {merge} from "lodash";

type Props = {
    content: React.ReactNode;
    children: React.ReactNode;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    marginThreshold?: number;
    sx?: SxProps<Theme>;
    onVisibleChange?: (visible: boolean) => void;
} & Pick<PopoverProps, "PaperProps">;

export const Dropdown = forwardRef<
    {
        close: () => void;
    } | null,
    Props
>((props, ref) => {
    const {content, anchorOrigin, transformOrigin, marginThreshold, sx, onVisibleChange, children, PaperProps} = props;
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    useImperativeHandle(
        ref,
        () => ({
            close: handleClose,
        }),
        []
    );

    useEffect(() => {
        onVisibleChange && onVisibleChange(open);
    }, [open]);

    return (
        <div>
            <Box aria-describedby={id} onClick={handleClick}>
                {children}
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                marginThreshold={marginThreshold}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
                PaperProps={PaperProps}
                sx={{
                    ...merge(sx, {
                        zIndex: 1050,
                        "& .MuiPopover-paper": {
                            boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
                            width: "261px",
                        },
                    }),
                }}
            >
                {content}
            </Popover>
        </div>
    );
});
