import AppInput from "@/components/appInput/AppInput";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const register = () => {
  return (
    <View>
      <Text>register</Text>
      <AppInput
        inputStyles={{ backgroundColor: "red" }}
        placeholder="username"
        onChangeText={() => {}}
      />
      <AppInput
        placeholder="email"
        onChangeText={() => {}}
        keyboardType="email-address"
      />
    </View>
  );
};

export default register;

const styles = StyleSheet.create({});
