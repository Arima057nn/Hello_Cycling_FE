import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TripInterface } from "@/interfaces/booking";
import { bookingApi } from "@/services/booking-api";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BOOKING_STATUS } from "@/constants/Status";
import { useTrips } from "@/contexts/tripsContext";
import IsLoadingModal from "@/components/isLoadingModal";
import Modal from "@/components/modal";
import { ModalInterface } from "@/interfaces/modal";
import { defaultStyles } from "@/constants/Styles";
import AnswerModal from "@/components/answerModal";

const Trips = () => {
  const [loading, setLoading] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<TripInterface | null>(null);
  const [keepingTrip, setKeepingTrip] = useState<TripInterface | null>(null);
  const [trips, setTrips] = useState<TripInterface[]>([]);
  const { noTrip } = useTrips();
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });

  const getTripsCurrent = async () => {
    const res = await bookingApi.getTripsCurrent();
    if (res.status === 200) {
      setTrips(res.data);
      if (res.data.length === 0) noTrip && noTrip();
    }
  };

  useEffect(() => {
    getTripsCurrent();
  }, []);

  const handleFinishTrip = async (trip: TripInterface) => {
    console.log("trip", trip.cyclingId.code);
    if (trip.status === BOOKING_STATUS.ACTIVE) {
      setLoading(true);
      const res = await bookingApi.createTripDetail(
        trip._id,
        "65fbeeed40b7773e46da92c1"
      );
      setLoading(false);
      if (res.status === 200) {
        setModalContent({
          isOpen: true,
          title: "Thành công",
          description: "Kết thúc chuyến đi thành công",
        });
        getTripsCurrent();
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
        description: "Chuyến đi không tồn tại hoặc đã kết thúc",
      });
    }
  };

  const handleCancelKeepingTrip = async (trip: TripInterface) => {
    console.log("trip", trip.cyclingId.code);
    if (trip.status === BOOKING_STATUS.KEEPING) {
      setLoading(true);
      const res = await bookingApi.cancelKeeping(
        trip._id,
        trip.cyclingId.category._id
      );
      setLoading(false);
      if (res.status === 200) {
        setModalContent({
          isOpen: true,
          title: "Thành công",
          description: res.data.message,
        });
        getTripsCurrent();
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
        description: "Chuyến đi không tồn tại hoặc đã kết thúc",
      });
    }
  };

  const handleStartFromKeepingTrip = async (trip: TripInterface) => {
    console.log("trip", trip.cyclingId.code);
    if (trip.status === BOOKING_STATUS.KEEPING) {
      setLoading(true);
      const res = await bookingApi.startFromKeeping(trip._id);
      setLoading(false);
      if (res.status === 200) {
        setModalContent({
          isOpen: true,
          title: "Thành công",
          description: "Bắt đầu chuyến đi thành công",
        });
        getTripsCurrent();
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
        description: "Chuyến đi không tồn tại hoặc đã kết thúc",
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
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
      <Text style={styles.title}>Xe đang sử dụng</Text>

      {trips.map((trip) => (
        <View style={styles.card} key={trip._id}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 16,
                color: Colors.lightGrey,
              }}
            >
              {trip.cyclingId.code} - {trip.ticketId.name}
            </Text>
            {trip.status === BOOKING_STATUS.ACTIVE && (
              <Text style={{ color: Colors.green }}>Đang di chuyển</Text>
            )}

            {trip.status === BOOKING_STATUS.KEEPING && (
              <Text style={{ color: Colors.secondary }}>Đang giữ xe</Text>
            )}
          </View>
          <View>
            {trip.status === BOOKING_STATUS.ACTIVE && (
              <View>
                <TouchableOpacity
                  onPress={() => setSelectedTrip(trip)}
                  activeOpacity={0.8}
                  style={styles.actionBtn}
                >
                  <Ionicons name="stop" size={16} style={styles.icon} />
                </TouchableOpacity>
                <AnswerModal
                  title="Chuyến đi"
                  description="Kết thúc ngay bây giờ?"
                  isOpen={selectedTrip?._id === trip._id}
                  onRequestClose={() => setSelectedTrip(null)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={defaultStyles.containerTextOK}>
                      <TouchableOpacity onPress={() => setSelectedTrip(null)}>
                        <Text style={{ fontSize: 16 }}>Hủy bỏ</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={defaultStyles.containerTextOK}>
                      <TouchableOpacity onPress={() => handleFinishTrip(trip)}>
                        <Text style={defaultStyles.textOK}>Đồng ý</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </AnswerModal>
              </View>
            )}
            {trip.status === BOOKING_STATUS.KEEPING && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleCancelKeepingTrip(trip)}
                  activeOpacity={0.8}
                  style={styles.actionBtn}
                >
                  <Ionicons name="close" size={16} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setKeepingTrip(trip)}
                  activeOpacity={0.8}
                  style={styles.actionBtn}
                >
                  <Ionicons
                    name="caret-forward"
                    size={16}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <AnswerModal
                  title="Chuyến đi"
                  description="Bắt đầu chuyến đi ngay bây giờ?"
                  isOpen={keepingTrip?._id === trip._id}
                  onRequestClose={() => setKeepingTrip(null)}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={defaultStyles.containerTextOK}>
                      <TouchableOpacity onPress={() => setKeepingTrip(null)}>
                        <Text style={{ fontSize: 16 }}>Hủy bỏ</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={defaultStyles.containerTextOK}>
                      <TouchableOpacity
                        onPress={() => handleStartFromKeepingTrip(trip)}
                      >
                        <Text style={defaultStyles.textOK}>Đồng ý</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </AnswerModal>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Trips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.Gray100,
  },
  card: {
    padding: 16,
    backgroundColor: Colors.light,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 8,
    flexDirection: "row",
  },
  title: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  actionBtn: {
    borderRadius: 100,
    padding: 6,
    backgroundColor: Colors.red,
  },
  icon: {
    color: Colors.light,
  },
});
