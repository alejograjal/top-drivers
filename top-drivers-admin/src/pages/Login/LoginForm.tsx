import { isPresent } from "utils/util";
import { useAuth } from "contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCallback, useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FormFieldErrorMessage } from "components/FormFieldErrorMessage";
import { LoginDefaultValues, LoginSchema, LoginTypeForm } from "./LoginSchema";

export const LoginForm = () => {
    const formMethods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: LoginDefaultValues
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { handleSubmit, control, formState: { errors } } = formMethods;
    const { login, isAuthenticated } = useAuth();

    const createLoginWrapper = useCallback((data: LoginTypeForm) => {
        setLoading(true)
        login(data);
        setLoading(false)
    }, [login]);

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(false);
            navigate('/Inicio');
        }
    }, [isAuthenticated, navigate])

    return (
        <Box
            sx={{
                padding: { xs: '2rem', md: '3rem' },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e6e6e6',
                borderRadius: '10px',
                xs: { width: 'calc(100vh - 80px - 2rem)' },
                md: { width: 'calc(100vh - 80px - 10rem)' },
                minHeight: { xs: 'calc(40vh)', md: 'calc(40vh)' },
            }}
        >
            <Typography component="h1" variant="h2" sx={{ textAlign: 'center' }}>
                Inicio de sesión
            </Typography>
            <FormProvider {...formMethods}>
                <Box component="form" onSubmit={handleSubmit(createLoginWrapper)} noValidate sx={{ mt: 1 }} width='100%'>
                    <Box>
                        <Controller
                            name="nickName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Nombre de usuario"
                                    autoFocus
                                    error={isPresent(errors.nickName)}
                                />
                            )}
                        />
                        {errors.nickName?.message && (
                            <FormFieldErrorMessage message={errors.nickName.message} />
                        )}
                    </Box>
                    <Box>
                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Contraseña"
                                    type="password"
                                    error={isPresent(errors.password)}
                                />
                            )}
                        />
                        {errors.password?.message && (
                            <FormFieldErrorMessage message={errors.password.message} />
                        )}
                    </Box>
                    <Button
                        loading={loading}
                        loadingPosition="start"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Ingresar
                    </Button>
                </Box>
            </FormProvider>
        </Box>
    )
}