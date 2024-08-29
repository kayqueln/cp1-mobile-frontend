import { PrimaryButton } from "@/src/components/shared/Button";
import StyledInput from "@/src/components/shared/Input";
import Colors from "@/src/constants/Colors";
import { useAuth } from "@/src/contexts/AuthContext";
import { useNavigation } from "expo-router";
import { Box, Text } from "native-base";
import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

export default function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { signIn } = useAuth();

  const [userData, setUserData] = useState({ username: "", password: "" });

  const handleInputChange = (name: string, value: string) => {
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <SafeAreaView
      style={{
        display: "flex",
        // justifyContent: "space-between",
        alignItems: "center",
        flex: 1,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Box style={styles.circleContainer}>
        <Text style={styles.title}>Autenticação</Text>
      </Box>

      <Box style={styles.content}>
        <Box style={styles.form}>
          <StyledInput
            onChangeText={(text) => handleInputChange("username", text)}
            value={userData.username}
            label="Usuário"
          />
          <StyledInput
            onChangeText={(text) => handleInputChange("password", text)}
            value={userData.password}
            label="Senha"
          />
        </Box>

        <Box style={styles.actions}>
          <PrimaryButton onPress={() => signIn(userData)}>
            Entrar na conta
          </PrimaryButton>
        </Box>
      </Box>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    width: 500,
    height: 200,
    marginTop: -100,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    color: "white",
    fontSize: 28,
    paddingTop: 100,
  },

  content: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },

  brand: {
    width: 200,
    marginTop: 90,
    resizeMode: "contain",
  },

  // form
  form: {
    marginTop: 40,
    paddingHorizontal: 24,
    width: "100%",
    display: "flex",
    gap: 40,
  },

  actions: {
    width: "100%",
    paddingHorizontal: 24,
    paddingVertical: 30,
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
  },
});
