import {
  View,
  Modal as RNModal,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const IsLoadingModal = () => {
  return (
    <RNModal transparent animationType="fade" statusBarTranslucent>
      <View style={styles.wrapper}>
        <ActivityIndicator size={"large"} color={Colors.secondary} />
      </View>
    </RNModal>
  );
};

export default IsLoadingModal;
const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
