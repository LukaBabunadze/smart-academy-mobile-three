import AppInput from "@/components/appInput/AppInput";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const router = useRouter();
  const [username, setUsername] = useState<string>("johnd");
  const [password, setPassword] = useState<string>("m38rmF$");

  const handleSubmit = async () => {
    if (username.length === 0 || password.length === 0) return;

    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    if (result?.token) {
      router.replace("/(tabs)");
    }
  };
  return (
    <View>
      <Text>Log In</Text>
      <AppInput
        placeholder="username"
        value="johnd"
        onChangeText={setUsername}
      />
      <AppInput
        placeholder="password"
        value="m38rmF$"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        // disabled={username.length === 0 || password.length === 0}
        onPress={handleSubmit}
      >
        <Text>Submit</Text>
      </TouchableOpacity>
      <Link href={"/(auth)/register"}>Go To Register</Link>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({});
