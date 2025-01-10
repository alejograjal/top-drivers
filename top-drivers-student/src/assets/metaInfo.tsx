export const getMetaInfo = (activeSection: string) => {
    switch (activeSection) {
        case 'home':
            return {
                title: 'Top Drivers - Inicio | Los Mejores Cursos de Manejo',
                description: 'Comienza tu viaje con Top Drivers. Explora nuestra página de inicio para encontrar los mejores cursos de manejo y consejos para el éxito.',
            };
        case 'courses':
            return {
                title: 'Top Drivers - Cursos | Aprende a Manejar Como un Profesional',
                description: 'Descubre nuestra amplia selección de cursos de manejo y comienza hoy mismo con instructores profesionales. ¡Cursos para todos los niveles!',
            };
        case 'gallery':
            return {
                title: 'Top Drivers - Galería | Conoce a Nuestros Conductores Exitosos',
                description: 'Explora nuestra galería de conductores exitosos y sus historias. Inspírate con nuestros estudiantes destacados.',
            };
        case 'videos':
            return {
                title: 'Top Drivers - Videos | Aprende a Manejar con Nuestros Videos',
                description: 'Mira videos introductorios sobre cómo manejar y adéntrate en todo lo relacionado con aprender a manejar con nosotros.',
            };
        case 'opinions':
            return {
                title: 'Top Drivers - Opiniones | Escucha a Nuestros Estudiantes',
                description: 'Lee opiniones y reseñas reales de nuestros estudiantes sobre sus experiencias con los cursos de Top Drivers.',
            };
        default:
            return {
                title: 'Top Drivers - Los Mejores Cursos de Manejo',
                description: 'Descubre los mejores cursos de manejo en Top Drivers y comienza tu viaje de conducción hoy mismo.',
            };
    }
};