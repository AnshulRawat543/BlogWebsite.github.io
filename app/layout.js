import { Inter } from "next/font/google";
import "./globals.css";

import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hello blogs",
  description: "Come read and create your own content",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
     
      <body className={inter.className}>{children}</body>
      <ToastContainer/>
     
    </html>
  );
}
