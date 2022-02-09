import { Input, InputProps } from "@chakra-ui/react";

export const SearchInput = ({
  placeholder = "Search Pikachu...",
  ...props
}: InputProps) => {
  return <Input placeholder={placeholder} background="white" {...props} />;
};
