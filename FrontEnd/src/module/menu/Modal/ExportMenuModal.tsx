import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {ExportOutlined} from "../../../asset/icon";
import {Checkbox} from "widget/Checkbox";
import {Dialog} from "widget/Dialog";
import {LoadingButton} from "widget/LoadingButton";
import axios from "axios";
import {useParams} from "react-router";
import {saveAs} from "../utils";
import {FormControlLabel} from "widget/Form/FormControlLabel";

export const ExportMenuModal = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = useState(false);
    const params = useParams<{id: string}>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleExport = async () => {
        try {
            setOpen(false);
            setLoading(true);
            const res = await axios.put(
                "/file-downloader/menu",
                {menu_id: params.id},
                {
                    responseType: "blob",
                }
            );
            saveAs(res.data, res.headers["content-disposition"].replace("attachment; filename=", ""));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!open) {
            setChecked(false);
        }
    }, [open]);

    return (
        <>
            <LoadingButton
                sx={{
                    width: "88px",
                    height: "32px",
                    mr: "13px",
                    "&.Mui-disabled": {
                        justifyContent: "space-between",
                        pl: "0",
                        pr: "10px",
                    },
                }}
                variant="outlined"
                startIcon={<ExportOutlined />}
                loadingPosition="start"
                loading={loading}
                onClick={handleClickOpen}
            >
                Export
            </LoadingButton>
            <Dialog
                sx={{
                    "& .MuiPaper-root": {
                        width: "496px",
                    },
                }}
                actionsStyle={{
                    pt: "10px",
                }}
                open={open}
                maskClosable={false}
                title="Export Menu"
                actions={[
                    {
                        key: "Cancel",
                        text: "Cancel",
                        variant: "outlined",
                        onClick: handleClose,
                        width: 125,
                    },
                    {
                        key: "Export",
                        text: "Export",
                        variant: "contained",
                        onClick: () => {
                            handleExport();
                        },
                        width: 125,
                    },
                ]}
                onClose={handleClose}
                contentText={
                    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                        <Box>Any active filters or searches will be applied to your export. Do you want to clear all filters and searches before exporting?</Box>
                        <FormControlLabel
                            sx={{
                                mt: "10px",
                                mr: "0px",
                            }}
                            control={<Checkbox checked={checked} onChange={e => handleChange(e)} />}
                            label="Clear all"
                        />
                    </Box>
                }
            />
        </>
    );
};
