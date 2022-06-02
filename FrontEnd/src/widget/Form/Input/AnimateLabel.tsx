import React from "react";
import {useSpring, animated} from "react-spring";
import {colors} from "colors";
import {useResponsive} from "hooks/useResponsive";
import {mpx2vw} from "utils/transform";

interface AnimateLabelProps {
    label: string;
    isFocus: boolean;
    error?: boolean;
}

export const AnimateLabel = ({label, isFocus, error}: AnimateLabelProps) => {
    const screens = useResponsive();

    const labelProps = useSpring({
        transform: isFocus ? (screens.xs ? "translate3d(10px,-10px,0px)" : `translate3d(${mpx2vw(10)},-${mpx2vw(10)},0px)`) : screens.xs ? "translate3d(10px,10px,0px)" : `translate3d(${mpx2vw(10)},${mpx2vw(10)},0px)`,
        color: isFocus ? (error ? colors.validation.red : colors.primary.poblano) : colors.gray.medium,
    });

    return (
        <animated.label
            style={{
                position: "absolute",
                zIndex: 10,
                left: 0,
                top: 0,
                ...labelProps,
                backgroundColor: colors.primary.white,
                padding: !screens.sx ? "0 5px" : `0 ${mpx2vw(5)}`,
                pointerEvents: "none",
                fontSize: screens.xs ? "14px" : mpx2vw(14),
            }}
        >
            {label}
        </animated.label>
    );
};
