import { AnimatedHomeCar } from "../../components/Animated/AnimatedHomeCar";

export const Home = () => {
    return (
        <main className="main">
            <section className="section home" id="home">
                <div className="shape shape__big"></div>
                <div className="shape shape__small"></div>
                
                <div className="home__container container grid">
                    <div className="home__data">
                        <h1 className="home__title">
                            Escuela de Manejo Top Drivers
                        </h1>

                        <h2 className="home__subtitle">
                            Dedicación exclusiva y atención personalizada
                        </h2>

                        <h3 className="home__elec">
                            Toyota Yaris de 3ra generación
                        </h3>

                        <AnimatedHomeCar />
                    </div>
                </div>
            </section>
        </main>
    );
};