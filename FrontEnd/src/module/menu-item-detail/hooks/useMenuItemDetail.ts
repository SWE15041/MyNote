// @flow
import {useState} from "react";
import {useDispatch} from "react-redux";
import {actions as MenuActions} from "module/menu/module";
import {actions} from "../module";

import {MPPublishedMenuItemStatusAJAXView, UpdateCategoryStatusAJAXRequest, UpdatePublishedMenuItemStatusAJAXRequest} from "type/api";
import {useParams} from "react-router";

export const useMenuItemDetail = () => {
    const params = useParams<{menuItemId: string}>();
    const dispatch = useDispatch();
    const [deactivateMenuItemVisible, setDeactivateMenuItemVisible] = useState(false);

    const toggleActivateMenuItem = (val: boolean) => {
        // inactive
        if (!val) {
            setDeactivateMenuItemVisible(true);
        } else {
            //active, do not display modal
            const request = {
                status: MPPublishedMenuItemStatusAJAXView.ACTIVE,
                inactive_type: null,
                duration_hours: null,
            };
            dispatch(MenuActions.updateMenuItemStatus(params.menuItemId, request, () => dispatch(actions.getMenuItem(params.menuItemId))));
        }
    };

    const onOK = (request: UpdateCategoryStatusAJAXRequest | UpdatePublishedMenuItemStatusAJAXRequest) => {
        dispatch(
            MenuActions.updateMenuItemStatus(params.menuItemId, request as UpdatePublishedMenuItemStatusAJAXRequest, () => {
                setDeactivateMenuItemVisible?.(false);
                dispatch(actions.getMenuItem(params.menuItemId));
            })
        );
    };

    const onClose = () => {
        setDeactivateMenuItemVisible(false);
    };

    return [{visible: deactivateMenuItemVisible}, {toggleActivateMenuItem, onOK, onClose}];
};
