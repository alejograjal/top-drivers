export const getMetaInfo = (activeSection: string) => {
    switch (activeSection) {
        case 'home':
            return {
                title: 'Top Drivers - Home | Best Driver Courses',
                description: 'Start your journey with Top Drivers. Explore our home page for the best driving courses and tips for success.',
            };
        case 'courses':
            return {
                title: 'Top Drivers - Courses | Learn How to Drive Like a Pro',
                description: 'Browse our wide selection of driver courses and get started today with professional instructors. Courses for all levels!',
            };
        case 'gallery':
            return {
                title: 'Top Drivers - Gallery | See Our Successful Drivers',
                description: 'Explore our gallery of successful drivers and their stories. Get inspired by our top-performing students.',
            };
        case 'opinions':
            return {
                title: 'Top Drivers - Opinions | Hear from Our Students',
                description: 'Read real opinions and reviews from our students about their experiences with Top Drivers courses.',
            };
        default:
            return {
                title: 'Top Drivers - Best Driving Courses',
                description: 'Discover the best driving courses at Top Drivers and start your driving journey today.',
            };
    }
};