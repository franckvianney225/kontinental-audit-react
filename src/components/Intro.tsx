
import { CheckCircle, Users, FileText, Shield, Calculator, GraduationCap } from 'lucide-react';

const Intro = () => {
  const services = [
    {
      icon: <FileText className="w-8 h-8 text-[#D4AF37]" />,
      title: "Financial & accounting audit"
    },
    {
      icon: <Users className="w-8 h-8 text-[#D4AF37]" />,
      title: "HR & IT system audit"
    },
    {
      icon: <Shield className="w-8 h-8 text-[#D4AF37]" />,
      title: "Organizational audit"
    },
    {
      icon: <Calculator className="w-8 h-8 text-[#D4AF37]" />,
      title: "Tax & legal consulting"
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-[#D4AF37]" />,
      title: "Training"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1C39] mb-6">
            10+ years of experience serving businesses
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            At KL KONTINENTAL, we combine deep industry expertise with innovative approaches to deliver exceptional audit, consulting, and training services. Our commitment to excellence has made us a trusted partner for businesses across Côte d'Ivoire, helping them navigate complex regulatory environments and achieve sustainable growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-shrink-0">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-[#0B1C39]">
                  {service.title}
                </h3>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Professional Excellence</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Intro;
