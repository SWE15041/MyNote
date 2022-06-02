import React from "react";
import MNavigation from "./components/m-navigation/MNavigation";
import PCNavigation from "./components/pc-navigation/PCNavigation";
import {useLocation} from "react-router-dom";
import {useResponsive} from "hooks/useResponsive";
import {AlonePagePath} from "../../route";

interface Props {
    children: React.ReactElement;
}

const Navigation = ({children}: Props) => {
    const screens = useResponsive();
    const location = useLocation();
    if (AlonePagePath.some(name => location.pathname.startsWith(name))) return <>{children}</>;

    return screens.xs ? <PCNavigation>{children}</PCNavigation> : <MNavigation>{children}</MNavigation>;
};

export default Navigation;
