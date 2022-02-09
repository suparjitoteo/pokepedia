import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Image from "next/image";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Box
          px={4}
          py={8}
          maxW={["100%", "680px"]}
          marginX="auto"
          position="relative"
          overflow="hidden"
          height="100%"
        >
          <Box position="absolute" zIndex="-1" top="-80px" right="-80px">
            <Image
              src="/images/pokeball-background.png"
              alt="Background image"
              width={300}
              height={300}
            />
          </Box>
          <Component {...pageProps} />
        </Box>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
