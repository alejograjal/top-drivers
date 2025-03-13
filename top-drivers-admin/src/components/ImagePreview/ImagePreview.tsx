import React from "react";
import { Box, Typography } from "@mui/material";

interface ImagePreviewProps {
    imageSrc: string | null;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ imageSrc }) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#f4f4f4",
                padding: 1,
                marginBottom: 1
            }}
        >
            {imageSrc ? (
                <img
                    src={imageSrc}
                    alt="Vista previa"
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "contain"
                    }}
                />
            ) : (
                <Typography variant="body2" color="textSecondary">
                    No hay imagen seleccionada
                </Typography>
            )}
        </Box>
    );
};