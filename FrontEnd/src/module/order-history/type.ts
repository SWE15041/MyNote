import {Moment} from "moment-timezone";
import {SxProps} from "@mui/system";
import {Theme} from "@mui/material/styles";
import {ReactNode} from "react";
import {RenderedCell} from "rc-table/lib/interface";

export type Query = {
    startTime: Moment | null;
    endTime: Moment | null;
    page: number;
    limit: number;
};

export interface HeadCell<T = unknown> {
    id: keyof T;
    label: string;
    sx?: SxProps<Theme>;
    align?: "left" | "right" | "center";
}

export interface ColumnCell<RecordType = unknown> {
    id: keyof RecordType;
    label: string;
    align?: "left" | "right" | "center";
    render?: (value: any, record: RecordType, index: number) => ReactNode | RenderedCell<RecordType>;
}

export interface State {
    query: Query;
}
