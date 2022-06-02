import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";

import {Link, useLocation} from "react-router-dom";
import {EnvoyMenus as FTIRoutes} from "route";

import "./breadcrumb.less";
import {useChangeMenuBreadcrumb} from "./useHook";
import {colors} from "colors";

import {EnvoyRoute as FTIRoute} from "route/type";
import {mpx2vw, textEllipsisOneLine} from "utils/transform";

interface HistoryRoute {
    name: string;
    path: string;
}

const BreadCrumbUI = React.memo(({historyRoutesArray}: {historyRoutesArray: HistoryRoute[]}) => {
    return (
        <div className="fti-breadcrumb">
            <Breadcrumbs
                sx={{
                    fontSize: "14px",
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(14),
                    },
                }}
            >
                {historyRoutesArray.map((route, index) =>
                    index === historyRoutesArray.length - 1 ? (
                        <Box
                            component="span"
                            key={route.path}
                            sx={{
                                display: "block",
                                color: colors.black,
                                "@media screen and (max-width: 480px)": {
                                    maxWidth: mpx2vw(120),
                                    ...textEllipsisOneLine,
                                },
                            }}
                            aria-current="page"
                        >
                            {route.name}
                        </Box>
                    ) : (
                        <MuiLink
                            sx={{
                                display: "block",
                                textDecoration: "none",
                                color: colors.black,
                                "&:hover": {
                                    color: "inherit",
                                    textDecoration: "underline",
                                },
                                "&:active": {
                                    textDecoration: "none",
                                },
                                "@media screen and (max-width: 480px)": {
                                    maxWidth: mpx2vw(120),
                                    ...textEllipsisOneLine,
                                },
                            }}
                            component={Link}
                            key={route.path}
                            to={route.path}
                            color="inherit"
                        >
                            {route.name}
                        </MuiLink>
                    )
                )}
            </Breadcrumbs>
        </div>
    );
});

const BreadCrumb: React.FunctionComponent = () => {
    const location = useLocation();
    const historyRoutes: HistoryRoute[] = routes(location.pathname);
    const {historyRoutesArray} = useChangeMenuBreadcrumb(historyRoutes);

    return <BreadCrumbUI historyRoutesArray={historyRoutesArray} />;
};

function routes(pathname: string): HistoryRoute[] {
    const paths = pathname.split("/");
    if (paths.length === 1) {
        return [];
    }
    paths.splice(0, 1);
    const routes: FTIRoute[] = matchRoute(paths, FTIRoutes, 0);
    const result: HistoryRoute[] = [];
    for (let i = 0; i < routes.length; i += 1) {
        const route = routes[i];
        const historyRoute: HistoryRoute = {
            name: route.name,
            path: i > 0 && result[i - 1] ? result[i - 1].path + "/" + route.path : "/" + route.path,
        };
        if (!result[result.length - 1] || result[result.length - 1].name !== historyRoute.name) {
            result.push(historyRoute);
        }
    }
    return result;
}

function matchRoute(paths: string[], routes: FTIRoute[], level: number): FTIRoute[] {
    const path = paths[level];
    const result: FTIRoute[] = [];
    for (const route of routes) {
        if (matchPattern(route.path, path)) {
            result.push(route);
            if (route.children && route.children.length > 0) {
                return result.concat(matchRoute(paths, route.children, level + 1));
            }
        }
    }
    return result;
}

function matchPattern(pattern: string, path: string) {
    if (!pattern || !path) {
        return false;
    }
    if (pattern === path) {
        return true;
    }
    const index = pattern.indexOf(":");
    if (index >= 0) {
        return pattern.substr(0, index - 1) === path.substr(0, index - 1);
    }
    return false;
}

export default BreadCrumb;
