import type { FAQItem } from '@/types/FAQTypes';

export const faqData: FAQItem[] = [
  {
    question: 'What items do we NOT accept?',
    answer: (
      <div>
        <p className="mb-4">
          To our valued customers, our laundry shop doesn't accept the
          following:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
          <ul className="list-disc list-inside space-y-1">
            <li>Gown</li>
            <li>Barong</li>
            <li>Coat</li>
            <li>Curtain with plastic ring</li>
            <li>Pillow</li>
            <li>Rags (Basahan)</li>
            <li>Stuff toys</li>
          </ul>
          <ul className="list-disc list-inside space-y-1">
            <li>Formal dress with lace</li>
            <li>Beads</li>
            <li>Shoes</li>
            <li>Bag</li>
            <li>Clothes with animal fur</li>
            <li>Belt</li>
            <li>Cap/Hat</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    question: 'What are your operating hours?',
    answer:
      'We are open Monday through Friday from 9am to 6pm, and Saturday through Sunday from 9am to 2pm. We also offer 24/7 pickup and delivery service for your convenience.',
  },
  {
    question: 'How does the pickup and delivery service work?',
    answer:
      "Simply schedule a pickup through our app or website. Our driver will collect your laundry at your specified time, and we'll deliver it back clean and folded within 24-48 hours.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, cash, and digital payment methods like GCash and PayMaya.',
  },
  {
    question: 'Do you offer same-day service?',
    answer:
      'Yes! Same-day service is available for orders placed before 10am. Additional charges may apply for express service.',
  },
  {
    question: 'Can I track my order?',
    answer:
      "Absolutely! You can track your order status in real-time through our mobile app or website. We'll also send you notifications at each stage of the process.",
  },
  {
    question: 'What happens if my clothes are damaged?',
    answer:
      'While we take utmost care, if any damage occurs due to our handling, we have a comprehensive insurance policy that covers repair or replacement costs. Please report any issues within 24 hours of delivery.',
  },
];
