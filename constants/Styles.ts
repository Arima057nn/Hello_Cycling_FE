import Colors from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const defaultStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  inputField: {
    height: 44,
    borderWidth: 1,
    borderColor: "#ABABAB",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
  },
  btn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: Colors.grey,
    fontSize: 12,
    fontFamily: "mon-b",
  },
  btnIcon: {
    position: "absolute",
    left: 16,
  },
  footer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.Gray100,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderTopColor: Colors.Gray300,
    borderTopWidth: 1,
  },
  textOK: {
    fontWeight: "500",
    fontSize: 16,
    color: Colors.blue,
  },
  containerTextOK: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
});
