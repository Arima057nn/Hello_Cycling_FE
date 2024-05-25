import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { paymentApi } from "@/services/payment-api";
import * as Linking from "expo-linking";

interface PaymentInterface {
  partnerCode: string;
  orderId: string;
  requestId: string;
  amount: number;
  responseTime: number;
  message: string;
  resultCode: number;
  payUrl: string;
  deeplink: string;
  qrCodeUrl: string;
}

const Ticket = () => {
  const [payment, setPayment] = useState<PaymentInterface>();

  const handlePayment = async () => {
    const res = await paymentApi.paymentByMomo();
    if (res.status === 200) {
      setPayment(res.data);
      const momoUrl = res.data.deeplink;
      Linking.openURL(momoUrl);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <Text style={styles.title}>Payment</Text>
      <View
        style={{
          justifyContent: "center",
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => handlePayment()}
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
              fontSize: 24,
            }}
          >
            THANH TOÁN
          </Text>
        </TouchableOpacity>
      </View>
      <Text>{payment?.amount}</Text>
      <Text>{payment?.message}</Text>
      <Text>{payment?.payUrl}</Text>
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
