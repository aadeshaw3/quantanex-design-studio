'use client';

const jobListings = [
  {
    title: 'Electrical Design Intern',
    type: 'Internship',
    location: 'Chhatrapati Sambhaji Nagar, MH',
    postedAt: '2 days ago',
    description: 'Assist with SLDs, load calculations, and BOQs using AutoCAD.',
    skills: ['AutoCAD', 'BOQ', 'SLD']
  },
  {
    title: 'Site Engineer Trainee',
    type: 'Internship',
    location: 'On-site across Maharashtra',
    postedAt: '1 week ago',
    description: 'Support installation, testing, and commissioning with QA checklists.',
    skills: ['HT/LT', 'Testing', 'Safety']
  },
  {
    title: 'Automation Engineer',
    type: 'Full-time',
    location: 'Hybrid, Maharashtra',
    postedAt: '3 days ago',
    description: 'PLC/SCADA development, VFDs, sensors, and panel integration.',
    skills: ['PLC', 'SCADA', 'VFD']
  }
];

const JobListings = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {jobListings.map((job) => (
            <div
              key={job.title}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-100 p-6"
            >
              <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                <h3 className="text-2xl font-semibold text-blue-600">
                  {job.title}
                </h3>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {job.type}
                </span>
              </div>

              <div className="flex flex-wrap gap-6 text-gray-700 text-sm mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 p-1.5 rounded-full">📍</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 p-1.5 rounded-full">⏰</span>
                  <span>Posted {job.postedAt}</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4 leading-relaxed">
                {job.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={`mailto:careers@quantanex.com?subject=${encodeURIComponent(`Application for ${job.title} Position`)}&body=${encodeURIComponent(`Dear QuantaNex Team,

I am interested in applying for the ${job.title} position. Please find my resume attached.

Best regards,
[Your Name]`)}`}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all shadow-sm hover:shadow-md"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobListings;