// @flow
import React, {useEffect, useRef, useState} from "react";
import Box from "@mui/material/Box";
import {ModifierGroup, NoModifier} from "module/menu/component/ModifierGroup";
import {PublishedModifierGroupAJAXView} from "type/api";
import {colors} from "colors";
import {useSize} from "ahooks";

type Props = {
    groups: PublishedModifierGroupAJAXView[];
};
export const Modifiers = ({groups}: Props) => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(68);
    const size = useSize(document.body);

    useEffect(() => {
        setHeight(divRef.current ? divRef.current.getBoundingClientRect().top + 48 : 68);
    }, [size]);

    return (
        <Box className="modifiers">
            <Box
                sx={{
                    fontSize: "14px",
                    lineHeight: "32px",
                    fontWeight: 700,
                    color: colors.primary.poblano,
                    ml: "25px",
                    mb: "17px",
                }}
            >
                Modifiers & Submodifiers
            </Box>

            {groups.length ? (
                <Box
                    ref={divRef}
                    sx={{
                        height: `calc(100vh - ${height}px)`,
                        overflowY: "overlay",
                    }}
                >
                    {groups.map(group => (
                        <ModifierGroup
                            key={group.name}
                            group={group}
                            sx={{
                                mx: "25px",
                                "& .sub-modifier-name": {
                                    maxWidth: "unset",
                                },
                                "&:last-child": {
                                    marginBottom: 0,
                                },
                            }}
                        />
                    ))}
                </Box>
            ) : (
                <NoModifier
                    sx={{
                        borderColor: colors.gray.light,
                        py: "96px",
                        mx: "25px",
                        textAlign: "center",
                    }}
                />
            )}
        </Box>
    );
};
