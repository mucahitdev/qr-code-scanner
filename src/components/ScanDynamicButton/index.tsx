import { View, Text, Linking } from "react-native";
import React, { useState, useEffect } from "react";
import { Button } from "native-base";

export const ScanDynamicButton = ({ buttonData }: any) => {
  const { type, data } = buttonData;

  const [buttonType, setButtonType] = useState<string>("");
  const [buttonText, setButtonText] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const isURL =
    data.startsWith("http://") ||
    data.startsWith("https://") ||
    data.startsWith("www.") ||
    data.startsWith("exp://");

  const isEmail = data.includes("@");
  const isPhone = data.startsWith("tel:");
  const isSMS = data.startsWith("sms:");
  const isGeo = data.startsWith("geo:");

  const isText = !isURL && !isEmail && !isPhone && !isSMS && !isGeo;

  useEffect(() => {
    setIsActive(true);
    if (isURL) {
      setButtonType("url");
      setButtonText("Go");
    } else if (isEmail) {
      setButtonType("email");
      setButtonText("Send");
    } else if (isPhone) {
      setButtonType("phone");
      setButtonText("Call");
    } else if (isSMS) {
      setButtonType("sms");
      setButtonText("Send");
    } else if (isGeo) {
      setButtonType("geo");
      setButtonText("Go");
    } else if (isText) {
      setIsActive(false);
    }
  }, []);

  const handlePress = () => {
    switch (buttonType) {
      case "url":
        return Linking.openURL(data);
      case "email":
        return Linking.openURL(data);
      case "phone":
        return Linking.openURL(data);
      case "sms":
        return Linking.openURL(data);
      case "geo":
        return Linking.openURL(data);
      default:
    }
  };

  return (
    <Button size="md" variant="ghost" onPress={() => handlePress()}>
      <Text>{buttonText}</Text>
    </Button>
  );
};
