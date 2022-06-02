// @flow
import React, {useRef, useState} from "react";
import {DatePicker, DatePickerProps} from "@mui/x-date-pickers/DatePicker";
import InputBase from "@mui/material/InputBase";
import {colors} from "colors";
import {Moment} from "moment-timezone";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

interface Props extends Omit<DatePickerProps<Moment, Moment>, "renderInput" | "inputRef"> {}

export const CustomerDatePicker = ({onClose, onAccept, ...reset}: Props) => {
    const [open, setOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
                {...reset}
                open={open}
                inputRef={inputRef}
                renderInput={({inputRef, inputProps, error}) => (
                    <InputBase
                        sx={[
                            {
                                width: 90,
                                border: "1px solid #d8d8d8",
                                p: 0,
                                borderRadius: "4px",
                                "& input": {
                                    p: 1,
                                    fontSize: 14,
                                    lineHeight: "16px",
                                    height: "auto",
                                    textAlign: "center",
                                    borderRadius: "4px",
                                },
                            },
                            open && {
                                borderColor: colors.primary.poblano,
                            },
                            Boolean(error) && {
                                borderColor: colors.validation.red,
                            },
                        ]}
                        inputRef={inputRef}
                        inputProps={{
                            ...inputProps,
                            onClick: () => {
                                setOpen(true);
                            },
                        }}
                    />
                )}
                onAccept={value => {
                    onAccept?.(value);
                    setOpen(false);
                    inputRef?.current?.blur();
                }}
                onClose={() => {
                    onClose?.();
                    setOpen(false);
                    inputRef?.current?.blur();
                }}
            />
        </LocalizationProvider>
    );
};
