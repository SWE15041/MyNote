// @flow
import React, {useMemo} from "react";
import {useDispatch} from "react-redux";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {PopperProps} from "@mui/material/Popper";
import {PaperProps} from "@mui/material/Paper";
import {CustomerDatePicker} from "widget/DatePicker";
import {Button} from "widget/Button";
import {Moment} from "moment-timezone";

import {isAfter, isBefore, isSame, utcToNewYorkTime} from "utils/timeZoneDate";
import {actions} from "../module";

const PopperProps: Partial<PopperProps> = {
    placement: "bottom-start",
};
const PaperProps: Partial<PaperProps> = {
    sx: {
        mt: 1,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        "& div[role='cell'] > button": {
            fontSize: 14,
        },
    },
};

type Props = {
    startTime: Moment | null;
    endTime: Moment | null;
};
export const OrderHistoryDatePicker = ({startTime, endTime}: Props) => {
    const dispatch = useDispatch();
    const canClear = useMemo(() => startTime === null && isSame(endTime!, new Date(), "d"), [startTime, endTime]);

    const handleClear = () => {
        dispatch(
            actions.setQuery({
                startTime: null,
                endTime: utcToNewYorkTime(new Date()),
            })
        );
    };

    return (
        <Stack direction="row" alignItems="center">
            <Typography variant="body2" sx={{mr: 1}}>
                From
            </Typography>
            <CustomerDatePicker
                value={startTime}
                mask="__/__/__"
                inputFormat="MM/DD/YY"
                PopperProps={PopperProps}
                PaperProps={PopperProps}
                shouldDisableDate={date => {
                    return endTime ? isAfter(date, endTime, "d") : false;
                }}
                onChange={newValue => {
                    dispatch(
                        actions.setQuery({
                            startTime: newValue,
                        })
                    );
                }}
            />
            <Typography variant="body2" sx={{mx: 1}}>
                to
            </Typography>
            <CustomerDatePicker
                value={endTime}
                mask="__/__/__"
                inputFormat="MM/DD/YY"
                PopperProps={PopperProps}
                PaperProps={PaperProps}
                // readOnly
                shouldDisableDate={date => {
                    return startTime ? isBefore(date, startTime, "d") : false;
                }}
                onChange={newValue => {
                    dispatch(
                        actions.setQuery({
                            endTime: newValue,
                        })
                    );
                }}
            />

            <Button variant="contained" size="small" sx={{ml: 1}} disabled={canClear} onClick={handleClear}>
                Clear Dates
            </Button>
        </Stack>
    );
};
