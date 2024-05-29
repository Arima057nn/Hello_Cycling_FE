import IsLoadingModal from "@/components/isLoadingModal";
import Modal from "@/components/modal";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useAuth } from "@/contexts/authContext";
import { ModalInterface } from "@/interfaces/modal";
import { UserLoggedInterface } from "@/interfaces/user";
import { userApi } from "@/services/user-api";
import { convertGender } from "@/utils/convertGender";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const { userLogged } = useAuth();
  const [user, setUser] = useState<UserLoggedInterface | null | undefined>(
    userLogged
  );
  const handleUpdateProfile = async () => {
    setLoading(true);
    if (user?.name) {
      if (user.name === userLogged?.name) {
        setLoading(false);
        setModalContent({
          isOpen: true,
          title: "Thất bại",
          description: "Thông tin không có gì thay đổi.",
        });
      } else {
        const res = await userApi.updateProfile(user?.name);
        setLoading(false);
        if (res.status === 200) {
          console.log("Update success");
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
      }
    } else {
      setLoading(false);
      setModalContent({
        isOpen: true,
        title: "Thất bại",
        description: "Không để thông tin trống !",
      });
    }
  };
  return (
    <View style={styles.container}>
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
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.titleAuth}>Họ và tên</Text>
          <TextInput
            style={styles.inputAuth}
            value={user?.name}
            onChangeText={(value: string) =>
              user && setUser({ ...user, name: value })
            }
          />
        </View>
        <View>
          <Text style={styles.titleAuth}>Giới tính</Text>
          <TextInput
            style={styles.inputAuth}
            value={convertGender(user?.gender)}
            editable={false}
          />
        </View>
        <View>
          <Text style={styles.titleAuth}>Số điện thoại</Text>
          <TextInput
            style={styles.inputAuth}
            editable={false}
            value={user?.phone}
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => handleUpdateProfile()}
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
            }}
          >
            Cập nhật
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: Colors.light,
    justifyContent: "space-between",
  },
  inputContainer: {
    flex: 1,
  },
  inputAuth: {
    backgroundColor: Colors.Gray100,
    padding: 16,
    borderRadius: 16,
    color: Colors.lightGrey,
    marginTop: 8,
    marginBottom: 16,
  },
  titleAuth: {
    color: Colors.lightGrey,
    fontSize: 16,
  },
});
