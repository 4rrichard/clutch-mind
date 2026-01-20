import HeroSection from "./components/layout/HeroSection";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";

function App() {
    const DEMO_MODE = true;
    return (
        <>
            {!DEMO_MODE && <NavBar />}
            <HeroSection />
            <Footer />
        </>
    );
}

export default App;
