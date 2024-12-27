import GalleryVideoPlayer from '../../components/GalleryVideoPlayer/GalleryVideoPlayer';

export const Videos = () => {
    const videos = [
        {
          id: "1",
          url: 'https://escuelademanejotopdrivers.com:8080/TopDriversVideo-1.mp4',
        }
      ];

    return (
        <section className="section videos" id="videos">
            <h1 className="section_videos_title">
                Videos:
            </h1>

            <GalleryVideoPlayer videos={videos} />
        </section>
    )
}