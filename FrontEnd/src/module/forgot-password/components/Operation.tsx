import React, {useState} from "react";
import {Box, Stack} from "@mui/material";
import {Dialog} from "widget/Dialog";
import {colors} from "../../../colors";
import {attachPropertiesToComponent} from "utils/attachPropertiesToCom";
import {LeftArrow} from "./Icon";

const Trouble = () => {
    const [show, setShow] = useState(false);
    return (
        <>
            <Stack
                onClick={() => setShow(true)}
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                sx={{
                    fontSize: "14px",
                    lineHeight: "21px",
                    height: "40px",
                    color: colors.primary.poblano,
                }}
            >
                Trouble logging in?
            </Stack>
            <Dialog
                sx={{
                    "& .MuiPaper-root": {
                        width: "496px",
                    },
                }}
                open={show}
                onClose={() => setShow(false)}
                title="Trouble logging in?"
                maskClosable={false}
                contentText={
                    <Box sx={{width: "416px", lineHeight: "20px", textAlign: "center"}}>
                        Try resetting your password. If you can’t remember your email, contact{" "}
                        <Box component="span" sx={{fontWeight: 500}}>
                            Envoy Support at (908) 495-7751.
                        </Box>
                    </Box>
                }
                actions={[
                    {
                        key: "Dismiss",
                        text: "Dismiss",
                        variant: "contained",
                        width: 101,
                        onClick: () => setShow(false),
                    },
                ]}
            />
        </>
    );
};
const ReturnToLogin = () => (
    <Stack direction="row" justifyContent="center" alignItems="center" sx={{color: colors.primary.poblano, lineHeight: "21px", height: "30px", mb: "80px"}}>
        <Box component="span" mr="9px">
            <LeftArrow />
        </Box>
        Return to Login
    </Stack>
);
export default attachPropertiesToComponent(
    {},
    {
        Trouble,
        ReturnToLogin,
    }
);
