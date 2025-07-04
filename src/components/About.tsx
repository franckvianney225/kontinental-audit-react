
import { Award, MapPin } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C39] mb-6">
              About KL KONTINENTAL
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Founded with a vision to provide exceptional audit and consulting services, KL KONTINENTAL has established itself as a leading firm in Côte d'Ivoire. We pride ourselves on delivering comprehensive solutions that help businesses thrive in today's competitive landscape.
            </p>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[#0B1C39] mb-4">Our Managing Partners</h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-[#0B1C39] mb-2">YAO Alphonse</h4>
                  <p className="text-gray-600">Managing Partner with extensive experience in financial auditing and regulatory compliance.</p>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="text-xl font-semibold text-[#0B1C39] mb-2">SEHR Jean-Louis</h4>
                  <p className="text-gray-600">Managing Partner specializing in tax consulting and organizational development.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2 text-[#D4AF37]" />
              <span>Abidjan Marcory, 25 BP 381 Abidjan 25</span>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-[#0B1C39] to-[#1a2f4a] rounded-2xl p-8 text-white">
              <div className="mb-6">
                <Award className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Decade of proven expertise in audit and consulting</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Comprehensive understanding of local regulations</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Personalized approach to each client's needs</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Commitment to excellence and professional integrity</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
