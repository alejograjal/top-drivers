import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import 'react-image-gallery/styles/css/image-gallery.css';

const BASE_URL = "https://escuelademanejotopdrivers.com:8080";

interface ImageItem {
    original: string;
    thumbnail: string;
}

export const Gallery = () => {
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
        <section className="section gallery" id="gallery">
            <h1 className="section_gallery_title">
                <div className="icon-center remix-icon-fs-32">
                    Aquí <i className="ri-arrow-down-fill yellow"></i> algunos de nuestros alumnos que ganaron su licencia
                </div>
            </h1>

            <ImageGallery items={images} />
        </section>
    )
}