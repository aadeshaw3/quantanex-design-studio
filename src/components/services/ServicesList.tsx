'use client';

const services = [
  {
    icon: '🔧',
    title: 'Custom PCB Design',
    description: 'Professional printed circuit board design from schematic to production-ready files. Multi-layer designs, high-speed digital, and analog circuits.',
  },
  {
    icon: '⚡',
    title: 'Circuit Analysis',
    description: 'Comprehensive circuit analysis and simulation services. Performance optimization, signal integrity analysis, and troubleshooting.',
  },
  {
    icon: '🔬',
    title: 'Prototyping',
    description: 'Rapid prototyping services from breadboard to professional prototypes. Testing, validation, and iterative design improvements.',
  },
  {
    icon: '📱',
    title: 'Embedded Systems',
    description: 'Complete embedded system development including firmware, hardware integration, and IoT connectivity solutions.',
  },
  {
    icon: '🎛️',
    title: 'Control Systems',
    description: 'Industrial control system design, automation solutions, and process control implementations for various applications.',
  },
  {
    icon: '🔍',
    title: 'Consulting',
    description: 'Technical consulting services for electronic design challenges, feasibility studies, and technology selection guidance.',
  },
];

const ServicesList = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <span className="text-4xl mb-4 block">{service.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {service.description}
              </p>
              <a
                href={`mailto:info@quantanex.com?subject=Inquiry about ${service.title}`}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-block"
              >
                Learn More →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesList;