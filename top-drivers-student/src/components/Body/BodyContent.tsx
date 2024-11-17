import { useEffect } from "react";
import scrollReveal from "scrollreveal";
import { Home } from "../../pages/Home/Home";
import { Courses } from "../../pages/Courses/Courses";

export const BodyContent = () => {

    useEffect(() => {
        const sr = scrollReveal({
            origin: 'top',
            distance: '60px',
            duration: 2500,
            delay: 400,
        });

        sr.reveal(`.home__title, .popular__container, .features__img, .featured__filters`)
        sr.reveal(`.home__subtitle`, { delay: 600 });
        sr.reveal(`.home__elec`, { delay: 600 });
        sr.reveal(`.home__img`, { delay: 800 });
        sr.reveal(`.home__car-data`, { delay: 900, interval: 100, origin: 'bottom' });
        sr.reveal(`.home__button`, { delay: 1000, origin: 'bottom' });
        sr.reveal(`.section_course_title`, { delay: 600 })
        sr.reveal(`.courses`, { delay: 600 })
        sr.reveal(`.about__group, .offer__data`, { origin: 'left' });
        sr.reveal(`.about__data, .offer__img`, { origin: 'right' });
        sr.reveal(`.features__map`, { delay: 600, origin: 'bottom' });
        sr.reveal(`.features__card`, { interval: 300 });
        sr.reveal(`.featured__card, .logos__content, .footer__content`, { interval: 100 });

    }, []);

    return (
        <>
            <Home />
            <Courses />
        </>
    )
}