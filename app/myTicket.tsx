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
import { UserTicketInterface } from "@/interfaces/ticket";
import { CYCLING_TYPE } from "@/constants/Status";
import { Ionicons } from "@expo/vector-icons";
import { convertDate } from "@/utils/convertDate";
import { ModalInterface } from "@/interfaces/modal";
import Modal from "@/components/modal";
import IsLoadingModal from "@/components/isLoadingModal";
import AnswerModal from "@/components/answerModal";
import { checkUserTicketStatus } from "@/utils/checkUserTicketStatus";

const MyTicket = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedTicket, setSelectedTicket] =
    useState<UserTicketInterface | null>(null);
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const [tickets, setTickets] = useState<UserTicketInterface[]>([]);

  const handleCategoryPress = (index: number) => {
    setSelectedCategory(index);
  };

  const currentDate = new Date();

  useEffect(() => {
    getAllTicket();
  }, []);
  const getAllTicket = async () => {
    setIsLoading(true);
    const res = await ticketApi.getMyTickets();
    if (res.status === 200) setTickets(res.data);
    setIsLoading(false);
  };

  const filteredTickets = tickets.filter(
    (ticket) => ticket.ticketId.categoryId.value === selectedCategory
  );

  const cancelTicket = async () => {
    if (!selectedTicket) return;
    setIsShow(false);
    setLoading(true);
    const res = await ticketApi.cancelTicket(selectedTicket._id);
    setLoading(false);
    if (res.status === 200) {
      getAllTicket();
      setModalContent({
        isOpen: true,
        title: res.data.message,
        description: "",
      });
    } else {
      setModalContent({
        isOpen: true,
        title: "Lỗi",
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
          {Array.isArray(filteredTickets) && filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => (
              <View key={ticket._id} style={styles.ticketContainer}>
                <AnswerModal
                  title="Hủy vé"
                  description="Bạn chắc chắn muốn hủy vé này ?"
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
                      <TouchableOpacity onPress={cancelTicket}>
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
                      marginRight: 8,
                    }}
                  >
                    {ticket.ticketId.name}
                  </Text>
                  {new Date(ticket.dateEnd) > currentDate ? (
                    <Text
                      style={{
                        fontFamily: "mon",
                        color: Colors.grey,
                        fontSize: 14,
                        paddingVertical: 4,
                      }}
                    >
                      HSD : {convertDate(ticket.dateEnd)}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontFamily: "mon",
                        color: Colors.primary,
                        fontSize: 14,
                        paddingVertical: 4,
                      }}
                    >
                      Hết hạn sử dụng
                    </Text>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="time-outline" size={20} />
                    {ticket.ticketId.timer - ticket.usage > 0 ? (
                      <Text
                        style={{
                          fontFamily: "mon",
                          color: Colors.grey,
                          fontSize: 12,
                          marginLeft: 4,
                        }}
                      >
                        Còn {ticket.ticketId.timer - ticket.usage} phút -{" "}
                        <Text style={{ color: Colors.green }}>
                          {checkUserTicketStatus(ticket.status)}
                        </Text>
                      </Text>
                    ) : (
                      <Text
                        style={{
                          fontFamily: "mon",
                          color: Colors.primary,
                          fontSize: 12,
                        }}
                      >
                        Hết thời gian sử dụng
                      </Text>
                    )}
                  </View>
                </View>
                <TouchableOpacity
                  style={defaultStyles.btn}
                  activeOpacity={0.6}
                  onPress={() => {
                    setSelectedTicket(ticket);
                    setIsShow(true);
                  }}
                >
                  <Text style={defaultStyles.btnText}>Hủy</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
              <Text
                style={{ color: Colors.dark, fontFamily: "mon", fontSize: 16 }}
              >
                Không có vé nào !
              </Text>
            </View>
          )}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default MyTicket;

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
