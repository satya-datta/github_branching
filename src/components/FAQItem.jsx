import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-inset"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
            {question}
          </h3>
          <ChevronDown 
            className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      
      {isOpen && (
        <div className="px-6 pb-4 bg-white dark:bg-gray-800">
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {answer}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQItem;