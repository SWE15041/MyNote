// @flow
import React from "react";
import {DeactivateModal} from "./Deactivate";
import {UpdateCategoryStatusAJAXRequest, UpdatePublishedMenuItemStatusAJAXRequest} from "type/api";
import {textEllipsisMultipleLine, textEllipsisOneLine} from "utils/transform";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
    visible: boolean;
    name?: string;
    categoryName?: string;
    onClose: () => void;
    onOk: (request: UpdateCategoryStatusAJAXRequest | UpdatePublishedMenuItemStatusAJAXRequest) => void;
};
export const DeactivateMenuItem = ({visible, name, categoryName, onClose, onOk}: Props) => {
    const matches = useMediaQuery("(max-width: 480px)");
    return (
        <DeactivateModal visible={visible} contentText="Would you like deactivate this menu item?" title="Deactivate Menu Item" onOk={onOk} onClose={onClose}>
            <>
                <Box sx={{...textEllipsisOneLine, fontWeight: 700, lineHeight: "20px"}}>{name}</Box>
                <Box
                    sx={
                        matches
                            ? {
                                  ...textEllipsisMultipleLine(2),
                              }
                            : {
                                  ...textEllipsisOneLine,
                              }
                    }
                >
                    Category: {categoryName}
                </Box>
            </>
        </DeactivateModal>
    );
};
