import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { faqData } from '@/constants/FAQData';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 bg-bg-dark transition-colors duration-300"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
        <h2 className="text-4xl text-center font-bold text-txt-primary mb-4">
          Frequently Asked <span className="text-txt-highlight">Questions</span>
        </h2>
        <p className="text-lg text-center text-txt-muted mb-12">
          Find answers to common questions about our laundry services
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-bg-light border border-txt-muted/10 rounded-lg overflow-hidden shadow-[var(--box-shadow)] transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-txt-highlight/5 transition-colors duration-200"
              >
                <span className="font-semibold text-txt-primary pr-4">
                  {faq.question}
                </span>
                <span className="flex-shrink-0 text-txt-highlight">
                  {openIndex === index ? (
                    <RemoveIcon className="text-2xl" />
                  ) : (
                    <AddIcon className="text-2xl" />
                  )}
                </span>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? 'max-h-[1000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-4 pt-2 text-txt-muted border-t border-txt-muted/10">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
