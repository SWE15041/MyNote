import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";
import momentTimezone, {MomentInput} from "moment-timezone";
import {unitOfTime} from "moment";

const {moment} = new AdapterMoment({instance: momentTimezone});

export const timeZone = "America/New_York";

export const utcToNewYorkTime = (date: MomentInput) => {
    return moment(date).tz(timeZone);
};

export const subDaysTZ = (date: MomentInput, day: number) => utcToNewYorkTime(date).subtract(day, "days");

export const isAfter = (date: MomentInput, dateToCompare: MomentInput, granularity?: unitOfTime.StartOf) => utcToNewYorkTime(date).isAfter(utcToNewYorkTime(dateToCompare), granularity);
export const isBefore = (date: MomentInput, dateToCompare: MomentInput, granularity?: unitOfTime.StartOf) => utcToNewYorkTime(date).isBefore(utcToNewYorkTime(dateToCompare), granularity);
export const isSame = (date: MomentInput, dateToCompare: MomentInput, granularity?: unitOfTime.StartOf) => utcToNewYorkTime(date).isSame(utcToNewYorkTime(dateToCompare), granularity);
