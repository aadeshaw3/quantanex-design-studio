const CompanyInfo = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-sm h-[400px] flex flex-col">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700 flex-grow">
              <p>
                QuantaNex was born from a simple yet powerful idea: to make power systems smarter—without making them fragile. Rooted in innovation, we bridge the gap between complex design and practical implementation.
              </p>
              <p>
                Our multidisciplinary team brings expertise across industries, crafting forward-thinking solutions that break down technical barriers and turn ambitious ideas into reality.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm h-[400px] flex flex-col">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Our Mission</h2>
            <div className="space-y-4 text-gray-700 flex-grow">
              <p>
                To electrify industries with intelligent, safe, and efficient systems: designed clearly, executed cleanly, and measured honestly.
              </p>
              <p>
                We believe in combining intelligence with reliability, safety with efficiency, and clarity with precision in every solution we deliver.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm h-[400px] flex flex-col">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Leadership</h2>
            <div className="space-y-4 text-gray-700 flex-grow">
              <p>
                Led by founder-director Aadesh, our team spans electrical design, BOQ estimation, AutoCAD, PLC/SCADA, and site execution.
              </p>
              <p>
                We invest in interns and emerging talent to build capability from the ground up, fostering innovation at every level.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm h-[400px] flex flex-col">
            <h2 className="text-3xl font-bold text-blue-600 mb-6">Milestones</h2>
            <div className="space-y-4 text-gray-700 flex-grow">
              <p>
                Our journey has been marked by significant achievements. We&apos;ve successfully delivered over 50 projects across domestic, commercial, and industrial segments. We launched a comprehensive internship program to mentor interdisciplinary talent, fostering innovation. We&apos;ve also expanded our services from contracting to cutting-edge automation and smart energy solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyInfo;