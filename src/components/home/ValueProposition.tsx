const values = [
  {
    icon: '🔬',
    title: 'Innovation First',
    description: 'Cutting-edge solutions using the latest technology and methodologies.',
  },
  {
    icon: '⚡',
    title: 'Fast Delivery',
    description: 'Quick turnaround times without compromising on quality.',
  },
  {
    icon: '🎯',
    title: 'Custom Solutions',
    description: 'Tailored designs that meet your specific requirements.',
  },
  {
    icon: '🛡️',
    title: 'Quality Assured',
    description: 'Rigorous testing and quality control processes.',
  },
];

const ValueProposition = () => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose QuantaNex?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <span className="text-4xl mb-4 block">{value.icon}</span>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;