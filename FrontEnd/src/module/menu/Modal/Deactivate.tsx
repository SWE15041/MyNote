import React, {useEffect, useRef, useState, FC} from "react";
import {Radio} from "widget/MuiRadio";
import RadioGroup from "@mui/material/RadioGroup";
import {UpdateCategoryStatusAJAXRequest, UpdateCategoryStatusAJAXRequest$InactiveType, UpdateCategoryStatusAJAXRequest$Status, UpdatePublishedMenuItemStatusAJAXRequest} from "type/api";
import {Dialog} from "widget/Dialog";
import {Box, FormControlLabel} from "@mui/material";
import {mpx2vw} from "utils/transform";
import {InputNumber} from "widget/Form/Input";
import {useLoadingStatus} from "@wonder/core-fe";
import {LOADING_UPDATE_CATEGORY_STATUS, LOADING_UPDATE_MENU_ITEM_STATUS} from "../type";

interface Props {
    visible: boolean;
    onClose: () => void;
    contentText: React.ReactNode;
    title: string;
    onOk: (request: UpdateCategoryStatusAJAXRequest | UpdatePublishedMenuItemStatusAJAXRequest) => void;
}

const BoxWrapper: React.FC = ({children}) => (
    <Box
        sx={{
            width: "338px",
            lineHeight: "20px",
            m: "16px auto 0 auto",
            p: "5px",
            textAlign: "center",
            backgroundColor: "rgba(196, 196, 196, 0.12)",
            borderRadius: "8px",
            "@media screen and (max-width: 480px)": {
                width: mpx2vw(263),
                mt: mpx2vw(16),
                borderRadius: mpx2vw(8),
                lineHeight: mpx2vw(20),
            },
            fontFamily: theme => theme.typography.fontFamily,
            fontSize: "14px",
        }}
    >
        {children}
    </Box>
);

