import { Fab } from '@mui/material';
import { WhatsApp, Facebook, Instagram } from '@mui/icons-material';

export const FloatingButtons = () => {
  const handleWhatsAppClick = () => {
    window.open('https://api.whatsapp.com/send?phone=50683797829', '_blank'); // WhatsApp link (add specific number if needed)
  };

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/people/Escuela-de-manejo-Top-Drivers/100041823714503/', '_blank'); // Facebook link
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/escuela_de_manejo_top_drivers_/', '_blank'); // Instagram link
  };


  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 16,
      }}
    >
      <Fab
        color="primary"
        aria-label="whatsapp"
        onClick={handleWhatsAppClick}
        sx={{
          backgroundColor: '#25D366',
          '&:hover': {
            backgroundColor: '#128C7E',
          },
        }}
      >
        <WhatsApp />
      </Fab>

      <Fab
        color="primary"
        aria-label="facebook"
        onClick={handleFacebookClick}
        sx={{
          backgroundColor: '#1877F2',
          '&:hover': {
            backgroundColor: '#1568C7',
          },
        }}
      >
        <Facebook />
      </Fab>

      <Fab
        color="primary"
        aria-label="instagram"
        onClick={handleInstagramClick}
        sx={{
          background: 'linear-gradient(135deg, #F58529, #D83B01, #8A3AB9)',
          '&:hover': {
            background: 'linear-gradient(135deg, #F58529, #D83B01, #8A3AB9)',
          },
        }}
      >
        <Instagram />
      </Fab>
    </div>
  );
};