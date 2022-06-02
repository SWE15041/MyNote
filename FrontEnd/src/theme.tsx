import React from "react";
import {createTheme, Theme, ThemeProvider} from "@mui/material";

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: "#246b6b",
        },
    },
    typography: {
        fontFamily: ["Heebo", "sans-serif", "Roboto"].join(","),
    },
});

export const CustomerThemeProvider: React.FC = ({children}) => <ThemeProvider theme={theme}>{children}</ThemeProvider>;
