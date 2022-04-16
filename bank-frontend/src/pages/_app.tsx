import '../../styles/globals.scss';
import type { AppProps } from 'next/app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