export const DeactivateModal: FC<Props> = ({visible, onClose, title, onOk, contentText, children}) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const loadingUpdateCategoryStatus = useLoadingStatus(LOADING_UPDATE_CATEGORY_STATUS);
    const loadingUpdateMenuItemStatus = useLoadingStatus(LOADING_UPDATE_MENU_ITEM_STATUS);
    const [inactiveType, setInactiveType] = useState(UpdateCategoryStatusAJAXRequest$InactiveType.X_HOURS);
    const [hours, setHours] = useState("1");
    const btnDisabled = !inactiveType || (inactiveType === UpdateCategoryStatusAJAXRequest$InactiveType.X_HOURS && !hours);
    const handleInit = () => {
        setHours("1");
        setInactiveType(UpdateCategoryStatusAJAXRequest$InactiveType.X_HOURS);
        requestAnimationFrame(() => {
            inputRef.current?.focus();
        });
    };
    const handleConfirm = () => {
        const number = Number(hours) ? Number(hours) : 1;
        onOk({
            status: UpdateCategoryStatusAJAXRequest$Status.INACTIVE,
            inactive_type: inactiveType,
            duration_hours: inactiveType === UpdateCategoryStatusAJAXRequest$InactiveType.X_HOURS ? number : null,
        });
    };

    useEffect(() => {
        if (inactiveType === UpdateCategoryStatusAJAXRequest$InactiveType.X_HOURS) {
            inputRef.current?.focus();
        }
    }, [inactiveType]);

    useEffect(() => {
        if (visible) {
            handleInit();
        }
    }, [visible]);

    return (
        <>
            <Dialog
                loading={loadingUpdateCategoryStatus || loadingUpdateMenuItemStatus}
                open={visible}
                sx={{
                    "& .MuiPaper-root": {
                        width: "496px",
                    },
                    "@media screen and (max-width: 480px)": {
                        "& .MuiPaper-root": {
                            maxHeight: "none",
                        },
                    },
                }}
                title={title}
                contentText={contentText}
                maskClosable={false}
                onClose={onClose}
                actions={[
                    {
                        key: "cancel",
                        text: "Not Now",
                        variant: "outlined",
                        onClick: onClose,
                        width: 125,
                    },
                    {
                        key: "Deactivate",
                        text: "Deactivate",
                        variant: "contained",
                        onClick: handleConfirm,
                        disabled: btnDisabled,
                        width: 125,
                    },
                ]}
                actionsStyle={{
                    pt: "21px",
                    "@media screen and (max-width: 480px)": {
                        pt: mpx2vw(21),
                    },
                }}
            >
                <Box>
                    <BoxWrapper>{children}</BoxWrapper>
                    <RadioGroup
                        sx={{
                            mt: "21px",
                            pl: "115px",
                            "@media screen and (max-width: 480px)": {
                                pl: mpx2vw(40),
                                mt: mpx2vw(21),
                            },
                        }}
                        value={inactiveType}
                        onChange={event => setInactiveType(event.target.value as UpdateCategoryStatusAJAXRequest$InactiveType)}
                    >
                        <FormControlLabel
                            value={UpdateCategoryStatusAJAXRequest$InactiveType.X_HOURS}
                            control={<Radio />}
                            sx={{
                                fontSize: "14px",
                                lineHeight: "32px",
                                "@media screen and (max-width: 480px)": {
                                    mr: 0,
                                },
                            }}
                            label={
                                <Box
                                    sx={{
                                        fontSize: "14px",
                                        lineHeight: "32px",
                                        "@media screen and (max-width: 480px)": {
                                            fontSize: mpx2vw(14),
                                            lineHeight: mpx2vw(32),
                                        },
                                    }}
                                >
                                    Deactivate for
                                    <InputNumber
                                        inputRef={inputRef}
                                        value={hours}
                                        endAdornment={
                                            <Box
                                                component="span"
                                                onClick={() => {
                                                    inputRef.current?.focus();
                                                }}
                                                sx={{
                                                    fontSize: "14px",
                                                    "@media screen and (max-width: 480px)": {
                                                        fontSize: mpx2vw(14),
                                                    },
                                                }}
                                            >
                                                hour(s)
                                            </Box>
                                        }
                                        isFocus={inactiveType === UpdateCategoryStatusAJAXRequest$InactiveType.X_HOURS}
                                        onChange={e => {
                                            setHours(e.target.value);
                                        }}
                                        onFocus={() => {
                                            setInactiveType(UpdateCategoryStatusAJAXRequest$InactiveType.X_HOURS);
                                        }}
                                        sx={{
                                            ml: "17px",
                                            "@media screen and (max-width: 480px)": {
                                                ml: mpx2vw(17),
                                            },
                                        }}
                                        max={1000}
                                    />
                                </Box>
                            }
                        />
                        <FormControlLabel
                            value={UpdateCategoryStatusAJAXRequest$InactiveType.TODAY}
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        fontSize: "14px",
                                        lineHeight: "32px",
                                        "@media screen and (max-width: 480px)": {
                                            fontSize: mpx2vw(14),
                                            lineHeight: mpx2vw(32),
                                        },
                                    }}
                                >
                                    Deactivate for&nbsp;<strong>today</strong>
                                </Box>
                            }
                        />
                        <FormControlLabel
                            value={UpdateCategoryStatusAJAXRequest$InactiveType.INDEFINITELY}
                            control={<Radio />}
                            label={
                                <Box
                                    sx={{
                                        fontSize: "14px",
                                        lineHeight: "32px",
                                        "@media screen and (max-width: 480px)": {
                                            fontSize: mpx2vw(14),
                                            lineHeight: mpx2vw(32),
                                        },
                                    }}
                                >
                                    Deactivate&nbsp;<strong>indefinitely</strong>
                                </Box>
                            }
                        />
                    </RadioGroup>
                </Box>
            </Dialog>
        </>
    );
};
