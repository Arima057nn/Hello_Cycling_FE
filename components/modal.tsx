import {
  View,
  Text,
  Modal as RNModal,
  ModalProps,
  StyleSheet,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

type PROPS = ModalProps & {
  isOpen: boolean;
  title: string;
  description: string;
};

const Modal = ({ isOpen, title, description, children, ...rest }: PROPS) => {
  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...rest}
    >
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={styles.action}></View>
          <View style={styles.children}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 4,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  title: {
    marginBottom: 4,
    fontSize: 20,
    fontWeight: "600",
    color: Colors.lightGrey,
  },
  description: {
    marginBottom: 16,
    fontSize: 14,
    color: Colors.lightGrey,
  },
  action: {
    width: "100%",
    borderWidth: 0.3,
    borderColor: Colors.Gray100,
  },
  children: {
    width: "100%",
    paddingTop: 12,
    alignItems: "center",
  },
});
