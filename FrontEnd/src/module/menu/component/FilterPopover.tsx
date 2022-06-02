// @flow
import React, {useState, useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import {useSelector} from "react-redux";
import {useUnaryAction, useAction} from "@wonder/core-fe";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import {Dropdown} from "widget/Dropdown";
import {Link} from "widget/Link";
import {FormControlLabel} from "widget/Form/FormControlLabel";
import {Checkbox} from "widget/Checkbox";
import {InputNumberV2} from "widget/Form/Input";
import {colors} from "colors";

import {CircleModifier, FilterOutlined} from "asset/icon/smallIcon";
import {ErrorIcon} from "module/login/component/LoginForm";

import {IFormInput} from "../type";
import {RootState} from "type/state";
import {actions} from "../module";

import {isEqual, throttle} from "lodash";

const Title = styled(Typography)(() => ({
    fontSize: "14px",
    lineHeight: "24px",
    color: colors.primary.poblano,
    fontWeight: 700,
}));

const defaultValue = {
    active: false,
    inactive: false,
    withModifier: false,
    withoutModifier: false,
    min: "",
    max: "",
};

const FilterPopoverContent = () => {
    const {filterOption} = useSelector((state: RootState) => ({filterOption: state.app.menu.filterOption}));
    const setFilterOption = useUnaryAction(actions.setFilterOption);
    const search = useAction(actions.search);
    const {control, watch, reset, getValues} = useForm<IFormInput>({
        mode: "onChange",
        defaultValues: filterOption ? filterOption : defaultValue,
    });

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isMaxChange, setIsMaxChange] = useState(false);
    const [isMinChange, setIsMinChange] = useState(false);

    const clearAll = () => {
        reset(defaultValue);
        setFilterOption(null);
    };

    useEffect(() => {
        const subscription = watch((value, {name}) => {
            const {min, max} = value;
            setDisabled(isEqual(value, defaultValue));
            if (min && max && +Number(min).toFixed(2) > +Number(max).toFixed(2)) {
                setError(true);
            } else {
                setError(false);
                setFilterOption(isEqual(value, defaultValue) ? null : value);
                if (name === "min" || name === "max") {
                    return;
                } else {
                    throttle(search, 500)();
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, throttle, filterOption]);

    useEffect(() => {
        const {max, min} = getValues();
        setIsMaxChange(!isEqual(Number(filterOption?.max).toFixed(2), max));
        setIsMinChange(!isEqual(Number(filterOption?.min).toFixed(2), min));
    }, [filterOption, getValues]);

    useEffect(() => {
        setDisabled(isEqual(getValues(), defaultValue));
    }, []);

    return (
        <Stack
            component="form"
            sx={{
                padding: "4px 16px 19px 16px",
            }}
        >
            <Box sx={{py: "16px"}}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{mb: "6px", ml: "10px"}}>
                    <Title>Status</Title>
                    {disabled ? (
                        <Typography
                            sx={{
                                fontSize: 14,
                                lineHeight: "24px",
                                color: colors.gray.light,
                                fontWeight: 400,
                            }}
                        >
                            Clear All
                        </Typography>
                    ) : (
                        <Link sx={{lineHeight: "24px", fontFamily: theme => theme.typography.fontFamily}} onClick={clearAll}>
                            Clear All
                        </Link>
                    )}
                </Stack>
                <FormControlLabel control={<Controller render={({field: {ref, value, ...rest}}) => <Checkbox {...rest} checked={value} />} name="active" control={control} />} label="Active" />
                <FormControlLabel control={<Controller render={({field: {ref, value, ...rest}}) => <Checkbox {...rest} checked={value} />} name="inactive" control={control} />} label="Inactive" />
            </Box>
            <Divider sx={{borderColor: colors.black, transform: "scale(1,0.2)"}} />
            <Box sx={{py: "16px"}}>
                <Title sx={{mb: "6px", ml: "10px"}}>Modifiers</Title>
                <FormControlLabel
                    control={<Controller render={({field: {ref, value, ...rest}}) => <Checkbox {...rest} checked={value} />} name="withModifier" control={control} />}
                    label={
                        <>
                            With Modifiers (
                            <CircleModifier
                                fontSize="small"
                                sx={{
                                    verticalAlign: "middle",
                                    color: colors.primary.poblano,
                                }}
                            />
                            )
                        </>
                    }
                />
                <FormControlLabel control={<Controller render={({field: {ref, value, ...rest}}) => <Checkbox {...rest} checked={value} />} name="withoutModifier" control={control} />} label="Without Modifiers ( - )" />
            </Box>
            <Divider sx={{borderColor: colors.black, transform: "scale(1,0.2)"}} />
            <Box sx={{py: "16px", ml: "10px"}}>
                <Title sx={{mb: "6px"}}>Price</Title>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Box sx={{width: "90px"}}>
                        <Title sx={{color: "#000", fontWeight: 400, mb: "2px"}}>Min</Title>
                        <Controller
                            render={({field: {onBlur, ...rest}}) => (
                                <InputNumberV2
                                    size="small"
                                    startAdornment="$"
                                    min={0}
                                    onBlur={() => {
                                        onBlur();
                                        isMinChange && !error && search();
                                    }}
                                    {...rest}
                                    error={error}
                                    precision={2}
                                />
                            )}
                            name="min"
                            control={control}
                        />
                    </Box>
                    <Title sx={{mt: "23px", color: "#000", fontWeight: 400}}>to</Title>
                    <Box>
                        <Title sx={{color: "#000", fontWeight: 400, mb: "2px"}}>Max</Title>
                        <Controller
                            render={({field: {onBlur, ...rest}}) => (
                                <InputNumberV2
                                    size="small"
                                    startAdornment="$"
                                    min={0}
                                    precision={2}
                                    error={error}
                                    onBlur={() => {
                                        onBlur();
                                        isMaxChange && !error && search();
                                    }}
                                    {...rest}
                                    sx={{width: "90px"}}
                                />
                            )}
                            name="max"
                            control={control}
                        />
                    </Box>
                </Stack>
                {error ? (
                    <Box
                        sx={{
                            fontSize: "14px",
                            lineHeight: "20px",
                            letterSpacing: "0.4px",
                            color: colors.validation.red,
                            fontFamily: theme => theme.typography.fontFamily,
                        }}
                    >
                        <ErrorIcon />
                        Min value cannot be greater than max
                    </Box>
                ) : null}
            </Box>
        </Stack>
    );
};

export const FilterPopover = () => {
    return (
        <Dropdown
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            PaperProps={{
                sx: {
                    border: "1px solid #DEDEDE",
                    boxShadow: "none !important",
                    borderRadius: 0,
                    // mt: "45px",
                },
            }}
            content={<FilterPopoverContent />}
        >
            <FilterOutlined sx={{display: "flex", alignItems: "center", m: "0 auto", height: 45}} />
        </Dropdown>
    );
};
