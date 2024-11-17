import './App.css'
import './styles/remixicon.css';
import { useEffect } from 'react';
import 'remixicon/fonts/remixicon.css'
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { BodyContent } from './components/Body/BodyContent';
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
      <Header />
      <BodyContent />
      <Footer />
      <FloatingButtons />
    </QueryClientProvider>
  );
}

export default App
