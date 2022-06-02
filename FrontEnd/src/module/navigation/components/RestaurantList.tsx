import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "type/state";
import {RestaurantAvatar} from "./RestaurantAvatar";
import {useBinaryAction} from "@wonder/core-fe";
import Box from "@mui/material/Box";
import {RestaurantAvatarStatus} from "module/restaurant/type";
import {colors} from "colors";
import {mpx2vw, textEllipsisOneLine} from "utils/transform";
import {restaurantActions} from "module/restaurant";

interface Props {
    setMenuVisible: (visible: boolean) => void;
}

type RestaurantListItemProps = {
    name: string;
    status: RestaurantAvatarStatus;
    src?: string;
    onClick?: () => void;
};

const RestaurantListItem = ({name, status, src, onClick}: RestaurantListItemProps) => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "42px",
                alignItems: "center",
                pl: "24.59px",
                cursor: "pointer",
                "&:hover": {
                    bgcolor: "rgba(216, 216, 216, 0.3)",
                },
                "@media screen and (max-width: 480px)": {
                    height: mpx2vw(52),
                    pl: mpx2vw(49),
                    "&:hover": {
                        bgcolor: "transparent",
                    },
                },
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    mr: "12px",
                    "@media screen and (max-width: 480px)": {
                        mr: mpx2vw(12),
                    },
                }}
            >
                <RestaurantAvatar status={status} src={src} size="small" />
            </Box>
            <Box
                sx={{
                    flex: 1,
                    fontSize: "14px",
                    pr: "18px",
                    lineHeight: "16px",
                    ...textEllipsisOneLine,
                    "@media screen and (max-width: 480px)": {
                        fontSize: mpx2vw(16),
                    },
                }}
            >
                {name}
            </Box>
        </Box>
    );
};

const RestaurantList: React.FunctionComponent<Props> = ({setMenuVisible}) => {
    const {restaurantInfo, restaurantList} = useSelector((state: RootState) => {
        const {restaurantInfo, restaurantList} = state.app.restaurant;
        return {restaurantInfo, restaurantList};
    });
    const toggleRestaurant = useBinaryAction(restaurantActions.toggleRestaurant);
    const handleToggleRestaurant = (restaurantId: string) => {
        toggleRestaurant(restaurantId, () => setMenuVisible(false));
    };

    return (
        <Box
            sx={{
                color: colors.black,
                overflowY: "overlay",
                maxHeight: `${42 * 5 + 67 + 28}px`,
                "@media screen and (max-width: 480px)": {
                    color: colors.primary.white,
                    maxHeight: mpx2vw(52 * 3),
                },
            }}
        >
            {restaurantList
                .filter(item => item.id !== restaurantInfo?.restaurant_id)
                .map(item => {
                    return <RestaurantListItem key={item.id} status={RestaurantAvatarStatus[item.status]} src={item.portal_logo_image.image_key ? `/image/${item.portal_logo_image.image_key}` : undefined} name={item.name} onClick={() => handleToggleRestaurant(item.id)} />;
                })}
        </Box>
    );
};

export default RestaurantList;
