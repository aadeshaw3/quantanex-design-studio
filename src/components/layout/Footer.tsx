'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'QuantaNex',
      content: [
        { text: 'Custom electronics solutions for the modern world. Innovation, quality, and excellence in every project.' },
        { text: '📧 adesh@quantanex.co.in' },
        { text: '📞 +91 83299 41680' },
      ],
    },
    {
      title: 'Services',
      links: [
        { label: 'PCB Design', href: '/services' },
        { label: 'Circuit Analysis', href: '/services' },
        { label: 'Prototyping', href: '/services' },
        { label: 'Embedded Systems', href: '/services' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { label: 'LinkedIn', href: '#' },
        { label: 'Twitter', href: '#' },
        { label: 'GitHub', href: '#' },
        { label: 'Newsletter', href: '#' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-lg font-semibold text-blue-500">{section.title}</h4>
              {section.content ? (
                <div className="space-y-2">
                  {section.content.map((item, index) => (
                    <p key={index} className="text-gray-300 text-sm">
                      {item.text}
                    </p>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {section.links!.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-300 hover:text-blue-500 text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} QuantaNex. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;