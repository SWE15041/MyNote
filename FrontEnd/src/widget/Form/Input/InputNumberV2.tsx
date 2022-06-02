// @flow
import React, {useRef, useState} from "react";
import InputBase, {InputBaseProps} from "@mui/material/InputBase";
import Box from "@mui/material/Box";

import {useInputColor} from "./hooks";
import {colors} from "colors";
import {mpx2vw} from "utils/transform";
import {styled} from "@mui/material/styles";
import {getNumberPrecision, num2str, trimNumber, validateNumber} from "utils/numberUtil";
import getMiniDecimal, {DecimalClass, roundDownUnsignedDecimal, toFixed, ValueType} from "utils/miniDecimal";

const AdornmentBox = styled(Box)(({theme}) => ({
    paddingLeft: "8px",
    fontSize: "14px",
    lineHeight: "24px",
    cursor: "text",
    [theme.breakpoints.down(480)]: {
        paddingLeft: mpx2vw(8),
        fontSize: mpx2vw(14),
        lineHeight: mpx2vw(24),
    },
}));

type Props<T extends ValueType = ValueType> = {precision?: number; max?: T; min?: T; value?: T; defaultValue?: T} & InputBaseProps;

export function fillRef<T>(ref: React.Ref<T>, node: T) {
    if (typeof ref === "function") {
        ref(node);
    } else if (typeof ref === "object" && ref && "current" in ref) {
        (ref as any).current = node;
    }
}

/**
 * Merge refs into one ref function to support ref passing.
 */
export function composeRef<T>(...refs: React.Ref<T>[]): React.Ref<T> {
    const refList = refs.filter(ref => ref);
    if (refList.length <= 1) {
        return refList[0];
    }

    return (node: T) => {
        refs.forEach(ref => {
            fillRef(ref, node);
        });
    };
}

