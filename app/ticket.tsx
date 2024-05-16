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
import { TicketInterface } from "@/interfaces/ticket";
import { TICKET_TYPE } from "@/constants/Status";
import { Ionicons } from "@expo/vector-icons";

const Ticket = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [tickets, setTickets] = useState<TicketInterface[]>([]);
  const handleCategoryPress = (index: number) => {
    setSelectedCategory(index);
  };

  useEffect(() => {
    getAllTicket();
  }, []);
  const getAllTicket = async () => {
    const res = await ticketApi.getTickets();
    setTickets(res?.data);
  };

  const filteredTickets = tickets.filter(
    (ticket) => ticket.categoryId.value === selectedCategory
  );
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <Text style={styles.title}>Danh sách vé</Text>
      <View style={styles.category}>
        {TICKET_TYPE.map(
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
        {filteredTickets?.map((ticket) => (
          <View key={ticket._id} style={styles.ticketContainer}>
            <View style={{ width: 80 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: Colors.lightGrey,
                }}
              >
                {ticket.name}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                width: 160,
              }}
            >
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
                  {ticket.expiration}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={defaultStyles.btn} activeOpacity={0.6}>
              <Text style={defaultStyles.btnText}>Mua</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
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
});
