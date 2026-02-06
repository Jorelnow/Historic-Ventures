import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Historic Ventures Editor',
  description: 'Turn rough notes into publish-ready outputs.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
