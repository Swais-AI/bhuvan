import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "SWAIS Faculty — Teacher Portal",
  description:
    "EdTech platform for teachers to manage Class 8 Social Studies notes, assessments, and student engagement at SWAIS International Academy.",
  keywords: ["EdTech", "Teacher Portal", "Social Studies", "Class 8", "SWAIS"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
