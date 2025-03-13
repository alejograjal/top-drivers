import { isNil } from "lodash";
import { useEffect, useState } from "react";
import { getErrorMessage } from "utils/util";
import { useSnackbar } from "stores/useSnackbar";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseById } from "hooks/top-drivers/course/useGetCourseById";
import { CircularLoadingProgress } from "components/LoadingProgress/CircularLoadingProcess";
import { CourseNewEdit } from "./CourseNewEdit";

export const CourseNewEditWrapper = () => {
    const { courseId } = useParams<{ courseId?: string }>();
    const navigate = useNavigate();
    const setSnackbarMessage = useSnackbar((state) => state.setMessage);

    const { data, isLoading, isError, error } = useGetCourseById(courseId);
    const [loading, setLoading] = useState<boolean>(true);

    const isValidCourseId = isNil(courseId) || !isNaN(Number(courseId));

    useEffect(() => {
        if (!isValidCourseId) {
            navigate('/Curso');
            return;
        }
        if (isError) {
            navigate('/Curso');
            setSnackbarMessage(`${getErrorMessage(error)}`, 'error')
            return;
        }
        setLoading(false)
    }, [isError, navigate, setSnackbarMessage, isValidCourseId, error]);

    if (isLoading || loading) {
        return <CircularLoadingProgress />
    }

    return (
        <CourseNewEdit courseData={data} />
    )
}