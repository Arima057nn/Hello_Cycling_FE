import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { bookingApi } from "@/services/booking-api";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { TripHistoryInterface } from "@/interfaces/booking";
import { convertDate } from "@/utils/convertDate";
import { router } from "expo-router";
import Modal from "@/components/modal";
import { ModalInterface } from "@/interfaces/modal";
import { defaultStyles } from "@/constants/Styles";

const History = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<TripHistoryInterface[]>([]);
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const getTripDetail = async () => {
    setIsLoading(true);
    const res = await bookingApi.getTripHistory();
    setIsLoading(false);
    if (res?.status === 200) setHistory(res.data);
    else {
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description: res.data.error,
      });
    }
  };
  useEffect(() => {
    getTripDetail();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <Text style={styles.title}>Lịch sử chuyến đi</Text>
      <Modal
        title={modalContent.title}
        description={modalContent.description}
        isOpen={modalContent.isOpen}
        onRequestClose={() => {
          setModalContent((prevState) => ({
            ...prevState,
            isOpen: false,
          }));
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setModalContent((prevState) => ({
              ...prevState,
              isOpen: false,
            }));
          }}
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text style={defaultStyles.textOK}>OK</Text>
        </TouchableOpacity>
      </Modal>
      <Animated.ScrollView>
        {isLoading ? (
          <ActivityIndicator
            size={"large"}
            color={Colors.secondary}
            style={{ marginTop: 20 }}
          />
        ) : (
          <View style={styles.actionContainer}>
            {Array.isArray(history) && history.length > 0 ? (
              history.map((item) => (
                <TouchableOpacity
                  activeOpacity={0.5}
                  key={item._id}
                  onPress={() =>
                    router.push({
                      pathname: "/historyDetail",
                      params: {
                        id: item._id,
                      },
                    })
                  }
                >
                  <View style={styles.actionItem}>
                    <View style={styles.locationIcon}>
                      <Ionicons
                        name="bicycle-outline"
                        size={20}
                        color={Colors.Gray600}
                      />
                    </View>
                    <View
                      style={{
                        alignItems: "flex-start",
                        width: "80%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "mon-sb",
                          fontSize: 16,
                        }}
                      >
                        {item.bookingId?.createdAt &&
                          convertDate(item.bookingId?.createdAt)}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: 8,
                          marginTop: 4,
                        }}
                      >
                        <Ionicons name="time-outline" size={16} />
                        <Text
                          style={{
                            fontSize: 12,
                            color: Colors.Gray600,
                            marginLeft: 4,
                          }}
                        >
                          {item.total} phút
                        </Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} />
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View
                style={{ flex: 1, alignItems: "center", marginVertical: 20 }}
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
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
    alignItems: "center",
  },
  locationIcon: {
    padding: 4,
    backgroundColor: Colors.light,
    borderRadius: 16,
    borderColor: Colors.secondary,
    borderWidth: 2,
    marginRight: 16,
  },
});
export default History;
