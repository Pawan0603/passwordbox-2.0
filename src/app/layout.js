// import { Geist, Geist_Mono } from "next/font/google";
import { Space_Mono, Roboto_Mono } from 'next/font/google';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from '@/context/AuthContext';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono', // Define a CSS variable name
});

// Initialize Roboto Mono
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-roboto-mono',
});

export const metadata = {
  title: "PasswordBox",
  description: "A secure and user-friendly password manager built by pawan thakre",
};

export default async function RootLayout({ children }) {

  const cookieStore = await cookies();
  const token = cookieStore.get('PasswordBoxToken')?.value;
  
  let userData = null;
  if (token) {
    try {
      // Server side par decrypt/decode karein
      userData = jwt.decode(token); 
    } catch (err) {
      console.error("Token decode error", err);
    }
  }

  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${robotoMono.variable} antialiased`}
      >
        <AuthProvider initialUser={userData}>
          <Toaster position="top-right" richColors />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
