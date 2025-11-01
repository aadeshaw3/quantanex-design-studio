import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-800 text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Engineering Infrastructure That Thinks
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8 lg:mb-12">QuantaNex specializes in electrical contracting, industrial automation, and smart infrastructure solutions. We combine precision engineering, uncompromising safety standards, and data-driven performance to deliver measurable outcomes that drive progress and efficiency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/services"
            className="bg-white text-blue-600 hover:bg-blue-50 transform hover:-translate-y-0.5 transition-all py-3 px-8 rounded-lg font-semibold text-lg shadow-lg"
          >
            Our Services
          </Link>
          <Link
            href="/about"
            className="bg-transparent border-2 border-white text-white hover:bg-white/10 transform hover:-translate-y-0.5 transition-all py-3 px-8 rounded-lg font-semibold text-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;