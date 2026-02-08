import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'The Property Narrative',
  description: 'Luxury historical property reports powered by research + AI narrative craft.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
