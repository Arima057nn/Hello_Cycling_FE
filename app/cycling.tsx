import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
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
import {
  CHANGE_STATUS,
  CYCLING_TYPE,
  TICKET_PRICE,
  TIME_USE_TICKET,
} from "@/constants/Status";
import { useAuth } from "@/contexts/authContext";

const Cycling = () => {
  const { userLogged } = useAuth();
  const { tripState, onTrips } = useTrips();
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isShowKeep, setIsShowKeep] = useState(false);
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const [cycling, setCycling] = useState<CyclingStationInterface>();
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const [checkedticket, setCheckedTicket] = useState("");
  const { code, cyclingId, stationId, change, bookingId } =
    useLocalSearchParams<{
      code: string;
      cyclingId: string;
      stationId: string;
      change: string;
      bookingId: string;
    }>();

  useEffect(() => {
    findCyclingAtStation();
    if (change === CHANGE_STATUS.FALSE) selectTicketToUse();
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
        description: "Bạn chưa chọn vé hoặc xe không tồn tại",
      });
    }
  };
  const handleCreateKeeping = async () => {
    if (cycling && checkedticket) {
      setIsShowKeep(false);
      setLoading(true);
      const res = await bookingApi.createKeeping(
        cyclingId,
        stationId,
        checkedticket
      );
      setLoading(false);
      if (res.status === 200) {
        setModalContent({
          isOpen: true,
          title: "Thành công",
          description: "Đặt giữ xe thành công",
        });
        if (!tripState) onTrips && onTrips(true);
      } else {
        setModalContent({
          isOpen: true,
          title: "Thất bại",
          description: res.data.error,
        });
      }
    } else {
      setLoading(true);
      setIsShowKeep(false);
      setLoading(false);
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description: "Bạn chưa chọn vé hoặc xe không tồn tại",
      });
    }
  };

  const handleChangeCycling = async () => {
    if (cycling && change === CHANGE_STATUS.TRUE) {
      setLoading(true);
      const res = await bookingApi.changeCycling(bookingId, cyclingId);
      setLoading(false);
      if (res.status === 200) {
        setModalContent({
          isOpen: true,
          title: "Thành công",
          description: res.data.message,
        });
      } else {
        setModalContent({
          isOpen: true,
          title: "Thất bại",
          description: res.data.error,
        });
      }
    } else {
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description: "Không tìm thấy xe cần đổi",
      });
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
              source={
                cycling
                  ? { uri: cycling?.stationId?.imgae }
                  : require("@/assets/images/station.jpg")
              }
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
                  source={require("@/assets/images/cycling.png")}
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
                    <Text style={styles.price}>
                      Vé lượt -{" "}
                      {cycling?.cyclingId.category.value ===
                      CYCLING_TYPE[1].type
                        ? TICKET_PRICE[1].price
                        : TICKET_PRICE[2].price}
                      đ / {TIME_USE_TICKET.minute}phút
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.Gray100,
                      borderTopWidth: 2,
                      borderTopColor: Colors.Gray100,
                    }}
                  >
                    <Text style={styles.price}>
                      Vé ngày - {""}
                      {cycling?.cyclingId.category.value ===
                      CYCLING_TYPE[1].type
                        ? TICKET_PRICE[1].dayPrice
                        : TICKET_PRICE[2].dayPrice}
                      đ / {TIME_USE_TICKET.minuteDay}phút
                    </Text>
                  </View>
                  <View
                    style={{
                      borderBottomWidth: 2,
                      borderBottomColor: Colors.Gray100,
                    }}
                  >
                    <Text style={styles.price}>
                      Vé tháng -{" "}
                      {cycling?.cyclingId.category.value ===
                      CYCLING_TYPE[1].type
                        ? TICKET_PRICE[1].monthlyPrice
                        : TICKET_PRICE[2].monthlyPrice}
                      đ / {TIME_USE_TICKET.minuteMonthly} phút
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.price}>
                      {cycling?.cyclingId.category.value ===
                      CYCLING_TYPE[1].type
                        ? "+ 3000 "
                        : "+ 6000 "}
                      đ / 15phút tiếp theo
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {change === CHANGE_STATUS.FALSE && (
            <View>
              <Text style={styles.title}>Chọn vé sử dụng</Text>
              <RadioTicket
                options={tickets}
                onChange={setCheckedTicket}
                checkedValue={checkedticket}
              />
              <Text style={styles.title}>Điều kiện thuê xe</Text>
              <View
                style={{ paddingHorizontal: 32, gap: 4, paddingBottom: 12 }}
              >
                <Text style={{ color: Colors.Gray600 }}>
                  - Vé lượt: Tài khoản trên{" "}
                  {cycling?.cyclingId.category.value === CYCLING_TYPE[1].type
                    ? TICKET_PRICE[1].price * 2
                    : TICKET_PRICE[2].price * 2}{" "}
                  điểm
                </Text>
                <Text style={{ color: Colors.Gray600 }}>
                  - Vé ngày/tháng: Nếu thời gian sử dụng còn lại nhỏ hơn 45p thì
                  tài khoản phải trên{" "}
                  {cycling?.cyclingId.category.value === CYCLING_TYPE[1].type
                    ? TICKET_PRICE[1].price
                    : TICKET_PRICE[2].price}{" "}
                  điểm
                </Text>
              </View>
              <Text style={styles.title}>Điều kiện đặt xe trước 1 giờ</Text>
              <View style={{ paddingHorizontal: 32, gap: 4 }}>
                <Text style={{ color: Colors.Gray600 }}>
                  - Vé lượt: Tài khoản trên{" "}
                  {cycling?.cyclingId.category.value === CYCLING_TYPE[1].type
                    ? TICKET_PRICE[1].price * 2
                    : TICKET_PRICE[2].price * 2}{" "}
                  điểm
                </Text>
                <Text style={{ color: Colors.Gray600 }}>
                  - Vé ngày/tháng: Tài khoản trên{" "}
                  {cycling?.cyclingId.category.value === CYCLING_TYPE[1].type
                    ? TICKET_PRICE[1].price
                    : TICKET_PRICE[2].price}{" "}
                  điểm
                </Text>
              </View>
              <Text style={[styles.title, { marginTop: 16 }]}>
                Điều khoản sử dụng
              </Text>
              <View style={{ paddingHorizontal: 32, gap: 4 }}>
                <Text style={{ color: Colors.red }}>
                  * Hệ thống sẽ tạm trừ vào tài khoản khi đặt xe hoặc đặt giữ xe
                  và được hoàn lại hoặc tính thêm phí sau khi hoàn thành chuyến
                  đi tùy vào thời lượng đã sử dụng.
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  width: "100%",
                  paddingHorizontal: 24,
                }}
              >
                <TouchableOpacity
                  onPress={() => setIsShowKeep(true)}
                  activeOpacity={0.8}
                  style={{
                    marginTop: 36,
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
                    Đặt xe trước 1 giờ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
            <View
              style={{
                backgroundColor: Colors.purple,
                padding: 10,
                borderRadius: 8,
                marginRight: 4,
              }}
            >
              <Ionicons name="wallet-outline" size={24} color={Colors.light} />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontSize: 12, color: Colors.Gray400 }}>
                TK chính
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  fontFamily: "mon-sb",
                }}
              >
                {userLogged?.balance}
              </Text>
            </View>
          </View>
          {change === CHANGE_STATUS.FALSE && (
            <TouchableOpacity
              onPress={() => {
                setIsShow(true);
              }}
              activeOpacity={0.8}
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: Colors.secondary,
                width: 200,
              }}
            >
              <Text
                style={{
                  color: Colors.lightGrey,
                  fontFamily: "mon-sb",
                  textAlign: "center",
                }}
              >
                Đặt xe ngay bây giờ
              </Text>
            </TouchableOpacity>
          )}
          {change === CHANGE_STATUS.TRUE && (
            <TouchableOpacity
              onPress={() => {
                handleChangeCycling();
              }}
              activeOpacity={0.8}
              style={{
                padding: 16,
                borderRadius: 12,
                backgroundColor: Colors.secondary,
                width: 200,
              }}
            >
              <Text
                style={{
                  color: Colors.lightGrey,
                  fontFamily: "mon-sb",
                  textAlign: "center",
                }}
              >
                Xác nhận đổi xe
              </Text>
            </TouchableOpacity>
          )}
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
        <AnswerModal
          title="Giữ xe"
          description="Bắt đầu giữ xe trong 1 giờ ?"
          isOpen={isShowKeep}
          onRequestClose={() => setIsShowKeep(false)}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={defaultStyles.containerTextOK}>
              <TouchableOpacity onPress={() => setIsShowKeep(false)}>
                <Text style={{ fontSize: 16 }}>Hủy bỏ</Text>
              </TouchableOpacity>
            </View>
            <View style={defaultStyles.containerTextOK}>
              <TouchableOpacity onPress={handleCreateKeeping}>
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
    borderRadius: 8,
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
    fontSize: 14,
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
    marginVertical: 4,
    fontWeight: "500",
  },
});
