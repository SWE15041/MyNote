import React, {useState} from "react";
import {Box, Stack} from "@mui/material";
import {Button} from "widget/Button";
import {EmailInput} from "widget/Form/Input";
import {LogoIcon, IconKey, LeftArrow} from "./components/Icon";
import Operation from "./components/Operation";
import {colors} from "../../colors";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    return (
        <>
            <LogoIcon />
            <Stack direction="column" justifyContent="center" alignItems="center" sx={{height: "100%", width: "450px", margin: "0 auto"}}>
                <IconKey />
                <Box
                    sx={{
                        color: colors.primary.poblano,
                        fontSize: "25px",
                        fontWeight: 700,
                        height: "30px",
                        lineHeight: "37px",
                        marginBottom: "30px",
                    }}
                >
                    Forgot password?
                </Box>
                <Box
                    sx={{
                        textAlign: "center",
                        width: "418px",
                        fontSize: "14px",
                        lineHeight: "20px",
                        marginBottom: "30px",
                    }}
                >
                    No worries, we’ll send you instructions to reset your password. Enter your email below to get started.
                </Box>
                <EmailInput
                    value={email}
                    onValueChange={setEmail}
                    sx={{
                        mb: "40px",
                        width: "100%",
                    }}
                    onErrorStatus={v => setEmailError(v)}
                />

                <Button disabled={emailError || !email} sx={{width: "154px", mb: "50px"}} type="submit" variant="contained">
                    Reset Password
                </Button>
                <Operation.ReturnToLogin />
                <Operation.Trouble />
            </Stack>
        </>
    );
};
export default ForgotPassword;
