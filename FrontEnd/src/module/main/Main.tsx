import React from "react";
import {Redirect} from "react-router";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Switch} from "react-router-dom";
import {EnvoyRoutes} from "route";
import {EnvoyRoute} from "route/type";
import {Route} from "@wonder/core-fe";
import Navigation from "module/navigation/Navigation";
import Clock from "module/navigation/components/Clock";
import GlobalLoading from "widget/Loading";
import {useGlobalLoading} from "hooks/useGlobalLoading";
import {CustomerThemeProvider} from "../../theme";
import {Restaurant} from "module/restaurant";
import "./Main.less";

const Main = () => {
    const renderRoute = (route: EnvoyRoute, parentPath?: string): JSX.Element[] => {
        let routes = [];
        const path = pathName(route, parentPath);
        if (route.component) {
            if (route.permission === "Admin") {
                routes.push(<Route key={path} path={path} component={route.component} />);
            }
        } else if (route.children && route.children.length > 0 && route.children[0].component) {
            routes.push(<Route key={path} path={path} component={route.children[0].component} />);
        }
        if (route.children) {
            for (const child of route.children) {
                routes = routes.concat(renderRoute(child, path));
            }
        }
        return routes;
    };
    const pathName = (route: EnvoyRoute, parentPath: string | undefined) => {
        if (route.path.startsWith("/")) {
            return route.path;
        } else if (parentPath) {
            if (route.path) {
                return parentPath + "/" + route.path;
            } else {
                return parentPath;
            }
        } else {
            return "/" + route.path;
        }
    };
    const [loading] = useGlobalLoading();

    return (
        <>
            <GlobalLoading loading={loading} />
            <Restaurant />
            <Clock staticUi={false} style={{position: "absolute", left: -9999}} />
            <DndProvider backend={HTML5Backend}>
                <CustomerThemeProvider>
                    <Navigation>
                        <Switch>
                            {EnvoyRoutes.map(route => renderRoute(route))}
                            <Route exact key="/*" path="*" component={() => <Redirect to="/menu" />} />
                        </Switch>
                    </Navigation>
                </CustomerThemeProvider>
            </DndProvider>
        </>
    );
};

export default Main;
