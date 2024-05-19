import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
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

const MyTicket = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [tickets, setTickets] = useState<UserTicketInterface[]>([]);
  const handleCategoryPress = (index: number) => {
    setSelectedCategory(index);
  };

  const currentDate = new Date();

  useEffect(() => {
    getAllTicket();
  }, []);
  const getAllTicket = async () => {
    const res = await ticketApi.getMyTickets();
    setTickets(res?.data);
  };

  const filteredTickets = tickets.filter(
    (ticket) => ticket.ticketId.categoryId.value === selectedCategory
  );
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
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
      <Animated.ScrollView>
        {Array.isArray(filteredTickets) &&
          filteredTickets.map((ticket) => (
            <View key={ticket._id} style={styles.ticketContainer}>
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
                  {ticket.ticketId.expiration - ticket.usage > 0 ? (
                    <Text
                      style={{
                        fontFamily: "mon",
                        color: Colors.grey,
                        fontSize: 12,
                        marginLeft: 4,
                      }}
                    >
                      Còn {ticket.ticketId.timer - ticket.usage} phút
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
              <TouchableOpacity style={defaultStyles.btn} activeOpacity={0.6}>
                <Text style={defaultStyles.btnText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          ))}
      </Animated.ScrollView>
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
