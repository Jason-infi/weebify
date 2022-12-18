import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import ThemeContextWrapper from "../utilities/ThemeContextWrapper";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <ThemeContextWrapper>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ThemeContextWrapper>
    </SessionProvider>
  );
}

export default MyApp;
