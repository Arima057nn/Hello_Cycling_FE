import Colors from "@/constants/Colors";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { userApi } from "@/services/user-api";
import { UserLoggedInterface } from "@/interfaces/user";

export default function Menu() {
  const { userLogged } = useAuth();
  const [user, setUser] = useState<UserLoggedInterface | null | undefined>(
    userLogged
  );
  const [refresh, setRefresh] = useState(false);

  const pullMe = () => {
    setRefresh(true);
    setTimeout(() => {
      RefreshInfoUser();
      setRefresh(false);
    }, 500);
  };

  const RefreshInfoUser = async () => {
    const res = await userApi.getInfoUser();
    if (res?.status === 200) {
      setUser(res?.data);
    }
  };
  const handleLogout = async () => {
    try {
      await auth().signOut();
      router.replace("/register");
    } catch (error) {
      console.log("Error signing out", error);
    }
  };
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          height: "auto",
          maxHeight: 180,
        }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={() => pullMe()} />
        }
      >
        <View style={styles.accountUser}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <View style={styles.succesIcon}>
              <Ionicons name="person-circle" size={70} color={Colors.light} />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.accountName}>{user?.name}</Text>
            <Text style={styles.accountName}>{user?.balance} điểm</Text>
          </View>
          <View
            style={{
              marginVertical: 8,
              borderBottomWidth: 1,
              borderBottomColor: Colors.Gray300,
            }}
          ></View>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 14, fontFamily: "mon" }}>
                Thông tin chi tiết
              </Text>
              <Ionicons name="chevron-forward" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.actionContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.push("/myTicket")}
        >
          <View style={styles.actionItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="ticket-outline" size={20} />
              <Text
                style={{ marginLeft: 20, fontFamily: "mon-sb", fontSize: 14 }}
              >
                Vé của tôi
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.push("/history")}
        >
          <View style={styles.actionItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="timer-outline" size={20} />
              <Text
                style={{ marginLeft: 20, fontFamily: "mon-sb", fontSize: 14 }}
              >
                Lịch sử chuyến đi
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.push("/transaction")}
        >
          <View style={styles.actionItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="card-outline" size={20} />
              <Text
                style={{ marginLeft: 20, fontFamily: "mon-sb", fontSize: 14 }}
              >
                Lịch sử giao dịch
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.navigate("/(auth)/newUser")}
        >
          <View style={styles.actionItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="card-outline" size={20} />
              <Text
                style={{ marginLeft: 20, fontFamily: "mon-sb", fontSize: 14 }}
              >
                Profile
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => router.push("/payment")}
        >
          <View style={styles.actionItem}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="card-outline" size={20} />
              <Text
                style={{ marginLeft: 20, fontFamily: "mon-sb", fontSize: 14 }}
              >
                Nạp điểm
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity activeOpacity={0.5} onPress={handleLogout}>
          <View style={styles.logoutContainer}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "mon-sb",
                fontSize: 16,
                marginRight: 4,
              }}
            >
              Đăng xuất
            </Text>
            <Ionicons name="log-out-outline" size={20} />
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
    backgroundColor: Colors.secondary,
    paddingTop: 48,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  accountUser: {
    backgroundColor: Colors.light,
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    marginTop: 44,
  },
  accountName: {
    fontSize: 16,
    fontFamily: "mon-sb",
    marginTop: 28,
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
    paddingVertical: 16,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  succesIcon: {
    position: "absolute",
    top: -56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.purple,
    width: 80,
    height: 80,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: Colors.light,
  },
});
