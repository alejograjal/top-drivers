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
                            Escuela de Manejo <span className="top">TOP</span> <span className="drivers">DRIV</span><span className="ers">ERS</span>
                        </h1>

                        <h2 className="home__subtitle">
                            Expertos en formación de conductores
                        </h2>

                        <AnimatedHomeCar />
                    </div>
                </div>
            </section>
        </main>
    );
};