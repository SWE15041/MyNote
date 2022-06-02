// @flow
import React, {useMemo} from "react";
import MuiDialog, {DialogProps} from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Spin} from "antd";

import {Button} from "widget/Button";
import {colors} from "colors";

import {CloseIconOutline} from "asset/icon";
import {mpx2vw} from "utils/transform";
import {SxProps, Theme} from "@mui/material";
import {merge} from "lodash";

type Action = {
    key: string;
    text: string;
    variant?: "text" | "outlined" | "contained";
    disabled?: boolean;
    width?: number;
    onClick?: () => void;
};

type Props = {
    confirmText?: string;
    cancelText?: string;
    contentText?: React.ReactNode;
    maskClosable?: boolean;
    title: React.ReactNode;
    actions?: Action[];
    actionsStyle?: SxProps<Theme>;
    loading?: boolean;
    onClose?: () => void;
    onConfirm?: () => void;
} & Omit<DialogProps, "onClose" | "title">;

export interface DialogTitleProps {
    children?: React.ReactNode;
    onClose?: () => void;
}

export const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle
            sx={{
                m: 0,
                pt: "30px",
                pb: 0,
                px: "69px",
                textAlign: "center",
                fontWeight: "700",
                fontSize: "18px ",
                lineHeight: "20px",
                color: colors.black,
                "@media screen and (max-width: 480px)": {
                    fontSize: mpx2vw(18),
                    lineHeight: mpx2vw(20),
                    pt: mpx2vw(30),
                    pl: mpx2vw(56),
                    pr: mpx2vw(55),
                },
            }}
            {...other}
        >
            {children}
        </DialogTitle>
    );
};

export const Dialog = (props: Props) => {
    const {loading = false, actionsStyle, title, contentText, confirmText, cancelText, fullScreen, open, onClose, onConfirm, PaperProps, children, actions = [], maskClosable = true, ...rest} = props;
    const matches = useMediaQuery("(max-width: 480px)");
    const copyActionsStyle = merge(
        {
            p: "28px 0",
            justifyContent: "center",
            "@media screen and (max-width: 480px)": {
                py: mpx2vw(28),
                alignItems: "center",
            },
        },
        actionsStyle
    );

    const DialogActions = useMemo(() => {
        if (actions.length > 0) {
            return (
                <Stack sx={copyActionsStyle} direction={matches ? "column-reverse" : "row"} spacing={2}>
                    {actions.map(action => {
                        return (
                            <Button
                                key={action.key}
                                sx={{
                                    width: action.width ? `${action.width}px` : "172px",
                                    px: "0 !important",
                                    "@media screen and (max-width: 480px)": {
                                        width: mpx2vw(247),
                                    },
                                }}
                                disabled={action.disabled}
                                variant={action.variant ? action.variant : "text"}
                                onClick={action.onClick}
                            >
                                {action.text}
                            </Button>
                        );
                    })}
                </Stack>
            );
        } else return null;
    }, [actions, matches]);

    const Close = onClose ? (
        <Box
            aria-label="close"
            onClick={onClose}
            sx={{
                position: "absolute",
                top: 22,
                right: 23,
                color: "#A8A8A8",
                cursor: "pointer",
                "@media screen and (max-width: 480px)": {
                    top: mpx2vw(22),
                    right: mpx2vw(23),
                },
            }}
        >
            <CloseIconOutline />
        </Box>
    ) : null;

    return (
        <MuiDialog
            fullScreen={fullScreen}
            open={open}
            onClose={(event, reason) => {
                if (maskClosable) {
                    onClose && onClose();
                } else {
                    if (reason !== "backdropClick") onClose && onClose();
                }
            }}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                sx: {
                    borderRadius: "10px",
                    boxShadow: "0px 24px 64px rgba(0, 0, 0, 0.2)",
                    maxHeight: "none",
                    "@media screen and (max-width: 480px)": {
                        m: mpx2vw(24),
                    },
                },
            }}
            {...rest}
        >
            <Spin spinning={loading} wrapperClassName="customer-spin">
                {React.isValidElement(title) ? title : <BootstrapDialogTitle onClose={onClose}>{title}</BootstrapDialogTitle>}
                {Close}
                <DialogContent
                    sx={{
                        p: 0,
                    }}
                >
                    {contentText && (
                        <DialogContentText
                            component="div"
                            sx={{
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: colors.black,
                                textAlign: "center",
                                mt: "28px",
                                mx: 5,
                                "@media screen and (max-width: 480px)": {
                                    mx: mpx2vw(40),
                                    mt: mpx2vw(28),
                                },
                            }}
                        >
                            {contentText}
                        </DialogContentText>
                    )}
                    {children}
                </DialogContent>
                {DialogActions}
            </Spin>
        </MuiDialog>
    );
};
