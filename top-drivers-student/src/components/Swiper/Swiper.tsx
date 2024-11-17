import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as ReactSwiper } from 'swiper/react';
import { Box, CircularProgress } from "@mui/material";
import { useGetCourses } from "../../hooks/api/useGetCourses";

export const Swiper = () => {
    const getCourseResult = useGetCourses();

    if (getCourseResult.isError || getCourseResult.isPending) {
        return (
            <Box sx={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                width: '100%'
            }}>
                {getCourseResult.isError ? <p>No se ha obtenido la información de los cursos, por favor intente de nuevo</p> : <CircularProgress />}
            </Box>
        )
    }
    const courses = getCourseResult.data;

    return (
        <div className="course__container container">
            <ReactSwiper
                className='courses'
                spaceBetween={30}
                navigation
                modules={[Navigation]}
                pagination={{ clickable: true }}
                breakpoints={{
                    767: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                }}
            >
                {courses.map(course => (
                    <SwiperSlide className="course__card swiper-slide" key={course.id}>
                        <div className="shape shape__smaller"></div>

                        <h1 className="course__title">{course.name}</h1>
                        <h3 className="course__subtitle">
                            {course.description?.split('\n').map((line, index) => <p key={index}>{line}</p>)}
                        </h3>

                        <div className="course__data">
                            <div className="course__data-group remix-icon-fs-24">
                                <i className="ri-hourglass-fill"></i> {course.duration} horas
                            </div>
                        </div>

                        {course.cost !== 0 ? <h3 className="course__price">¢{course.cost}</h3> : ''}
                    </SwiperSlide>))
                }
            </ReactSwiper>
        </div>
    )
}