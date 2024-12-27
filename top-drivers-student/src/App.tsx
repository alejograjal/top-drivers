import './App.css'
import './styles/remixicon.css';
import { useEffect } from 'react';
import 'remixicon/fonts/remixicon.css'
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { BodyContent } from './components/Body/BodyContent';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FloatingButtons } from './components/FloatingButton/FloatingButtons';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const scrollActive = () => {
      const scrollY = window.pageYOffset;
      const sections = document.querySelectorAll('section');

      sections.forEach((current: Element) => {
        const sectionHeight = (current as HTMLElement).offsetHeight;
        const sectionTop = (current as HTMLElement).offsetTop - 58;
        const sectionId = (current as HTMLElement).getAttribute('id');

        if (sectionId) {
          const link = document.querySelector(`.nav__menu a[href*=${sectionId}]`);
          if (link) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
              (link as HTMLElement).classList.add('active-link');
            } else {
              (link as HTMLElement).classList.remove('active-link');
            }
          }
        }
      });
    };

    window.addEventListener('scroll', scrollActive);

    return () => {
      window.removeEventListener('scroll', scrollActive);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <Helmet>
          <title>Escuela de Manejo Top Drivers | Alajuela - Heredia</title>
          <meta
            name="description"
            content="Somos una escuela de manejo en alajuela y heredia muy completa. Curso de manejo integral. Te ayudamos con tu prueba de manejo(práctica)."
          />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Escuela de Manejo Top Drivers | Alajuela - Heredia" />
          <meta property="og:description" content="Somos una escuela de manejo en alajuela y heredia muy completa. Curso de manejo integral. Te ayudamos con tu prueba de manejo(práctica)." />
          <meta property="og:image" content="https://escuelademanejotopdrivers.com:8080/logoTopDrivers.webp" />
          <meta property="og:url" content="https://www.escuelademanejotopdrivers.com" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Top Drivers" />
        </Helmet>

        <Header />
        <BodyContent />
        <Footer />
        <FloatingButtons />
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App
