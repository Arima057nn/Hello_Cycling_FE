import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { TicketInterface } from "@/interfaces/ticket";
import { Ionicons } from "@expo/vector-icons";

type PROPS = {
  options: TicketInterface[];
  checkedValue: string;
  onChange: (value: string) => void;
};

const RadioTicket = ({ options, onChange, checkedValue }: PROPS) => {
  return (
    <View style={styles.container}>
      {options.map((option: TicketInterface, index: number) => {
        let active = checkedValue == option._id;
        return (
          <TouchableOpacity
            onPress={() => onChange(option._id)}
            key={option._id}
            activeOpacity={0.5}
            style={active ? [styles.radio, styles.activeRadio] : styles.radio}
          >
            <Ionicons
              name={active ? "radio-button-on" : "radio-button-off"}
              size={20}
              style={active ? styles.iconActive : styles.icon}
            />
            <Text style={styles.text}>{option.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioTicket;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  radio: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Gray300,
    backgroundColor: Colors.Gray100,
  },
  activeRadio: {
    backgroundColor: Colors.yellow,
    borderColor: Colors.secondary,
  },
  text: {
    color: Colors.Gray600,
    marginLeft: 12,
    fontSize: 16,
  },
  icon: {
    color: Colors.Gray600,
  },
  iconActive: {
    color: Colors.secondary,
  },
  activeText: {
    color: Colors.secondary,
  },
});
