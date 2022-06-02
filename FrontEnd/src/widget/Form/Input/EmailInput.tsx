import React, {useState, useEffect} from "react";
import {Input} from "widget/Form/Input";
import {InputBaseProps} from "@mui/material/InputBase";
import {ErrorIcon} from "module/login/component/LoginForm";
import {mpx2vw} from "utils/transform";

const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

interface EmailInputProps extends InputBaseProps {
    onErrorStatus: (v: boolean) => void;
    onValueChange: (v: string) => void;
    value: string;
}

export const EmailInput = (props: EmailInputProps) => {
    const {onErrorStatus, onValueChange, value, ...otherProps} = props;
    const [isEmailError, setIsEmailError] = useState(false);
    const [emailHelpText, setEmailHelpText] = useState<React.ReactNode | "">(undefined);
    const email = value;
    const setEmail = onValueChange;
    const [invalidHelpText, setInvalidHelpText] = useState<React.ReactNode | "">(undefined);
    const [isEmailFirstEnter, setIsEmailFirstEnter] = useState(true);

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

    useEffect(() => {
        onErrorStatus(isEmailError);
    }, [isEmailError]);
    return (
        <Input
            fullWidth
            size="small"
            autoComplete="off"
            {...otherProps}
            label="Email"
            error={isEmailError}
            value={email}
            help={emailHelpText}
            onChange={e => {
                setEmail(e.target.value);
                invalidHelpText && setInvalidHelpText(undefined);
                if (!isEmailFirstEnter) {
                    validateEmail(e.target.value);
                }
            }}
            onFocus={() => {
                invalidHelpText && setInvalidHelpText(undefined);
            }}
            onBlur={e => {
                requestAnimationFrame(() => {
                    if (isEmailFirstEnter) {
                        validateEmail(e.target.value);
                        setIsEmailFirstEnter(false);
                    }
                });
            }}
        />
    );
};
