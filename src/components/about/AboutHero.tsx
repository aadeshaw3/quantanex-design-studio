import React from 'react';

const AboutHero = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_100%,rgba(0,0,0,0.15),transparent)] pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight">
            Engineering Smarter Power,<br className="hidden md:block" /> Without the Complexity
          </h1>
          <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-3xl mx-auto">
            We&apos;re on a mission to democratize access to custom electronic solutions by providing innovative, high-quality designs and services that empower individuals and businesses to bring their ideas to life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;