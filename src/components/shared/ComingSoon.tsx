'use client';

'use client';

interface ComingSoonProps {
  title: string;
  description: string;
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

const ComingSoon = ({ title, description, features }: ComingSoonProps) => {
  const handleNotifyMe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    
    const mailtoUrl = `mailto:info@quantanex.com?subject=${encodeURIComponent(`${title} Launch Notification Request`)}&body=${encodeURIComponent(`Please notify me when ${title} is available.

Email: ${email}

Thank you!`)}`;
    window.open(mailtoUrl, '_blank');
    form.reset();
    alert(`Thank you! We'll notify you when ${title} is available.`);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              🚀 {title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              {description}
            </p>
            <form
              onSubmit={handleNotifyMe}
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email for updates"
                required
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Notify Me
              </button>
            </form>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;