import Colors from "@/constants/Colors";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
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
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.image}
    >
      <View style={styles.container}>
        <ScrollView
          style={{
            height: "auto",
            maxHeight: 280,
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
                <Image
                  style={{ width: 72, height: 72, borderRadius: 200 }}
                  source={require("@/assets/images/icon.png")}
                />
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.accountName}>{user?.name}</Text>
              <Text style={styles.accountName}>{user?.phone}</Text>
            </View>
            <View
              style={{
                marginVertical: 8,
                borderBottomWidth: 1,
                borderBottomColor: Colors.Gray300,
              }}
            ></View>
            <View
              style={{
                paddingVertical: 8,
                flexDirection: "row",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <View style={styles.point}>
                <Text style={styles.balance}>{user?.balance}</Text>
                <Text style={styles.balanceHeader}>Ví</Text>
              </View>
              <View style={styles.point}>
                <Text style={styles.balance}>{user?.point}</Text>
                <Text style={styles.balanceHeader}>Tích lũy</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => router.navigate("/profile")}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 6,
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
                <Text style={styles.actionTitle}>Vé của tôi</Text>
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
                <Text style={styles.actionTitle}>Lịch sử chuyến đi</Text>
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
                <Text style={styles.actionTitle}>Lịch sử giao dịch</Text>
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
                <Text style={styles.actionTitle}>Profile</Text>
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
                <Text style={styles.actionTitle}>Nạp điểm</Text>
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
                  fontSize: 16,
                  fontWeight: "500",
                  color: Colors.grey,
                }}
              >
                Đăng xuất
              </Text>
              <Ionicons name="log-out-outline" size={20} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 48,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
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
    elevation: 1,
  },
  accountName: {
    fontSize: 20,
    marginTop: 28,
    color: Colors.grey,
    fontWeight: "bold",
  },
  accountId: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  actionContainer: {
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    borderRadius: 4,
    elevation: 1,
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
    gap: 4,
    elevation: 1,
  },
  succesIcon: {
    position: "absolute",
    top: -56,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 200,
    borderWidth: 4,
    borderColor: Colors.light,
  },
  point: {
    borderRadius: 8,
    width: "40%",
    height: 64,
    backgroundColor: Colors.Gray100,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  balance: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "mon-sb",
  },
  balanceHeader: {
    fontSize: 12,
    color: Colors.Gray400,
    fontFamily: "mon-sb",
  },
  actionTitle: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "500",
    color: Colors.grey,
  },
});
