import type { ReactNode } from 'react';

export interface FAQItem {
  question: string;
  answer: string | ReactNode;
}
