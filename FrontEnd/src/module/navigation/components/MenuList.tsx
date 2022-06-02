import React, {useEffect} from "react";
import useChangeMenus from "../hook/useChangeMenus";
import {ListItemLink, SubMenuListItem} from "widget/Menu";
import List from "@mui/material/List";
import {EnvoyRoute} from "route/type";
import {useLocation} from "react-router-dom";

interface Props {
    collapsed: boolean;
    type?: "Mobile" | "PC";
    openNav?: (open: boolean) => void;
}

const MenuList: React.FunctionComponent<Props> = ({collapsed, type, openNav}) => {
    const location = useLocation();
    const {EnvoyMenus} = useChangeMenus();
    const [menus, setMenus] = React.useState<EnvoyRoute[]>([]);

    const toggleMenuDrawer = (menuPath: string) => {
        setMenus(
            menus.map(item => {
                return {
                    ...item,
                    collapsed: menuPath === item.path ? !item.collapsed : item.collapsed,
                };
            })
        );
    };

    useEffect(() => {
        setMenus(
            EnvoyMenus.map(item => {
                if (location.pathname.startsWith(`/${item.path}`)) {
                    return {...item, collapsed: true};
                } else {
                    return {...item, collapsed: false};
                }
            })
        );
    }, [EnvoyMenus, location]);

    return (
        <List sx={{p: 0}}>
            {menus.map(route => {
                if (route.children && route.children.length > 0) {
                    const active = route.children?.some(subMenu => location.pathname.indexOf(subMenu.path) >= 0);
                    return (
                        <SubMenuListItem
                            menu={route}
                            key={route.path}
                            active={active}
                            navCollapsed={collapsed}
                            onClick={() => {
                                if (collapsed && openNav && type === "PC") {
                                    openNav(true);
                                    setMenus(
                                        menus.map(item => {
                                            if (item.path === route.path) {
                                                return {...item, collapsed: true};
                                            } else {
                                                return {...item, collapsed: false};
                                            }
                                        })
                                    );
                                }
                            }}
                            toggleMenuDrawer={toggleMenuDrawer}
                        >
                            {(route.children || []).map(subRoute => {
                                const active = location.pathname.indexOf(`/${route.path}/${subRoute.path}`) >= 0;
                                return (
                                    <ListItemLink
                                        key={`/${route.path}/${subRoute.path}`}
                                        to={`/${route.path}/${subRoute.path}`}
                                        primary={subRoute.menu}
                                        icon={subRoute.icon}
                                        active={active}
                                        subRoute
                                        onClick={() => {
                                            setMenus(
                                                menus.map(item => {
                                                    if (item.path === route.path) {
                                                        return {...item, collapsed: true};
                                                    } else {
                                                        return {...item, collapsed: false};
                                                    }
                                                })
                                            );
                                        }}
                                    />
                                );
                            })}
                        </SubMenuListItem>
                    );
                } else {
                    return (
                        <ListItemLink
                            key={route.path}
                            to={`/${route.path}`}
                            primary={route.menu}
                            icon={route.icon}
                            active={location.pathname === `/${route.path}`}
                            navCollapsed={collapsed}
                            onClick={() => {
                                setMenus(
                                    menus.map(item => {
                                        if (item.path === route.path) {
                                            return {...item, collapsed: true};
                                        } else {
                                            return {...item};
                                        }
                                    })
                                );
                            }}
                        />
                    );
                }
            })}
        </List>
    );
};

export default MenuList;
