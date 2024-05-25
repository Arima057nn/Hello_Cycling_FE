import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { paymentApi } from "@/services/payment-api";
import * as Linking from "expo-linking";
import { Ionicons } from "@expo/vector-icons";
import IsLoadingModal from "@/components/isLoadingModal";
import { useLocalSearchParams } from "expo-router";
import { ModalInterface } from "@/interfaces/modal";
import { defaultStyles } from "@/constants/Styles";
import Modal from "@/components/modal";

const Payment = () => {
  const { orderId } = useLocalSearchParams<{
    orderId: string;
  }>();
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const handlePayment = async () => {
    setLoading(true);
    const res = await paymentApi.paymentByMomo(amount);
    setLoading(false);
    if (res.status === 200) {
      setAmount("");
      const momoUrl = res.data.deeplink;
      Linking.openURL(momoUrl);
    } else {
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description: res.data.error,
      });
    }
  };

  const checkTransactionResult = async () => {
    setLoading(true);
    const res = await paymentApi.checkTransctionStatus(orderId);
    setLoading(false);
    if (res.status === 200 && res.data.resultCode === 0) {
      setModalContent({
        isOpen: true,
        title: res.data.message,
        description: `Nạp ${res.data.amount} điểm thành công`,
      });
    } else {
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description: res.data.error,
      });
    }
  };

  useEffect(() => {
    if (orderId) checkTransactionResult();
  }, [orderId]);
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
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
          marginTop: 8,
        }}
      >
        <View>
          <View style={styles.amountContainer}>
            <Text
              style={{
                color: Colors.lightGrey,
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Nhập số tiền muốn nạp (VND)
            </Text>
            <TextInput
              value={amount}
              onChangeText={(text: string) => setAmount(text)}
              style={styles.input}
              keyboardType="decimal-pad"
              textAlign="center"
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              marginTop: 24,
              marginBottom: 8,
            }}
          >
            Phương thức thanh toán
          </Text>
          <View style={styles.amountContainer}>
            <View style={styles.item}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("@/assets/images/momo.png")}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "400", marginLeft: 16 }}
                >
                  Momo
                </Text>
              </View>
              <Ionicons name="checkmark-circle" size={24} color={Colors.blue} />
            </View>
          </View>
        </View>
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            paddingHorizontal: 24,
            marginBottom: 24,
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
                textAlign: "center",
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Nạp điểm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.Gray100,
  },
  amountContainer: {
    padding: 16,
    backgroundColor: Colors.light,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  input: {
    backgroundColor: Colors.light,
    marginVertical: 16,
    padding: 14,
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.Gray300,
    color: Colors.Gray600,
  },
  item: {
    backgroundColor: Colors.light,
    padding: 10,
    width: "100%",
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: Colors.Gray400,
    borderWidth: 1,
  },
});
