import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { useGetImages } from "hooks/api/useGetImages";
import 'react-image-gallery/styles/css/image-gallery.css';
import { ErrorProcess } from "components/Error/ErrorProcess";
import { CircularLoadingProgress } from "components/LoadingProgress/CircularLoadingProcess";

interface ImageItem {
    original: string;
    thumbnail: string;
}

export const Gallery = () => {
    const { data, isLoading, isError } = useGetImages();
    const [images, setImages] = useState<ImageItem[]>([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            const imageItems = data
                .filter((image) => image.url)
                .map((image) => ({
                    original: image.url ?? "",
                    thumbnail: image.url ?? "",
                }));
            setImages(imageItems);
        }
    }, [data]);

    if (isLoading) {
        return <CircularLoadingProgress />
    }

    if (isError) {
        return <ErrorProcess />
    }

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