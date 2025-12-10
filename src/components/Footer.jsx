import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Roadmap', href: '/roadmap' }
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Careers', href: '/careers' }
    ],
    Resources: [
      { name: 'Help Center', href: '/help' },
      { name: 'Blog', href: '/blog' },
      { name: 'Community', href: '/community' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'LinkedIn', href: '#', icon: Linkedin }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo and description */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Zap className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">FluentPulse</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              Your 10-minute daily practice partner for mastering English through real conversations.
            </p>
            
            {/* Language switcher placeholder */}
            <div className="mb-6">
              <select className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option>🇺🇸 English</option>
                <option>🇪🇸 Español</option>
                <option>🇫🇷 Français</option>
              </select>
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2024 FluentPulse. All rights reserved.
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4 md:mt-0">
              Made with ❤️ for language learners worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;