import React from "react";
import {Avatar} from "widget/Avatar";
import {mpx2vw} from "utils/transform";
import {RestaurantAvatarStatus, RestaurantStatusMap} from "module/restaurant/type";

type Props = {
    isOutOfServiceTime?: boolean;
    status?: RestaurantAvatarStatus;
    src?: string;
    isListItem?: boolean;
    size: "middle" | "small" | "large";
};

const AvatarSizeMap = {
    small: 30,
    middle: 40,
    large: 50,
};

const BadgeSizeMap = {
    small: 9,
    middle: 12,
    large: 15,
};

export const RestaurantAvatar = ({status, src, size, isOutOfServiceTime}: Props) => {
    const hideDot = !status || status === RestaurantAvatarStatus.INACTIVE || status === RestaurantAvatarStatus.UNPUBLISHED;
    const outService = status === RestaurantAvatarStatus.OUT_SERVICE || isOutOfServiceTime;
    const avatarSize = AvatarSizeMap[size];
    const badgeSize = BadgeSizeMap[size];
    return (
        <Avatar
            sx={{
                "& .MuiBadge-badge": {
                    width: `${badgeSize}px`,
                    height: `${badgeSize}px`,
                    visibility: hideDot ? "hidden" : "visible",
                    bgcolor: outService ? RestaurantStatusMap[RestaurantAvatarStatus.OUT_SERVICE] : status ? RestaurantStatusMap[status] : "transparent",
                    color: outService ? RestaurantStatusMap[RestaurantAvatarStatus.OUT_SERVICE] : status ? RestaurantStatusMap[status] : "transparent",
                },
                "& .MuiAvatar-root": {
                    width: `${avatarSize}px`,
                    height: `${avatarSize}px`,
                },
                "@media screen and (max-width: 480px)": {
                    "& .MuiBadge-badge": {
                        width: mpx2vw(badgeSize),
                        height: mpx2vw(badgeSize),
                    },
                    "& .MuiAvatar-root": {
                        width: mpx2vw(avatarSize),
                        height: mpx2vw(avatarSize),
                    },
                },
            }}
            src={src}
        />
    );
};
