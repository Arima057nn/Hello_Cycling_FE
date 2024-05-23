import Colors from "@/constants/Colors";
import { TRANSACTION_STATUS, TRANSACTION_TYPE } from "@/constants/Status";
import { TransactionInterface } from "@/interfaces/transaction";
import { transactionApi } from "@/services/transaction-api";
import { convertDate } from "@/utils/convertDate";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated from "react-native-reanimated";

const Transaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transations, setTransations] = useState<TransactionInterface[]>([]);
  useEffect(() => {
    getTransations();
  }, []);
  const getTransations = async () => {
    setIsLoading(true);
    const res = await transactionApi.getAllTransaction();
    if (res.status === 200) setTransations(res.data);
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <Text style={styles.title}>Lịch sử giao dịch</Text>
      <Animated.ScrollView>
        {isLoading ? (
          <ActivityIndicator
            size={"large"}
            color={Colors.secondary}
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.actionContainer}>
            {Array.isArray(transations) && transations.length > 0 ? (
              transations.map((item) => (
                <TouchableOpacity activeOpacity={0.5} key={item._id}>
                  <View style={styles.actionItem}>
                    <View style={styles.locationIcon}>
                      <Ionicons name="cash" size={20} color={Colors.Gray600} />
                    </View>
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "85%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "mon-sb",
                          fontSize: 16,
                        }}
                      >
                        {item.title}
                      </Text>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                          marginVertical: 2,
                        }}
                      >
                        <Text style={{ color: Colors.green, fontSize: 12 }}>
                          {item.status === TRANSACTION_STATUS.SUCCESS &&
                            "Thành công"}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            color: Colors.Gray400,
                          }}
                        >
                          {convertDate(item.createdAt)}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "space-between",
                          flexDirection: "row",
                          width: "100%",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ fontSize: 14 }}>TK chính</Text>
                        <Text
                          style={{
                            fontSize: 14,
                            marginLeft: 4,
                            color:
                              item.type === TRANSACTION_TYPE.ADD
                                ? Colors.green
                                : Colors.primary,
                          }}
                        >
                          {item.type === TRANSACTION_TYPE.ADD ? "+" : "-"}
                          {item.payment} VNĐ
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  marginVertical: 20,
                }}
              >
                <Text
                  style={{
                    color: Colors.dark,
                    fontFamily: "mon",
                    fontSize: 16,
                  }}
                >
                  Trống !
                </Text>
              </View>
            )}
          </View>
        )}
      </Animated.ScrollView>
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.Gray100,
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  actionContainer: {
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  actionItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
    alignItems: "center",
  },
  locationIcon: {
    padding: 4,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    marginRight: 16,
  },
});
