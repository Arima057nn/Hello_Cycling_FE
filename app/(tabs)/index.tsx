import { StatusBar, StyleSheet, Text, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <Text style={styles.title}>Tab One</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "rgba(96,100,109, 1)",
  },
});
