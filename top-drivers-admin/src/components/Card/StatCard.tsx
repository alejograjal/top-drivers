import { useLayout } from "hooks/useLayout";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
    onclick?: () => void;
}

export const StatCard = ({ title, value, icon, color, onclick }: StatCardProps) => {
    const isMobile = useLayout();

    return (
        <Card onClick={onclick} sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row",
            p: isMobile ? 2 : 3,
            width: isMobile ? "100%" : 420,
            height: isMobile ? "auto" : 160,
            boxShadow: 3,
            borderRadius: 2,
            bgcolor: "#1E1E2F",
            color: "white",
            textAlign: isMobile ? "center" : "left",
            cursor: "pointer",
        }}>
            <Box sx={{
                bgcolor: color,
                color: "white",
                p: 2,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                mb: isMobile ? 2 : 0
            }}>
                {icon}
            </Box>
            <CardContent sx={{ ml: isMobile ? 0 : 2 }}>
                <Typography variant="h6" sx={{ opacity: 0.8 }}>{title}</Typography>
                <Typography variant="h3" fontWeight="bold">
                    {value}
                </Typography>
            </CardContent >
        </Card >
    );
};
