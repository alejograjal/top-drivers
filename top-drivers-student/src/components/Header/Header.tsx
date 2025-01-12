import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMetaInfo } from '../../assets/metaInfo';
import topDriveLogo from '../../../src/assets/logoTopDrivers.webp';

export const Header = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
        event.preventDefault();  // Prevent the default <Link> behavior (which doesn't scroll)
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

        setActiveSection(targetId);
        setMenuVisible(false);
    };

    const scrollHeader = () => {
        const header = document.getElementById('header');

        if (header) {
            if (window.scrollY >= 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHeader);
        return () => {
            window.removeEventListener('scroll', scrollHeader);
        };
    }, []);

    // Toggle the menu visibility
    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    // Close the menu when a link is clicked
    const closeMenu = () => {
        setMenuVisible(false);
    };

    const { title } = getMetaInfo(activeSection);

    return (
        <header className="header" id="header">
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <nav className="nav container">
                <Link to="/home" className="nav__logo" onClick={(e) => handleLinkClick(e, 'home')}>
                    <img
                        src={topDriveLogo}
                        alt="Top Drivers Logo"
                        style={{ width: '50px', height: '50px', marginRight: '8px' }}
                    />
                    TOP DRIVERS
                </Link>

                <div className={`nav__menu ${menuVisible ? 'show-menu' : ''}`} id="nav-menu">
                    <ul className="nav__list">
                        <li className="nav__item">
                            <Link to="/home" className="nav__link active-link" onClick={(e) => handleLinkClick(e, 'home')}>Inicio</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/courses" className="nav__link" onClick={(e) => handleLinkClick(e, 'courses')}>Cursos</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/gallery" className="nav__link" onClick={(e) => handleLinkClick(e, 'gallery')}>Galería</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/videos" className="nav__link" onClick={(e) => handleLinkClick(e, 'videos')}>Videos</Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/opinions" className="nav__link" onClick={(e) => handleLinkClick(e, 'opinions')}>Opiniones</Link>
                        </li>
                    </ul>

                    <div className="nav__close" id="nav-close" onClick={closeMenu}>
                        <i className="ri-close-line"></i>
                    </div>
                </div>

                <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
                    <i className="ri-menu-line"></i>
                </div>
            </nav>
        </header>
    );
};
