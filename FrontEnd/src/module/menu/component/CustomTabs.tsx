// @flow
import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {useSelector} from "react-redux";

import {RootState} from "type/state";
import {ListPublishedMenuAJAXResponse$Category} from "type/api";
import {colors} from "colors";

type Props = {
    handleCategoryChange: (category: ListPublishedMenuAJAXResponse$Category) => void;
};

export const CustomTabs = ({handleCategoryChange}: Props) => {
    const {selectedMenu, selectedCategory} = useSelector((state: RootState) => state.app.menu);
    const sx = {
        minHeight: "auto",
        mt: "30px",
        mb: "10px",
        "& .MuiTabs-scroller": {
            height: "37px",
        },
        "& .MuiButtonBase-root": {
            minHeight: "30px",
            maxHeight: "30px",
            letterSpacing: "normal",
            textTransform: "none",
            color: colors.gray.medium,
            fontWeight: 400,
            px: "10px",

            "&.Mui-selected": {
                color: colors.primary.poblano,
                fontWeight: "700",
            },
        },
        "& .MuiTabs-scrollButtons": {
            width: "20px",
            color: colors.primary.poblano,
            opacity: 1,
        },
        "& .MuiTabs-indicator": {
            height: "4px",
            bgcolor: colors.primary.poblano,
        },
    };
    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        handleCategoryChange(newValue);
    };

    if (!selectedMenu)
        return (
            <Box
                sx={{
                    height: "77px",
                }}
            />
        );

    return (
        <Tabs sx={sx} value={selectedCategory} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example">
            {selectedMenu.categories.map(category => (
                <Tab
                    key={category.name}
                    label={
                        <Box width="100%" display="flex" alignItems="center">
                            <Box
                                component="span"
                                flex={1}
                                sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {`${category.id === null ? "All Items" : category.name}`}
                            </Box>
                            <Box component="span">&nbsp;{`(${category.number_of_items})`}</Box>
                        </Box>
                    }
                    value={category}
                />
            ))}
        </Tabs>
    );
};
