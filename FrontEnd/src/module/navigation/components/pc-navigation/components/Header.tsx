import React from "react";
import {Account} from "../../Account";
import BreadCrumb from "../../BreadCrumb";
import Box from "@mui/material/Box";
import {colors} from "colors";

interface Props {}

const Header: React.FunctionComponent<Props> = () => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                height: "58px",
                bgcolor: colors.primary.white,
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.13)",
            }}
        >
            <BreadCrumb />
            <Account type="PC" />
        </Box>
    );
};

export default Header;
