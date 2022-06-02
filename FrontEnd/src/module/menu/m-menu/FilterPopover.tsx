// @flow
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAction, useUnaryAction} from "@wonder/core-fe";

import {actions} from "../module";

import {IFormInput} from "../type";
import {RootState} from "type/state";
import {FilterForm} from "./FilterForm";
import {isEqual} from "lodash";

const defaultValue = {
    active: false,
    inactive: false,
    withModifier: false,
    withoutModifier: false,
    min: "",
    max: "",
};

type Props = {
    visible: boolean;
    onClose: () => void;
};
export const FilterPopover = ({visible, onClose}: Props) => {
    const {filterOption} = useSelector((state: RootState) => ({filterOption: state.app.menu.filterOption}));
    const setFilterOption = useUnaryAction(actions.setFilterOption);
    const search = useAction(actions.search);
    const {control, watch, reset, handleSubmit, getValues} = useForm<IFormInput>({
        mode: "onChange",
        defaultValues: filterOption ? filterOption : defaultValue,
    });

    const onSubmit: SubmitHandler<IFormInput> = data => {
        setFilterOption(data);
        search();
        onClose();
    };

    const [error, setError] = useState(false);
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        const subscription = watch(value => {
            const {min, max} = value;
            setDisabled(isEqual(value, defaultValue));
            if (min && max && +Number(min).toFixed(2) > +Number(max).toFixed(2)) {
                setError(true);
            } else {
                setError(false);
            }
        });
        return () => subscription.unsubscribe();
    }, [watch, isEqual]);

    useEffect(() => {
        if (visible) {
            setDisabled(isEqual(getValues(), defaultValue));
        }
    }, [visible]);

    return (
        <FilterForm
            clearAll={() => {
                setFilterOption(null);
                reset(defaultValue);
            }}
            control={control}
            error={error}
            disabled={disabled}
            handleSubmit={handleSubmit(onSubmit)}
        />
    );
};
