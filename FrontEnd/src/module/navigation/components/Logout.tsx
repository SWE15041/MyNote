import React, {useState} from "react";
import {LogoutIcon} from "asset/icon";
import {useUnaryAction} from "@wonder/core-fe";
import {mainActions} from "module/main";
import {Dialog} from "widget/Dialog";
import "./Logout.less";

import Box from "@mui/material/Box";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";

interface Props {
    type: "Mobile" | "PC";
    handleClose: () => void;
}

const Logout: React.FunctionComponent<Props> = ({type, handleClose}) => {
    const [show, setShow] = useState(false);
    const logout = useUnaryAction(mainActions.logout);

    const handleLogoutOut = () => setShow(true);

    const onClose = () => setShow(false);

    const iconStyle = {color: type === "Mobile" ? "#FFF" : undefined};

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "42px",
                    color: colors.black,
                    pl: "36px",
                    cursor: "pointer",
                    "&:hover": {
                        bgcolor: "rgba(216, 216, 216, 0.3)",
                    },
                    "@media screen and (max-width: 480px)": {
                        color: colors.primary.white,
                        pl: mpx2vw(59),
                        pb: mpx2vw(17),
                        height: mpx2vw(69),
                        "&:hover": {
                            bgcolor: colors.primary.bluishBlack,
                        },
                    },
                }}
                onClick={handleLogoutOut}
            >
                <LogoutIcon className="account-logout-icon" style={iconStyle} />
                <Box
                    sx={{
                        mt: "3px",
                        ml: "11px",
                        fontSize: "14px",
                        lineHeight: "20.56px",
                        "@media screen and (max-width: 480px)": {
                            ml: mpx2vw(24),
                            fontSize: mpx2vw(16),
                        },
                    }}
                >
                    Logout
                </Box>
            </Box>
            <Dialog
                sx={{
                    "& .MuiPaper-root": {
                        width: "496px",
                    },
                }}
                open={show}
                maskClosable={false}
                title="Are you sure you want to logout?"
                actions={[
                    {
                        key: "Cancel",
                        text: "Cancel",
                        variant: "outlined",
                        onClick: onClose,
                    },
                    {
                        key: "Confirm",
                        text: "Confirm",
                        variant: "contained",
                        onClick: () => {
                            logout(true);
                            requestAnimationFrame(() => {
                                handleClose();
                            });
                        },
                    },
                ]}
                onClose={onClose}
            />
        </>
    );
};

export default Logout;
