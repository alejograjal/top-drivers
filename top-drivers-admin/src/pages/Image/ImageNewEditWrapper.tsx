import { isNil } from "lodash";
import { useEffect, useState } from "react";
import { getErrorMessage } from "utils/util";
import { useSnackbar } from "stores/useSnackbar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetImageById } from "hooks/top-drivers/image/useGetImageById";
import { CircularLoadingProgress } from "components/LoadingProgress/CircularLoadingProcess";
import { ImageNewEdit } from "./ImageNewEdit";

export const ImageNewEditWrapper = () => {
    const { imageId } = useParams<{ imageId?: string }>();
    const navigate = useNavigate();
    const setSnackbarMessage = useSnackbar((state) => state.setMessage);

    const { data, isLoading, isError, error } = useGetImageById(imageId);
    const [loading, setLoading] = useState<boolean>(true);

    const isValidImageId = isNil(imageId) || !isNaN(Number(imageId));

    useEffect(() => {
        if (!isValidImageId) {
            navigate('/Imagen');
            return;
        }
        if (isError) {
            navigate('/Imagen');
            setSnackbarMessage(`${getErrorMessage(error)}`, 'error')
            return;
        }
        setLoading(false)
    }, [isError, navigate, setSnackbarMessage, isValidImageId, error]);

    if (isLoading || loading) {
        return <CircularLoadingProgress />
    }

    return (
        <ImageNewEdit imageData={data} />
    )
}