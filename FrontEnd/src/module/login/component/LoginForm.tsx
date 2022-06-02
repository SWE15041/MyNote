// @flow
import React, {useEffect, useMemo, useState} from "react";
import {useDispatch} from "react-redux";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import {mainActions} from "module/main";
import {mpx2vw} from "utils/transform";
import {EMAIL_KEY, PASSWORD_KEY, REMEMBER_ME} from "../type";
import {Button} from "widget/Button";
import {Checkbox} from "widget/Checkbox";
import {Link} from "widget/Link";
import {colors} from "colors";
import {Input, InputPassword} from "widget/Form/Input";
import {useHistory} from "react-router";

const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const isWord = /[a-zA-Z\W]/;
const isNumber = /\d/;

export const ErrorIcon = () => (
    <Box
        component="svg"
        sx={{
            width: "11px",
            height: "11px",
            mr: "4px",
            "@media screen and (max-width: 480px)": {
                height: mpx2vw(11),
                width: mpx2vw(11),
                mr: mpx2vw(4),
            },
        }}
        viewBox="0 0 11 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M5.5 0C8.5401 0 11 2.46011 11 5.5C11 8.5401 8.53989 11 5.5 11C2.4599 11 0 8.53989 0 5.5C0 2.4599 2.46011 0 5.5 0ZM5.5 10.1406C8.06508 10.1406 10.1406 8.06491 10.1406 5.5C10.1406 2.93492 8.06491 0.859375 5.5 0.859375C2.93492 0.859375 0.859375 2.93509 0.859375 5.5C0.859375 8.06508 2.93509 10.1406 5.5 10.1406Z"
            fill="#D93927"
        />
        <path d="M5.5 2.76855C5.73732 2.76855 5.92969 2.96093 5.92969 3.19824V5.96528C5.92969 6.20259 5.73732 6.39497 5.5 6.39497C5.26268 6.39497 5.07031 6.20259 5.07031 5.96528V3.19824C5.07031 2.96093 5.26268 2.76855 5.5 2.76855Z" fill="#D93927" />
        <path d="M5.5 8.08154C5.17963 8.08154 4.91992 7.82183 4.91992 7.50147C4.91992 7.1811 5.17963 6.92139 5.5 6.92139C5.82037 6.92139 6.08008 7.1811 6.08008 7.50147C6.08008 7.82183 5.82037 8.08154 5.5 8.08154Z" fill="#D93927" />
    </Box>
);

const ForgotPasswordBtn = ({onClick}: {onClick: () => void}) => (
    <Link underline="always" onClick={onClick}>
        Forgot password?
    </Link>
);

