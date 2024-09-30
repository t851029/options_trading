import "./globals.css";
import { Inter } from 'next/font/google';
import { AuthProvider } from '../lib/contexts/AuthContext';
import { DeepgramProvider } from '../lib/contexts/DeepgramContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Voice Notes App',
  description: 'A voice-based note-taking app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <DeepgramProvider>{children}</DeepgramProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
