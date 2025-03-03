import { LoginForm } from "./LoginForm"
import { Container, CssBaseline } from "@mui/material"

export const LoginPage = () => {
    return (
        <Container component="main" maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
            <CssBaseline />
            <LoginForm />
        </Container>
    )
}