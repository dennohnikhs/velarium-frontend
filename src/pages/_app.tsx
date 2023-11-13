import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NotistackProvider from "components/NotistackProvider";
import { CollapseDrawerProvider } from "contexts/CollapseDrawerContext";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "store";
import "styles/styles.css";
import { ThemeProvider } from "theme";
import createEmotionCache from "theme/createEmotionCache";
import GlobalStyles from "theme/GlobalStyles";
import AuthInterceptors from "./components/AuthInterceptors";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type Props = MyAppProps & {
  Component: NextPageWithLayout;
};

function MyApp(props: Props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <NotistackProvider>
          <CacheProvider value={emotionCache}>
            <Head>
              <meta
                name="viewport"
                content="initial-scale=1, width=device-width"
              />
            </Head>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ThemeProvider>
                {/* Mount auth interceptors */}
                <AuthInterceptors />
                <CollapseDrawerProvider>
                  <CssBaseline />
                  <GlobalStyles />
                  {getLayout(<Component {...pageProps} />)}
                </CollapseDrawerProvider>
              </ThemeProvider>
            </LocalizationProvider>
          </CacheProvider>
        </NotistackProvider>
      </Provider>
    </PersistGate>
  );
}

export default appWithTranslation(MyApp);
