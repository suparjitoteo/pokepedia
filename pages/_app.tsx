import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Image from "next/image";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import Head from "next/head";

const queryClient = new QueryClient();
const theme = extendTheme({
  fonts: {
    heading: `poppins,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
    body: `poppins,-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Pokepedia</title>
          <meta name="description" content="Pokemon,Pikachu,Pokepedia" />
        </Head>
        <Box
          px={4}
          py={8}
          maxW={["100%", "680px", "800px"]}
          marginX="auto"
          position="relative"
          height="100%"
        >
          <Box
            position="absolute"
            zIndex="-1"
            top={0}
            right={0}
            overflow="hidden"
          >
            <Box transform="translate(80px,-80px)">
              <Image
                src="/images/pokeball-background.png"
                alt="Background image"
                width={300}
                height={300}
              />
            </Box>
          </Box>
          <Component {...pageProps} />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
