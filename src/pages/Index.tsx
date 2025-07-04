
import Header from '../components/Header';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Intro />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
