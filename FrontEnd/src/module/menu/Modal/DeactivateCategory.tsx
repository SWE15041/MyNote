// @flow
import React from "react";
import {DeactivateModal} from "./Deactivate";
import {UpdateCategoryStatusAJAXRequest, UpdatePublishedMenuItemStatusAJAXRequest} from "type/api";
import {textEllipsisMultipleLine, textEllipsisOneLine} from "utils/transform";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

type Props = {
    visible: boolean;
    categoryName?: string;
    onClose: () => void;
    onOk: (request: UpdateCategoryStatusAJAXRequest | UpdatePublishedMenuItemStatusAJAXRequest) => void;
};
export const DeactivateCategory = ({visible, categoryName, onClose, onOk}: Props) => {
    const matches = useMediaQuery("(max-width: 480px)");
    return (
        <DeactivateModal visible={visible} title="Deactivate Menu Category" contentText="Would you like deactivate this menu category?" onOk={onOk} onClose={onClose}>
            <>
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
