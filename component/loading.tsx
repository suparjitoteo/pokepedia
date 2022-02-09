import { Flex, FlexProps, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useEffect, useState } from "react";

const Loading = ({
  w = "100%",
  text = "Loading",
  ...props
}: FlexProps & { text?: string }) => {
  const [loadingText, setLoadingText] = useState(text);

  useEffect(() => {
    let id: any = null;

    if (text) {
      id = window.setInterval(() => {
        setLoadingText((currentText) =>
          currentText === `${text}...` ? text : `${currentText}.`
        );
      }, 300);
    }

    return () => {
      if (id) {
        window.clearInterval(id);
      }
    };
  }, [text]);

  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      w={w}
      {...props}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="lg"
      />
      <Text mt={4} fontSize="lg" fontWeight="semibold">
        {loadingText}
      </Text>
    </Flex>
  );
};

export default Loading;
