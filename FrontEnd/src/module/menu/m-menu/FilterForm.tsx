// @flow
import React from "react";
import {Control, Controller} from "react-hook-form";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {styled} from "@mui/material/styles";

import {CircleModifier} from "asset/icon/smallIcon";
import {ErrorIcon} from "../../login/component/LoginForm";
import {FormControlLabel} from "widget/Form/FormControlLabel";
import {Link} from "widget/Link";
import {Checkbox} from "widget/Checkbox";
import {InputNumberV2} from "widget/Form/Input";
import {colors} from "colors";

import {UseFormHandleSubmit} from "react-hook-form/dist/types/form";
import {IFormInput} from "../type";
import {mpx2vw} from "utils/transform";
import {Button} from "widget/Button";

type Props = {
    control: Control<IFormInput, any>;
    error: boolean;
    disabled: boolean;
    clearAll: () => void;
    handleSubmit: ReturnType<UseFormHandleSubmit<IFormInput>>;
};

const Title = styled(Typography)(() => ({
    fontSize: mpx2vw(18),
    lineHeight: mpx2vw(24),
    color: colors.primary.poblano,
    fontWeight: 700,
    marginBottom: mpx2vw(6),
    marginLeft: mpx2vw(11),
}));

const Label = styled(Typography)(() => ({
    fontSize: mpx2vw(14),
    lineHeight: mpx2vw(24),
    color: colors.black,
}));

export const FilterForm = ({error, disabled, control, clearAll, handleSubmit}: Props) => {
    return (
        <Stack component="form" onSubmit={handleSubmit}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{px: mpx2vw(26), pt: mpx2vw(29)}}>
                <Typography
                    sx={{
                        fontSize: mpx2vw(20),
                        lineHeight: mpx2vw(30),
                    }}
                >
                    Filters
                </Typography>
                {disabled ? (
                    <Typography
                        sx={{
                            fontSize: mpx2vw(16),
                            lineHeight: mpx2vw(24),
                            color: colors.gray.light,
                            fontWeight: 500,
                        }}
                    >
                        Clear All
                    </Typography>
                ) : (
                    <Link
                        sx={{
                            "@media screen and (max-width: 480px)": {
                                fontSize: mpx2vw(16),
                                lineHeight: mpx2vw(24),
                                fontWeight: 500,
                                fontFamily: theme => theme.typography.fontFamily,
                            },
                        }}
                        onClick={clearAll}
                    >
                        Clear All
                    </Link>
                )}
            </Stack>
            <Box sx={{pt: mpx2vw(22), pb: mpx2vw(15), px: mpx2vw(39)}}>
                <Title>Status</Title>
                <FormControlLabel control={<Controller render={({field: {ref, value, ...rest}}) => <Checkbox {...rest} checked={value} />} name="active" control={control} />} label="Active" />
                <FormControlLabel control={<Controller render={({field: {ref, value, ...rest}}) => <Checkbox {...rest} checked={value} />} name="inactive" control={control} />} label="Inactive" />
            </Box>
            <Divider sx={{borderColor: colors.black, transform: "scale(1,0.2)", mx: mpx2vw(32)}} />
            <Box sx={{pt: mpx2vw(22), pb: mpx2vw(15), px: mpx2vw(39)}}>
                <Title>Modifiers</Title>
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
            <Divider sx={{borderColor: colors.black, transform: "scale(1,0.2)", mx: mpx2vw(32)}} />
            <Box sx={{pt: mpx2vw(22), pb: mpx2vw(70), px: mpx2vw(39)}}>
                <Title>Price</Title>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{px: mpx2vw(11)}}>
                    <Box sx={{width: mpx2vw(90)}}>
                        <Label>Min</Label>
                        <Controller render={({field: {ref, onBlur, ...rest}}) => <InputNumberV2 size="small" startAdornment="$" {...rest} error={error} min={0} precision={2} />} name="min" control={control} />
                    </Box>
                    <Label sx={{mt: mpx2vw(28)}}>to</Label>
                    <Box sx={{width: mpx2vw(90)}}>
                        <Label>Max</Label>
                        <Controller render={({field: {ref, onBlur, ...rest}}) => <InputNumberV2 {...rest} size="small" startAdornment="$" min={0} precision={2} error={error} />} name="max" control={control} />
                    </Box>
                </Stack>
                {error ? (
                    <Box
                        sx={{
                            fontSize: mpx2vw(14),
                            lineHeight: mpx2vw(20),
                            ml: mpx2vw(11),
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
            <Button
                disabled={error}
                variant="contained"
                type="submit"
                sx={{
                    "@media screen and (max-width: 480px)": {
                        borderRadius: 0,
                        height: mpx2vw(60),
                        fontSize: mpx2vw(18),
                        lineHeight: mpx2vw(24),
                    },
                }}
            >
                Apply
            </Button>
        </Stack>
    );
};
