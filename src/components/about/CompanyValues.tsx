const values = [
  {
    icon: '💡',
    title: 'Innovation',
    description: 'Constantly pushing the boundaries of electronic design.',
  },
  {
    icon: '🤝',
    title: 'Collaboration',
    description: 'Working closely with clients to understand their vision.',
  },
  {
    icon: '🎯',
    title: 'Excellence',
    description: 'Delivering the highest quality in every project.',
  },
  {
    icon: '🌱',
    title: 'Sustainability',
    description: 'Designing with environmental responsibility in mind.',
  },
];

const CompanyValues = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-4">
          Our Values
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Our values define every aspect of our work. We believe in safety as a system, not a checklist. We prioritize clarity over jargon in all communications. We trust measurement over assumptions, ensuring data-driven decisions. Above all, we build partnership over transactions, creating lasting relationships with our clients.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div
              key={value.title}
              className="text-center p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1 border border-gray-100"
            >
              <span className="text-4xl mb-4 block">{value.icon}</span>
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                {value.title}
              </h3>
              <p className="text-gray-700">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;