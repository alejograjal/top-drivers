import topDriveLogo from '../../../src/assets/logoTopDrivers.webp';

export const Footer = () => {
    const handleWhatsAppClick = () => {
        window.open('https://api.whatsapp.com/send?phone=50664705196&text=Vi%20la%20p%C3%A1gina%20web%20que%20dise%C3%B1aste%20y%20estoy%20interesado', '_blank'); // WhatsApp link (add specific number if needed)
    };

    return (
        <footer className="footer section">
            <div className="shape shape__big"></div>
            <div className="shape shape__small"></div>

            <div className="footer__container container grid">
                <div className="footer__content">
                    <a href="#" className="footer__logo">
                        <img
                            src={topDriveLogo}
                            alt="Top Drivers Logo"
                            style={{ width: '50px', height: '50px', marginRight: '8px' }}
                        />
                        Top Drivers
                    </a>
                    <p className="footer__description">
                        Decidete con nosotros
                        y comienza tu camino hoy. <br />
                        Somos tu mejor opción
                    </p>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Compañia</h3>
                    <ul className="footer__links">
                        <li>
                            <a href="#" className="footer__link">Acerca de</a>
                        </li>
                        <li>
                            <a href="#" className="footer__link">Conocenos</a>
                        </li>
                        <li>
                            <a href="#" className="footer__link">Historia</a>
                        </li>
                    </ul>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Información</h3>
                    <ul className="footer__links">
                        <li>
                            <a href="#" className="footer__link">Solicita las tarifas</a>
                        </li>
                        <li>
                            <a href="#" className="footer__link">Contactanos</a>
                        </li>
                    </ul>
                </div>

                <div className="footer__content">
                    <h3 className="footer__title">Siguenos</h3>
                    <ul className="footer__social">
                        <li>
                            <a href="https://www.facebook.com/people/Escuela-de-manejo-Top-Drivers/100041823714503/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                <i className="ri-facebook-fill"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/escuela_de_manejo_top_drivers_/" target="_blank" rel="noopener noreferrer" className="footer__social-link">
                                <i className="ri-instagram-line"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <span className="footer__copy" onClick={handleWhatsAppClick}>
                &#169; Bedimcode. Todos los derechos reservados - Top Drivers - Creada por Alejandro Grajal
            </span>
        </footer>
    );
};