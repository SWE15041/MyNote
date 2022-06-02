import React, {useEffect, useState} from "react";
import {useLocation} from "react-router";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";

import {CircleCloseOutlined} from "asset/icon";
import {SearchOutlined} from "asset/icon/smallIcon";
import {bolderKeywords} from "../utils";
import {colors} from "colors";

type Props = {
    options: string[];
    onSearch: (val: string | null) => void;
};

export const CustomInputAutocomplete = ({options, onSearch}: Props) => {
    const [isFocus, setIsFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = React.useState<string | null>(null);
    const location = useLocation();

    const showListBox = (value: string) => {
        if (value.trim().length >= 3) {
            setOpen(true);
        } else if (value.trim().length < 3) {
            setOpen(false);
        }
    };

    useEffect(() => {
        setInputValue("");
        setValue(null);
    }, [location]);

    return (
        <Autocomplete
            sx={{
                "& .MuiInputBase-root": {
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "3px",
                    border: `1px solid ${isFocus || inputValue ? colors.primary.poblano : "#A6A6A6"}`,
                    transition: "border .3s ease-out",
                },
                "& input": {
                    width: 182,
                    bgcolor: "background.paper",
                    color: "#000",
                    p: "5px 26px 5px 9px",
                    fontSize: "14px",
                    lineHeight: "20px",
                    height: "20px",
                    borderRadius: "5px",
                },
            }}
            id="custom-input-demo"
            freeSolo
            selectOnFocus={false}
            clearOnBlur={false}
            open={open}
            handleHomeEndKeys
            options={options}
            inputValue={inputValue}
            value={value}
            ListboxProps={{
                style: {
                    padding: "6px 0",
                },
            }}
            onChange={(event: any, newValue: string | null, reason) => {
                if (reason === "selectOption") {
                    newValue && setInputValue(newValue);
                    requestAnimationFrame(() => onSearch(newValue));
                }
                setValue(newValue);
            }}
            onInputChange={(event, value) => {
                if (!value) {
                    onSearch(null);
                }
                showListBox(value);
                setInputValue(value ?? "");
                setValue(null);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onKeyDown={event => {
                if (event.key === "Enter") {
                    setOpen(false);
                    onSearch(inputValue);
                }
            }}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{
                        p: "4px 13px!important",
                    }}
                    {...props}
                >
                    <Box
                        sx={{
                            color: "#246B6B",
                            fontSize: 14,
                            fontWeight: 400,
                            lineHeight: "20px",
                        }}
                        dangerouslySetInnerHTML={{__html: bolderKeywords(option, inputValue)}}
                    />
                </Box>
            )}
            renderInput={params => (
                <Box position="relative">
                    <InputBase
                        ref={params.InputProps.ref}
                        type="text"
                        placeholder="Search"
                        inputProps={{
                            ...params.inputProps,
                            onFocus: event => {
                                setIsFocus(true);
                                if (params.inputProps) {
                                    params.inputProps.onFocus?.(event as any);
                                }
                            },
                            onBlur: event => {
                                setIsFocus(false);
                                if (params.inputProps) {
                                    params.inputProps.onBlur?.(event as any);
                                }
                            },
                        }}
                        endAdornment={
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "30px",
                                    height: "30px",
                                    backgroundColor: isFocus || inputValue ? colors.primary.poblano : colors.gray.light,
                                    transition: "background-color .3s ease-out",
                                    cursor: "pointer",
                                    "&:hover": {
                                        bgcolor: colors.gray.medium,
                                    },
                                }}
                                onClick={() => {
                                    setOpen(false);
                                    onSearch(inputValue);
                                }}
                            >
                                <SearchOutlined sx={{fontSize: "14px", color: "#fff"}} />
                            </Box>
                        }
                    />
                    <Box
                        position="absolute"
                        sx={{
                            display: "flex",
                            visibility: inputValue ? "visible" : "hidden",
                            alignItems: "center",
                            justifyContent: "center",
                            px: "6px",
                            cursor: "pointer",
                            top: 0,
                            bottom: 0,
                            right: "32px",
                            transition: "all .3s",
                        }}
                        onClick={() => {
                            setInputValue("");
                            setValue(null);
                            setOpen(false);
                            onSearch(null);
                        }}
                    >
                        <CircleCloseOutlined />
                    </Box>
                </Box>
            )}
        />
    );
};
