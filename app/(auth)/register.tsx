import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { userApi } from "@/services/user-api";
import IsLoadingModal from "@/components/isLoadingModal";
import { ModalInterface } from "@/interfaces/modal";
import { defaultStyles } from "@/constants/Styles";
import Modal from "@/components/modal";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const signInWithPhoneNumber = async () => {
    try {
      setLoading(true);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log("confirmation", confirmation);
      setLoading(false);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error sending code", error);
    }
  };

  const register = async (
    user_id: string | undefined,
    phone_number: string | null | undefined
  ) => {
    const res = await userApi.register(user_id, phone_number);
  };

  const confirmCode = async () => {
    setLoading(true);
    try {
      const userCredential = await confirm?.confirm(code);
      const user = userCredential?.user;
      setLoading(false);
      if (userCredential?.additionalUserInfo?.isNewUser) {
        register(user?.uid, user?.phoneNumber);
        router.navigate("/(auth)/newUser");
      } else {
        console.log("User credential", userCredential);
        router.navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description:
          "Mã code không chính xác, vui lòng gửi lại OTP để xác nhận!",
      });
      console.log("Invalid code", error);
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
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 24,
          }}
        >
          <Image
            style={styles.imageLogo}
            source={{
              uri: "https://media.istockphoto.com/id/1410277332/vector/man-touching-bike-rental-station-terminal-screen-on-modern-cityscape-street-businessman.jpg?s=612x612&w=0&k=20&c=kNl6-s_GGFj3hNftNqEbGu1Np2Knyzr-ND4rNVXntWo=",
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.inputContainer}>
        {!confirm ? (
          <View>
            <Text style={styles.titleAuth}>Nhập số điện thoại</Text>
            <TextInput
              placeholder="e.g., +8434567890"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.inputAuth}
            ></TextInput>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnAuth}
              onPress={signInWithPhoneNumber}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  color: Colors.lightGrey,
                }}
              >
                Gửi OTP xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.titleAuth}>Nhập mã OTP để xác nhận</Text>
            <TextInput
              value={code}
              onChangeText={setCode}
              style={styles.inputAuth}
            ></TextInput>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => signInWithPhoneNumber()}
              >
                <Text
                  style={[
                    styles.titleAuth,
                    {
                      textDecorationLine: "underline",
                      color: Colors.blue,
                      fontSize: 15,
                    },
                  ]}
                >
                  Gửi lại OTP
                </Text>
                <FontAwesome5 name="redo-alt" size={16} color={Colors.blue} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnAuth}
              onPress={confirmCode}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  color: Colors.lightGrey,
                }}
              >
                Xác nhận
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ----------------------------------------------------- */}
        <Text
          style={{
            color: Colors.lightGrey,
            textAlign: "center",
            fontWeight: "500",
            fontSize: 16,
          }}
        >
          Hoặc
        </Text>
        <View style={styles.iconContainer}>
          <View style={styles.iconBtn}>
            <Ionicons name="logo-facebook" size={24} />
          </View>
          <View style={styles.iconBtn}>
            <Ionicons name="logo-google" size={24} />
          </View>
          <View style={styles.iconBtn}>
            <MaterialIcons name="email" size={24} color="black" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
  imageLogo: { width: 200, height: 200, borderRadius: 20 },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 16,
  },
  iconBtn: {
    padding: 8,
    backgroundColor: Colors.Gray100,
    borderRadius: 18,
    elevation: 1,
  },
  btnAuth: {
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    paddingVertical: 16,
    marginVertical: 24,
  },
  inputAuth: {
    backgroundColor: Colors.Gray100,
    padding: 16,
    borderRadius: 16,
    color: Colors.lightGrey,
    fontSize: 14,
    fontFamily: "mon",
    marginTop: 8,
    marginBottom: 16,
  },
  titleAuth: {
    color: Colors.grey,
    fontSize: 16,
    fontWeight: "500",
  },
  actionContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 24,
  },
  forgotPassword: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
