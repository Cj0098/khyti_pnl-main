import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeContextProvider } from "./Context/theme";
import { TokenContextProvider } from "./Context/token";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "داشبورد مدیریت",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <TokenContextProvider>
      <html lang="en">
        {/* Toast Container */}

        <body>
          <div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {children}
          </div>
        </body>
      </html>
    </TokenContextProvider>
  );
}
