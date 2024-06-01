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
import { router } from "expo-router";
import { userApi } from "@/services/user-api";
import { defaultStyles } from "@/constants/Styles";
import { ModalInterface } from "@/interfaces/modal";
import IsLoadingModal from "@/components/isLoadingModal";
import Modal from "@/components/modal";

const NewUser = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const SetNameForUser = async () => {
    setLoading(true);
    if (name) {
      const res = await userApi.createName(name);
      setLoading(false);
      if (res.status === 200) {
        setModalContent({
          isOpen: true,
          title: "Thành công",
          description: "Bắt đầu chuyến đi thôi !",
        });
      } else {
        setModalContent({
          isOpen: true,
          title: "Lỗi",
          description: "Hãy cập nhật lại thông tin sau!",
        });
      }
    } else {
      setLoading(false);
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description: "Thông tin đang trống. Hãy cập nhật lại thông tin sau!",
      });
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <SafeAreaView>
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
              router.navigate("/");
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
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 24,
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
        <View>
          <Text style={styles.titleAuth}>Hãy nhập tên của bạn</Text>
          <TextInput
            placeholder=""
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.inputAuth}
          ></TextInput>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btnAuth}
            onPress={() => SetNameForUser()}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
                color: Colors.lightGrey,
              }}
            >
              Bắt đầu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
  imageLogo: { width: 240, height: 240, borderRadius: 20 },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
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
    elevation: 1,
  },
  titleAuth: {
    color: Colors.grey,
    fontSize: 16,
    fontWeight: "500",
  },
  actionContainer: {
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 24,
  },
});
