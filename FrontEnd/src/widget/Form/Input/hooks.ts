import {colors} from "colors";
import {useMemo} from "react";

export const useInputColor = ({value, isFocus, error}: {value?: unknown; isFocus: boolean; error?: boolean}) => {
    const color = useMemo(() => {
        if (error) {
            return colors.validation.red;
        } else {
            return value || isFocus ? colors.primary.poblano : colors.gray.medium;
        }
    }, [error, isFocus, value]);
    return [color];
};
