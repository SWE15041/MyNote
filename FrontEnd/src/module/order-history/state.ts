import {State} from "./type";
import {subDaysTZ, utcToNewYorkTime} from "utils/timeZoneDate";

export const initialState: State = {
    query: {
        startTime: subDaysTZ(new Date(), 6),
        endTime: utcToNewYorkTime(new Date()),
        page: 1,
        limit: 25,
    },
};
