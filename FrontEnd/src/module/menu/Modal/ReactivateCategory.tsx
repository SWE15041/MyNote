import React from "react";
import {UpdateCategoryStatusAJAXRequest$Status} from "type/api";
import {useDispatch} from "react-redux";
import {actions} from "module/menu/module";
import {Dialog} from "widget/Dialog";
import {useResponsive} from "hooks/useResponsive";
import {useLoadingStatus} from "@wonder/core-fe";
import {LOADING_UPDATE_CATEGORY_STATUS} from "../type";

interface ReactivateCategoryProps {
    visible: boolean;
    categoryName?: string;
    onClose: () => void;
}

export const ReactivateCategory = ({visible, categoryName, onClose}: ReactivateCategoryProps) => {
    const loadingUpdateCategoryStatus = useLoadingStatus(LOADING_UPDATE_CATEGORY_STATUS);
    const dispatch = useDispatch();
    const screen = useResponsive();
    const handleConfirm = () => {
        dispatch(
            actions.updateCategoryStatus(
                {
                    status: UpdateCategoryStatusAJAXRequest$Status.ACTIVE,
                    inactive_type: null,
                    duration_hours: null,
                },
                onClose
            )
        );
    };

    return (
        <Dialog
            loading={loadingUpdateCategoryStatus}
            sx={{
                "& .MuiPaper-root": {
                    width: "496px",
                    "& .MuiDialogContent-root": {
                        overflowY: "unset",
                    },
                },
            }}
            open={visible}
            title={`Are you sure you want to reactivate ${categoryName}?`}
            onClose={onClose}
            maskClosable={false}
            contentText={
                screen.xs ? (
                    <>
                        <div>Once reactivated, your customers can order</div>
                        <div>from this menu category.</div>
                    </>
                ) : (
                    <>Once reactivated, your customers can order from this menu category.</>
                )
            }
            actions={[
                {
                    key: "cancel",
                    text: "Cancel",
                    variant: "outlined",
                    onClick: onClose,
                    width: 125,
                },
                {
                    key: "Reactivate",
                    text: "Reactivate",
                    variant: "contained",
                    onClick: handleConfirm,
                    width: 125,
                },
            ]}
        />
    );
};
