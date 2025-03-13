import 'swiper/swiper-bundle.css';
import { SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as ReactSwiper } from 'swiper/react';
import { useEffect, useState } from 'react';

const BASE_URL = "https://escuelademanejotopdrivers.com:8080/Opinions";

interface ImageItem {
    original: string;
    thumbnail: string;
}

export const OpinionsLoader = () => {
    const [images, setImages] = useState<ImageItem[]>([]);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${BASE_URL}/`);

            if (!response.ok) {
                throw new Error("Failed to fetch image data");
            }

            const text = await response.text();

            const imagePaths = Array.from(text.matchAll(/<a href="([^"]+\.(?:jpe?g))">/g)).map(match => match[1]);

            const imageItems = imagePaths.map((imagePath) => ({
                original: `${BASE_URL}/${imagePath}`,
                thumbnail: `${BASE_URL}/${imagePath}`,
            }));

            setImages(imageItems);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        fetchImages();
    }, []);

    return (
        <div className="opinions__content">
            <ReactSwiper
                className="opinionCards"
                navigation
                modules={[Navigation]}
                pagination={{ clickable: true }}
                slidesPerView={1}
                spaceBetween={10}
                autoHeight={true}
                loop={true}
                breakpoints={{
                    480: {
                        slidesPerView: 1,  // Show 1 slide per view for mobile
                    },
                    768: {
                        slidesPerView: 1,  // Still 1 slide per view for tablets
                    },
                    1040: {
                        slidesPerView: 1,  // Show 2 slides per view on larger screens
                    },
                }}
                updateOnWindowResize={true} // Automatically update layout on window resize
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="opinion__card swiper-slide">
                        <div className="shape shape__smaller"></div>
                        <img src={image.original} alt={`Slide ${index + 1}`} className="swiper-image" />
                    </SwiperSlide>
                ))}
            </ReactSwiper>
        </div>
    )
}