import { OpinionsLoader } from "./OpinionsLoader";

export const Opinions = () => {
    return (
        <section className="section opinions" id="opinions">
            <div className="opinions__container container">
                <div className="opinions_section_head_title">
                    <h1 className="section_opinions_title">
                        Nuestros alumnos nos recomiendan:
                    </h1>
                </div>

                <OpinionsLoader />
            </div>
        </section>
    )
};
