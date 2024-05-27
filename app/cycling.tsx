import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { stationApi } from "@/services/station-api";
import { CyclingStationInterface } from "@/interfaces/station";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { bookingApi } from "@/services/booking-api";
import { ticketApi } from "@/services/ticket-api";
import { TicketInterface } from "@/interfaces/ticket";
import { ModalInterface } from "@/interfaces/modal";
import IsLoadingModal from "@/components/isLoadingModal";
import Modal from "@/components/modal";
import AnswerModal from "@/components/answerModal";
import RadioTicket from "@/components/radioTicket";
import { ScrollView } from "react-native-gesture-handler";
import { useTrips } from "@/contexts/tripsContext";

const Cycling = () => {
  const { tripState, onTrips } = useTrips();
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const [cycling, setCycling] = useState<CyclingStationInterface>();
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [checkedticket, setCheckedTicket] = useState("");
  const { code, cyclingId, stationId } = useLocalSearchParams<{
    code: string;
    cyclingId: string;
    stationId: string;
  }>();
  useEffect(() => {
    findCyclingAtStation();
    selectTicketToUse();
  }, []);

  const findCyclingAtStation = async () => {
    const res = await stationApi.findCyclingAtStation(cyclingId);
    if (res.status === 200) setCycling(res.data);
  };
  const selectTicketToUse = async () => {
    const res = await ticketApi.selectTicket(cyclingId);
    if (res.status === 200) setTickets(res.data);
  };

  const handleBooking = async () => {
    if (cycling && checkedticket) {
      setIsShow(false);
      setLoading(true);
      const res = await bookingApi.createBooking(
        cyclingId,
        stationId,
        checkedticket
      );
      setLoading(false);
      if (res.status === 200) {
        setModalContent({
          isOpen: true,
          title: "Thành công",
          description: "Chuyến đi đã bắt đầu",
        });
        if (!tripState) onTrips && onTrips(true);
      } else
        setModalContent({
          isOpen: true,
          title: "Thất bại",
          description: res.data.error,
        });
    } else {
      setLoading(true);
      setIsShow(false);
      setLoading(false);
      setModalContent({
        isOpen: true,
        title: "Lỗi",
        description: "Vui lòng chọn vé trước khi đặt xe",
      });
    }
  };
  const handleCreateKeeping = async () => {
    if (cycling && checkedticket) {
      const res = await bookingApi.createKeeping(
        cyclingId,
        stationId,
        checkedticket
      );
      if (res.status === 200) {
        Alert.alert("Đặt giữ xe thành công");
        if (!tripState) onTrips && onTrips(true);
      } else Alert.alert("Đặt xe thất bại", res.data.error);
    } else {
      Alert.alert("Vui lòng chọn vé trước khi đặt xe");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated={true} />
      {loading && <IsLoadingModal />}
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
      <Animated.View>
        <ScrollView style={{ height: 650 }}>
          <View style={styles.infoContainer}>
            <Animated.Image
              source={{
                uri: cycling?.stationId.imgae,
              }}
              style={styles.imageStation}
            />
            <View style={styles.stationContainer}>
              <Text style={styles.name}>{cycling?.stationId.name}</Text>
              <Text style={styles.location}>{cycling?.stationId.position}</Text>
            </View>
          </View>
          <View style={styles.cyclingContainer}>
            <View>
              <View style={styles.header}>
                <Ionicons name="bicycle" size={24} />
                <Text
                  style={{
                    color: Colors.lightGrey,
                    fontSize: 16,
                    fontFamily: "mon",
                    marginLeft: 8,
                  }}
                >
                  {cycling?.cyclingId.code}
                </Text>
              </View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: Colors.Gray100,
                  borderRightWidth: 2,
                  borderRightColor: Colors.Gray100,
                  borderLeftWidth: 2,
                  borderLeftColor: Colors.Gray100,
                  alignItems: "center",
                }}
              >
                <Animated.Image
                  source={{
                    uri: "https://www.jrccd.co.jp//storage/img/shopinfo/tni12202021014061.png",
                  }}
                  style={styles.imageCycling}
                />
              </View>
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: Colors.Gray100,
                  borderRightWidth: 2,
                  borderRightColor: Colors.Gray100,
                  borderLeftWidth: 2,
                  borderLeftColor: Colors.Gray100,
                  flexDirection: "row",
                }}
              >
                <View
                  style={{
                    borderRightWidth: 2,
                    borderRightColor: Colors.Gray100,
                    paddingHorizontal: 16,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: "mon-b", fontSize: 16 }}>Giá</Text>
                </View>
                <View style={{ flexDirection: "column", flex: 1 }}>
                  <View>
                    <Text style={styles.price}>10$ / 30min</Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.Gray100,
                      borderTopWidth: 2,
                      borderTopColor: Colors.Gray100,
                    }}
                  >
                    <Text style={styles.price}>+1$ / 15min </Text>
                  </View>
                  <View>
                    <Text style={styles.price}>30$ / 1day</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.title}>Chọn vé sử dụng</Text>
          <RadioTicket
            options={tickets}
            onChange={setCheckedTicket}
            checkedValue={checkedticket}
          />
          <View
            style={{
              justifyContent: "center",
              width: "100%",
              paddingHorizontal: 24,
            }}
          >
            <TouchableOpacity
              onPress={() => handleCreateKeeping()}
              activeOpacity={0.8}
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: Colors.secondary,
              }}
            >
              <Text
                style={{
                  color: Colors.lightGrey,
                  fontFamily: "mon-sb",
                  textAlign: "center",
                }}
              >
                Đặt vé trước 1 giờ
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animated.View>
      <Animated.View style={defaultStyles.footer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.footerText}>
            <Text style={styles.footerPrice}>Bạn đã sẵn sàng chưa?</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsShow(true);
            }}
            activeOpacity={0.8}
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: Colors.secondary,
              width: 86,
            }}
          >
            <Text
              style={{
                color: Colors.lightGrey,
                fontFamily: "mon-sb",
                textAlign: "center",
              }}
            >
              Đặt xe
            </Text>
          </TouchableOpacity>
        </View>
        <AnswerModal
          title="Đặt xe"
          description="Bắt đầu chuyến đi ?"
          isOpen={isShow}
          onRequestClose={() => setIsShow(false)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={defaultStyles.containerTextOK}>
              <TouchableOpacity onPress={() => setIsShow(false)}>
                <Text style={{ fontSize: 16 }}>Hủy bỏ</Text>
              </TouchableOpacity>
            </View>
            <View style={defaultStyles.containerTextOK}>
              <TouchableOpacity onPress={handleBooking}>
                <Text style={defaultStyles.textOK}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AnswerModal>
      </Animated.View>
    </View>
  );
};

export default Cycling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    flexDirection: "column",
  },
  infoContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray200,
  },
  imageStation: {
    width: 100,
    height: 100,
  },

  stationContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },
  code: {
    fontSize: 12,
    color: Colors.grey,
    fontFamily: "mon",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  location: {
    fontSize: 12,
    color: Colors.blue,
    fontFamily: "mon-sb",
    marginTop: 4,
  },
  cyclingContainer: {
    padding: 16,
    flexDirection: "column",
  },
  header: {
    padding: 8,
    backgroundColor: Colors.Gray300,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  imageCycling: {
    width: 180,
    height: 180,
  },
  price: {
    fontFamily: "mon",
    color: Colors.grey,
    fontSize: 16,
    padding: 16,
    textAlign: "center",
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  title: {
    marginHorizontal: 16,
    fontSize: 16,
    marginTop: 4,
    fontWeight: "500",
  },
});