export const InputNumberV2 = React.forwardRef(({value, defaultValue, precision = 0, max, min, disabled, readOnly, error, onFocus, onBlur, onChange, sx = [], startAdornment, endAdornment, ...reset}: Props, ref: React.Ref<HTMLInputElement>) => {
    const [isFocus, setIsFocus] = useState(false);
    const [color] = useInputColor({value, isFocus: isFocus || Boolean(value), error});
    const inputRef = useRef<HTMLInputElement | null>(null);

    const startAdornmentNode = startAdornment ? (
        <AdornmentBox
            sx={{color: colors.primary.poblano}}
            onClick={() => {
                setIsFocus(true);
                inputRef?.current?.focus();
            }}
        >
            {startAdornment}
        </AdornmentBox>
    ) : null;
    const endAdornmentNode = endAdornment ? (
        <AdornmentBox
            sx={{color}}
            onClick={() => {
                setIsFocus(true);
                inputRef?.current?.focus();
            }}
        >
            {endAdornment}
        </AdornmentBox>
    ) : null;

    const getDecimalIfValidate = (value: ValueType, precision: number | undefined, isMax?: boolean) => {
        const decimal = getMiniDecimal(value);
        if (decimal.isInvalidate()) {
            return null;
        }

        if (precision === undefined) {
            return decimal;
        }

        const {negative, integerStr, decimalStr, negativeStr} = trimNumber(decimal.toString());
        const unSignedNumberStr = integerStr + "." + decimalStr;

        if ((isMax && !negative) || (!isMax && negative)) {
            return getMiniDecimal(negativeStr + roundDownUnsignedDecimal(unSignedNumberStr, precision));
        } else {
            // return getMiniDecimal(negativeStr + roundUpUnsignedDecimal(unSignedNumberStr, precision));
            return getMiniDecimal(negativeStr + toFixed(unSignedNumberStr, ".", precision));
        }
    };

    const getPrecision = React.useCallback(
        (numStr: string, userTyping: boolean) => {
            if (userTyping) {
                return undefined;
            }

            if (precision >= 0) {
                return precision;
            }

            return Math.max(getNumberPrecision(numStr));
        },
        [precision]
    );

    const mergedFormatter = React.useCallback(
        (number: string, userTyping: boolean) => {
            let str = typeof number === "number" ? num2str(number) : number;

            // User typing will not auto format with precision directly
            if (!userTyping) {
                const mergedPrecision = getPrecision(str, userTyping);

                if (validateNumber(str) && mergedPrecision && mergedPrecision >= 0) {
                    // Separator
                    const separatorStr = ".";

                    str = toFixed(str, separatorStr, mergedPrecision);
                }
            }

            return str;
        },
        [getPrecision]
    );

    const triggerValueUpdate = (newValue: DecimalClass, userTyping: boolean): DecimalClass => {
        let updateValue = newValue;

        let isRangeValidate = isInRange(updateValue) || updateValue.isEmpty();

        // Skip align value when trigger value is empty.
        // We just trigger onChange(null)
        // This should not block user typing
        if (!updateValue.isEmpty() && !userTyping) {
            // Revert value in range if needed
            updateValue = getRangeValue(updateValue) || updateValue;
            isRangeValidate = true;
        }

        if (!readOnly && !disabled && isRangeValidate) {
            const numStr = updateValue.toString();
            const mergedPrecision = getPrecision(numStr, userTyping);
            if (mergedPrecision && mergedPrecision >= 0) {
                updateValue = getMiniDecimal(toFixed(numStr, ".", mergedPrecision));
            }

            return updateValue;
        }

        return getMiniDecimal(value!);
    };

    // >>> Max & Min limit
    const maxDecimal = React.useMemo(() => getDecimalIfValidate(max!, precision, true), [max, precision]);
    const minDecimal = React.useMemo(() => getDecimalIfValidate(min!, precision, false), [min, precision]);

    /**
     * Find target value closet within range.
     * e.g. [11, 28]:
     *    3  => 11
     *    23 => 23
     *    99 => 28
     */
    const getRangeValue = (target: DecimalClass) => {
        // target > max
        if (maxDecimal && !target.lessEquals(maxDecimal)) {
            return maxDecimal;
        }

        // target < min
        if (minDecimal && !minDecimal.lessEquals(target)) {
            return minDecimal;
        }

        return null;
    };

    /**
     * Check value is in [min, max] range
     */
    const isInRange = (target: DecimalClass) => !getRangeValue(target);

    return (
        <InputBase
            inputRef={composeRef(inputRef, ref)}
            {...reset}
            startAdornment={startAdornmentNode}
            endAdornment={endAdornmentNode}
            type="number"
            sx={[
                {
                    height: "32px",
                    lineHeight: "24px",
                    border: `1px solid ${color}`,
                    borderRadius: "4px",
                    "& input": {
                        flex: 1,
                        color: colors.black,
                        fontSize: "14px",
                        height: "32px",
                        lineHeight: "24px",
                        boxSizing: "border-box",
                        borderRadius: "4px",
                        p: "0 10px 0 8px",
                        transition: theme => theme.transitions.create(["border-color", "background-color", "box-shadow"]),
                    },
                    "@media screen and (max-width: 480px)": {
                        "& .MuiInputBase-input": {
                            fontSize: mpx2vw(14),
                            padding: mpx2vw(10),
                            borderRadius: mpx2vw(4),
                        },
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            value={value}
            disabled={disabled}
            readOnly={readOnly}
            onFocus={e => {
                onFocus && onFocus(e);
                setIsFocus(true);
            }}
            onBlur={e => {
                if (e.target.value) {
                    if (Number(e.target.value).toFixed(precision) !== value) {
                        const number = triggerValueUpdate(getMiniDecimal(e.target.value), false);
                        e.target.value = mergedFormatter(number.toString(), false);
                        onChange && onChange(e);
                    }
                }
                setIsFocus(false);
                onBlur && onBlur(e);
            }}
            onChange={onChange}
        />
    );
});
