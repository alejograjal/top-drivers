import '../../styles/animated-intro-car.css';
import CarIntro from '../../assets/YarisCar.png'// Create this CSS file for styles

export const AnimatedHomeCar = () => {
    return (
        <div className="animation-container">
            <img src={CarIntro} alt="Animated" className="animated-car" />
        </div>
    );
};
