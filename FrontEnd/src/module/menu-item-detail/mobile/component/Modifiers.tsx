// @flow
import React from "react";
import Box from "@mui/material/Box";

import {colors} from "colors";
import {mpx2vw} from "utils/transform";
import {PublishedModifierGroupAJAXView} from "type/api";
import {ModifierGroup, NoModifier} from "module/menu/component/ModifierGroup";

type Props = {
    groups: PublishedModifierGroupAJAXView[];
};
export const Modifiers = ({groups}: Props) => {
    return (
        <Box sx={{px: mpx2vw(16)}}>
            <Box
                component="h2"
                sx={{
                    fontWeight: 700,
                    color: colors.primary.poblano,
                    py: mpx2vw(23),
                    fontSize: mpx2vw(14),
                    lineHeight: mpx2vw(20),
                    m: 0,
                }}
            >
                Modifiers & Submodifiers
            </Box>

            {groups.length ? (
                groups.map(group => <ModifierGroup key={group.name} group={group} />)
            ) : (
                <NoModifier
                    sx={{
                        borderColor: colors.gray.light,
                        py: mpx2vw(80),
                        px: mpx2vw(85),
                        mx: 0,
                        mb: mpx2vw(35),
                        textAlign: "center",
                        fontSize: mpx2vw(14),
                        lineHeight: mpx2vw(24),
                    }}
                />
            )}
        </Box>
    );
};
