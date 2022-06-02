import {useMemo} from "react";
import {useSelector} from "react-redux";
import {RootState} from "type/state";
import {EnvoyMenus} from "route";
import MenuRoute from "module/menu/route";

const useChangeMenus = () => {
    const menus = useSelector((state: RootState) => state.app.restaurant.menus);
    const navigationMenu = useMemo(() => {
        if (menus.length === 0) {
            return EnvoyMenus.map(item => {
                return {...item};
            });
        } else {
            return EnvoyMenus.map(item => {
                if (item.name === MenuRoute.name) {
                    const [subMenu] = item.children || [];
                    const navigationMenu = menus.map(o => ({
                        ...subMenu,
                        menu: o.name,
                        path: `${o.menu_id}`,
                    }));
                    return {
                        ...item,
                        children: navigationMenu,
                    };
                }
                return item;
            });
        }
    }, [menus]);

    return {
        EnvoyMenus: navigationMenu,
    };
};
export default useChangeMenus;
