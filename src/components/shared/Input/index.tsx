import React from "react";
import { Box, IInputProps, Input, Text } from "native-base";
import { StyleSheet } from "react-native";
import Colors from "@/src/constants/Colors";

interface StyledInputProps extends IInputProps {
  label?: string;
}

export default function StyledInput({ label, ...props }: StyledInputProps) {
  return (
    <Box style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <Input
        fontSize={18}
        _focus={{ backgroundColor: "white", borderColor: Colors.primary }}
        borderRadius={40}
        {...props}
      />
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    width: "100%",
  },

  label: {
    fontSize: 18,
  },

  input: {
    borderRadius: 12,
  },
});
