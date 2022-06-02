import {ComponentType, ComponentClass, FunctionComponent, ReactElement} from "react";

export declare type Component = ComponentType | ComponentClass<Pick<any, any>> | FunctionComponent<Pick<any, any>>;

export interface EnvoyRoute {
    name: string;
    path: string;
    menu: string;
    icon?: ReactElement;
    hash?: string;
    permission?: string | null;
    component?: Component;
    children?: EnvoyRoute[];
    goBack?: boolean | (() => void);
    collapsed?: boolean;
}
