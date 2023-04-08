import { type AppType } from "next/app";

import { ClerkProvider } from "@clerk/nextjs";
import { api } from "~/utils/api";
import locals from "~/utils/locals";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider localization={locals} {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
