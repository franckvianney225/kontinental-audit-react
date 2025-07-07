
import GallerySection from '../components/GallerySection';
import Header from '../components/Header';
import { ConsultingIntro } from '../components/ConsultingIntro';
import { ConsultingServices } from '../components/ConsultingServices';
import { ConsultingTestimonials } from '../components/ConsultingTestimonials';
import Hero from '../components/Hero';
import Intro from '../components/Intro';
import About from '../components/About';
// import Contact from '../components/Contact';
import Footer from '../components/Footer';
import TeamSection from '../components/TeamSection';
import ReferencesSection from '@/components/ReferencesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      {/* <ConsultingIntro /> */}
      {/* <ConsultingServices />
      <ConsultingTestimonials /> */}
      <Intro />
      <About />
      <TeamSection />
      <GallerySection />
      <ReferencesSection />
      <Footer />
    </div>
  );
};

export default Index;
