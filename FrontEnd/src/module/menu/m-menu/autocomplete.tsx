import React, {useState} from "react";
import {Autocomplete as MuiAutocomplete, Box, InputBase} from "@mui/material";

import {CircleCloseOutlined} from "asset/icon";
import {SearchOutlined} from "asset/icon/smallIcon";
import {bolderKeywords} from "../utils";
import "./autocomplete.less";
import {colors} from "colors";
import {mpx2vw} from "../../../utils/transform";

type Props = {
    options: string[];
    onSearch: (val: string | null) => void;
};

export const Autocomplete = ({options, onSearch}: Props) => {
    const [isFocus, setIsFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [value, setValue] = React.useState<string | null>(null);

    const showListBox = (value: string) => {
        if (value.trim().length >= 3) {
            setOpen(true);
        } else if (value.trim().length < 3) {
            setOpen(false);
        }
    };

    return (
        <MuiAutocomplete
            classes={{
                paper: "autocomplete-paper",
            }}
            sx={{
                "& .MuiInputBase-root": {
                    height: "calc((100vw * 33) / 375)",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "calc((100vw * 3) / 375)",
                    border: `1px solid ${isFocus || inputValue ? "#246B6B" : "#A6A6A6"}`,
                    transition: "border .3s ease-out",
                },
                "& input": {
                    bgcolor: "background.paper",
                    color: "#000",
                    p: "calc((100vw * 5) / 375) calc((100vw * 38) / 375) calc((100vw * 5) / 375) calc((100vw * 12) / 375) ",
                    fontSize: "calc((100vw * 14) / 375)",
                    borderRadius: "5px",
                },
            }}
            id="autocomplete-input-search"
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
                    padding: `${mpx2vw(6)} 0`,
                },
            }}
            onInputChange={(event, value) => {
                showListBox(value);
                setInputValue(value ?? "");
            }}
            onChange={(event: any, newValue: string | null, reason) => {
                if (reason === "selectOption") {
                    newValue && setInputValue(newValue);
                    onSearch(newValue);
                }
                setValue(newValue);
            }}
            onKeyDown={event => {
                if (event.key === "Enter") {
                    requestAnimationFrame(() => onSearch(inputValue));
                }
            }}
            onClose={() => {
                setOpen(false);
            }}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{
                        p: `${mpx2vw(4)} ${mpx2vw(14)}!important`,
                        minHeight: "auto!important",
                    }}
                    {...props}
                >
                    <Box
                        sx={{
                            color: "#246B6B",
                            fontSize: mpx2vw(14),
                            fontWeight: 400,
                            lineHeight: mpx2vw(20),
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
                        startAdornment={
                            <SearchOutlined
                                sx={{
                                    color: colors.primary.poblano,
                                    fontSize: mpx2vw(25),
                                    pl: mpx2vw(9),
                                }}
                            />
                        }
                    />
                    <Box
                        position="absolute"
                        sx={{
                            display: "flex",
                            visibility: inputValue ? "visible" : "hidden",
                            alignItems: "center",
                            justifyContent: "center",
                            px: "calc((100vw * 6) / 375)",
                            top: 0,
                            bottom: 0,
                            right: "calc((100vw * 6) / 375)",
                            transition: "all .3s",
                        }}
                        onClick={() => {
                            setInputValue("");
                            setValue(null);
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
