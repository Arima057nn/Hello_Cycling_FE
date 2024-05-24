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
import { defaultStyles } from "@/constants/Styles";
import Animated from "react-native-reanimated";
import { ticketApi } from "@/services/ticket-api";
import { TicketInterface } from "@/interfaces/ticket";
import { CYCLING_TYPE, TICKET_TYPE } from "@/constants/Status";
import { Ionicons } from "@expo/vector-icons";
import { ModalInterface } from "@/interfaces/modal";
import IsLoadingModal from "@/components/isLoadingModal";
import AnswerModal from "@/components/answerModal";
import Modal from "@/components/modal";

const Ticket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState<TicketInterface | null>(
    null
  );
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const handleCategoryPress = (index: number) => {
    setSelectedCategory(index);
  };

  useEffect(() => {
    getAllTicket();
  }, []);
  const getAllTicket = async () => {
    setIsLoading(true);
    const res = await ticketApi.getTickets();
    if (res.status === 200) setTickets(res.data);
    setIsLoading(false);
  };

  const filteredTickets = tickets.filter(
    (ticket) => ticket.categoryId.value === selectedCategory
  );

  const handleBuyTicket = async () => {
    if (!selectedTicket) return;
    setIsShow(false);
    setLoading(true);
    const res = await ticketApi.buyTicket(selectedTicket._id);
    setLoading(false);
    if (res.status === 200) {
      setModalContent({
        isOpen: true,
        title: res.data.message,
        description: "",
      });
    } else {
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description: res.data.error,
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
      <Text style={styles.title}>Danh sách vé</Text>
      <View style={styles.category}>
        {CYCLING_TYPE.map(
          (item) =>
            item.type !== 0 && (
              <TouchableOpacity
                key={item.type}
                style={[
                  styles.categoryItem,
                  selectedCategory === item.type && {
                    backgroundColor: Colors.yellow,
                  },
                ]}
                onPress={() => handleCategoryPress(item.type)}
              >
                <Text style={{ fontFamily: "mon-sb" }}>{item.name}</Text>
              </TouchableOpacity>
            )
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.secondary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <Animated.ScrollView>
          {filteredTickets?.map((ticket) => (
            <View key={ticket._id} style={styles.ticketContainer}>
              <AnswerModal
                title="Mua vé"
                description="Bạn chắc chắn muốn mua vé này ?"
                isOpen={isShow && selectedTicket?._id === ticket._id}
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
                    <TouchableOpacity onPress={handleBuyTicket}>
                      <Text style={defaultStyles.textOK}>Đồng ý</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </AnswerModal>
              <View style={styles.locationIcon}>
                <Ionicons name="ticket" size={20} color={Colors.Gray600} />
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: 200,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: Colors.lightGrey,
                  }}
                >
                  {ticket.name}
                </Text>
                <Text
                  style={{
                    fontFamily: "mon",
                    color: Colors.grey,
                    fontSize: 14,
                  }}
                >
                  {ticket.price}đ / {ticket.timer} phút
                </Text>
                <Text
                  style={{
                    fontFamily: "mon",
                    color: Colors.grey,
                    fontSize: 12,
                    marginVertical: 4,
                  }}
                >
                  (+{ticket.overduePrice}đ / {ticket.duration}phút)
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="time-outline" size={20} />
                  <Text
                    style={{
                      fontFamily: "mon",
                      color: Colors.grey,
                      fontSize: 12,
                    }}
                  >
                    HSD trong {ticket.expiration} giờ
                  </Text>
                </View>
              </View>

              {ticket.type.value !== TICKET_TYPE.DEFAULT ? (
                <TouchableOpacity
                  style={defaultStyles.btn}
                  activeOpacity={0.6}
                  onPress={() => {
                    setSelectedTicket(ticket);
                    setIsShow(true);
                  }}
                >
                  <Text style={defaultStyles.btnText}>Mua</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={[defaultStyles.btn, { opacity: 0.2 }]}>
                  <Text style={defaultStyles.btnText}>Mua</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default Ticket;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.Gray100,
  },
  ticketContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.light,
    borderRadius: 4,
    marginBottom: 16,
  },
  category: {
    borderWidth: 1,
    borderColor: Colors.secondary,

    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  categoryItem: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    borderRadius: 4,
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
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
