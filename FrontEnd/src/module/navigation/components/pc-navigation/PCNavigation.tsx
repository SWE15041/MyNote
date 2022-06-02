import React from "react";
import "./PCNavigation.less";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

interface Props {
    children: React.ReactElement;
}

const PCNavigation = ({children}: Props) => {
    return (
        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
            }}
        >
            <Nav />
            <Stack
                component="main"
                sx={{
                    flex: "auto",
                    minHeight: 0,
                    width: 0,
                }}
            >
                <Header />
                <Box
                    sx={{
                        flex: "auto",
                    }}
                >
                    {children}
                </Box>
            </Stack>
        </Box>
    );
};

export default PCNavigation;