export const LoginForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordHelpText, setPasswordHelpText] = useState<React.ReactNode | "">(undefined);
    const [emailHelpText, setEmailHelpText] = useState<React.ReactNode | "">(undefined);
    const [rememberPassword, setRememberPassword] = useState(false);
    const [isEmailFirstEnter, setIsEmailFirstEnter] = useState(true);
    const [isPasswordFirstEnter, setIsPasswordFirstEnter] = useState(true);
    const [isEmailFocus, setIsEmailFocus] = useState(false);
    const [invalidHelpText, setInvalidHelpText] = useState<React.ReactNode | "">(undefined);

    const enableLogin = useMemo(() => {
        if (!email || !regexEmail.test(email)) {
            return false;
        } else return isWord.test(password) && isNumber.test(password) && /^.{8,25}$/.test(password) && password.indexOf(" ") <= -1;
    }, [email, password]);

    const validatePassword = (password: string) => {
        if (!(isWord.test(password) && isNumber.test(password) && /^.{8,25}$/.test(password) && password.indexOf(" ") <= -1)) {
            setPasswordHelpText(
                <Box>
                    <Box>
                        <ErrorIcon />
                        Password should be:
                    </Box>
                    <Box
                        sx={{
                            pl: "15px",
                            "& > div": {
                                pl: "22px",
                                position: "relative",
                            },
                            "& > div:before": {
                                content: "' '",
                                position: "absolute",
                                left: 9,
                                top: 7,
                                height: 3,
                                width: 3,
                                borderRadius: "50%",
                                backgroundColor: colors.validation.red,
                            },
                            "@media screen and (max-width: 480px)": {
                                pl: mpx2vw(15),
                                "& > div": {
                                    pl: mpx2vw(22),
                                },
                                "& > div:before": {
                                    left: mpx2vw(9),
                                    top: mpx2vw(7),
                                    height: mpx2vw(3),
                                    width: mpx2vw(3),
                                },
                            },
                        }}
                    >
                        <Box>Between 8 and 25 characters long</Box>
                        <Box>Contain both numbers and letters</Box>
                    </Box>
                </Box>
            );
            setIsPasswordError(true);
        } else {
            setPasswordHelpText(undefined);
            setIsPasswordError(false);
        }
    };

    const validateEmail = (email: string) => {
        if (!email || regexEmail.test(email)) {
            setEmailHelpText(undefined);
            setIsEmailError(false);
        } else {
            setEmailHelpText(
                <>
                    <ErrorIcon />
                    Email must be a valid email address.
                </>
            );
            setIsEmailError(true);
        }
    };

    const onFinish = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(
            mainActions.login(email, password, error => {
                // error callback
                if (error) {
                    setInvalidHelpText(
                        <div style={{color: "#D93927", marginTop: 6}}>
                            <ErrorIcon />
                            The email and password do not match.
                        </div>
                    );
                    setIsPasswordError(true);
                } else {
                    if (rememberPassword) {
                        localStorage.setItem(EMAIL_KEY, email);
                        localStorage.setItem(PASSWORD_KEY, window.btoa(password));
                        localStorage.setItem(REMEMBER_ME, "1");
                    } else {
                        localStorage.removeItem(PASSWORD_KEY);
                        localStorage.removeItem(EMAIL_KEY);
                        localStorage.removeItem(REMEMBER_ME);
                    }
                }
            })
        );
    };

    useEffect(() => {
        const isRemember = !!localStorage.getItem(REMEMBER_ME);
        if (isRemember) {
            setPassword(window.atob(localStorage.getItem(PASSWORD_KEY)!));
            setEmail(localStorage.getItem(EMAIL_KEY)!);
            setRememberPassword(true);
        } else {
            setRememberPassword(false);
        }
    }, []);

    return (
        <Box
            sx={{
                mt: "104px",
                "@media screen and (max-width: 480px)": {
                    mt: mpx2vw(82),
                },
            }}
        >
            <Box
                component="form"
                sx={{
                    m: "0 auto",
                    width: "448px",
                    "@media screen and (max-width: 480px)": {
                        width: mpx2vw(315),
                    },
                }}
                onSubmit={onFinish}
            >
                <Input
                    fullWidth
                    size="small"
                    label="Email"
                    error={isEmailError}
                    autoComplete="off"
                    value={email}
                    extra={isEmailFocus ? (email ? null : "Example: johndoe@gmail.com") : null}
                    help={emailHelpText}
                    sx={{
                        mb: "18px",
                        "@media screen and (max-width: 480px)": {
                            mb: mpx2vw(18),
                        },
                    }}
                    onChange={e => {
                        setEmail(e.target.value);
                        invalidHelpText && setInvalidHelpText(undefined);
                        if (!isEmailFirstEnter) {
                            validateEmail(e.target.value);
                        }
                    }}
                    onFocus={() => {
                        setIsEmailFocus(true);
                        invalidHelpText && setInvalidHelpText(undefined);
                    }}
                    onBlur={e => {
                        requestAnimationFrame(() => {
                            setIsEmailFocus(false);
                            if (isEmailFirstEnter) {
                                validateEmail(e.target.value);
                                setIsEmailFirstEnter(false);
                            }
                        });
                    }}
                />
                <InputPassword
                    fullWidth
                    size="small"
                    label="Password"
                    autoComplete="new-password"
                    error={isPasswordError}
                    value={password}
                    help={passwordHelpText || invalidHelpText}
                    onChange={e => {
                        invalidHelpText && setInvalidHelpText(undefined);
                        setPassword(e.target.value);
                        if (!isPasswordFirstEnter) {
                            validatePassword(e.target.value);
                        }
                    }}
                    onBlur={e => {
                        requestAnimationFrame(() => {
                            if (isPasswordFirstEnter) {
                                validatePassword(e.target.value);
                                setIsPasswordFirstEnter(false);
                            }
                        });
                    }}
                />
                <Box
                    sx={{
                        position: "relative",
                        mt: "25px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "@media screen and (max-width: 480px)": {
                            mt: mpx2vw(25),
                        },
                    }}
                >
                    <FormControlLabel
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            "& .MuiFormControlLabel-label": {
                                fontSize: "14px",
                                color: colors.black,
                                lineHeight: "20px",
                            },
                            "@media screen and (max-width: 480px)": {
                                "& .MuiFormControlLabel-label": {
                                    fontSize: mpx2vw(14),
                                    color: colors.black,
                                    lineHeight: mpx2vw(20),
                                },
                            },
                        }}
                        control={<Checkbox checked={rememberPassword} onChange={e => setRememberPassword(e.target.checked)} />}
                        label="Remember Me"
                    />
                    <Box
                        sx={{
                            cursor: "pointer",
                        }}
                    >
                        <ForgotPasswordBtn onClick={() => history.push("/forgot")} />
                    </Box>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    sx={{
                        mt: "33px",
                        "@media screen and (max-width: 480px)": {
                            mt: mpx2vw(33),
                        },
                    }}
                >
                    <Button
                        sx={{
                            width: 174,
                            "@media screen and (max-width: 480px)": {
                                width: mpx2vw(174),
                            },
                        }}
                        variant="contained"
                        type="submit"
                        disabled={!enableLogin}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
