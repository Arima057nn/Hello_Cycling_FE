import Colors from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Menu() {
  return (
    <View style={styles.container}>
      <View style={styles.accountUser}>
        <Text style={styles.accountId}>User ID : 123456</Text>
        <Text style={styles.accountName}>Pham Tien Dung</Text>
      </View>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.push("/history")}
        >
          <View style={styles.actionItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="timer-outline" size={24} />
              <Text
                style={{ marginLeft: 20, fontFamily: "mon-sb", fontSize: 14 }}
              >
                History
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5}>
          <View style={styles.actionItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="card-outline" size={24} />
              <Text
                style={{ marginLeft: 20, fontFamily: "mon-sb", fontSize: 14 }}
              >
                Payment
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} />
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.push("/login")}
        >
          <View style={styles.logoutContainer}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "mon-sb",
                fontSize: 16,
                marginRight: 4,
              }}
            >
              Logout
            </Text>
            <Ionicons name="log-out-outline" size={24} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.Gray100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  accountUser: {
    backgroundColor: Colors.light,
    padding: 16,
    borderRadius: 2,
    marginVertical: 16,
  },
  accountName: {
    fontSize: 16,
    fontFamily: "mon-sb",
    marginTop: 8,
  },
  accountId: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  actionContainer: {
    backgroundColor: Colors.light,
    paddingHorizontal: 8,

    borderRadius: 4,
  },
  actionItem: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
  },
  logoutContainer: {
    backgroundColor: Colors.light,
    padding: 8,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
