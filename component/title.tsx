import { Text, TextProps } from "@chakra-ui/react";

export const Title = (props: TextProps) => {
  return (
    <Text
      fontSize={["3xl", "5xl"]}
      textTransform="capitalize"
      fontWeight="bold"
      {...props}
    />
  );
};
