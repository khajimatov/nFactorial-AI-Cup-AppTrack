import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
