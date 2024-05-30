import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { REPORT_TYPE } from "@/constants/Status";
import { TextInput } from "react-native-gesture-handler";
import { cyclingApi } from "@/services/cycling-api";
import Modal from "@/components/modal";
import IsLoadingModal from "@/components/isLoadingModal";
import { defaultStyles } from "@/constants/Styles";
import { ModalInterface } from "@/interfaces/modal";

function convertGender(report: string[]): string {
  return report.join(", ");
}

const Report = () => {
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState<ModalInterface>({
    isOpen: false,
    title: "",
    description: "",
  });
  const [selectedReports, setSelectedReports] = React.useState<string[]>([]);
  const [description, setDescription] = useState("");
  const { code, cyclingId } = useLocalSearchParams<{
    code: string;
    cyclingId: string;
  }>();
  const toggleReport = (reportName: string) => {
    setSelectedReports((prevSelectedReports) => {
      if (prevSelectedReports.includes(reportName)) {
        return prevSelectedReports.filter((report) => report !== reportName);
      } else {
        return [...prevSelectedReports, reportName];
      }
    });
  };
  const hanldeCreateReport = async () => {
    setLoading(true);
    if (selectedReports.length === 0) {
      setLoading(false);
      setModalContent({
        isOpen: true,
        title: "Lỗi",
        description: "Vui lòng chọn ít nhất một lỗi",
      });
      return;
    } else {
      const res = await cyclingApi.reportCycling(
        cyclingId,
        convertGender(selectedReports),
        description
      );
      setLoading(false);
      if (res.status === 200) {
        setSelectedReports([]);
        setDescription("");
        setModalContent({
          isOpen: true,
          title: res.data.message,
          description: "Cảm ơn bạn đã góp ý",
        });
      } else {
        setModalContent({
          isOpen: true,
          title: "Lỗi",
          description: "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
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
      <View>
        <Text style={styles.title}>Mã số xe</Text>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Text style={[styles.title, { color: Colors.blue, fontSize: 32 }]}>
            {code}
          </Text>
        </View>
        <Text style={styles.header}>Vấn đề gặp phải</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {REPORT_TYPE.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => toggleReport(item.name)}
            >
              <Text
                style={[
                  styles.error,
                  selectedReports.includes(item.name) && styles.selectedError,
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[styles.header]}>Mô tả vấn đề</Text>
        <View
          style={{
            padding: 12,
            backgroundColor: Colors.Gray100,
            borderRadius: 10,
            height: 100,
            justifyContent: "flex-start",
          }}
        >
          <TextInput
            placeholder="Mô tả"
            placeholderTextColor={Colors.Gray300}
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          hanldeCreateReport();
        }}
        activeOpacity={0.8}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: Colors.secondary,
          marginBottom: 32,
        }}
      >
        <Text
          style={{
            color: Colors.lightGrey,
            fontFamily: "mon-sb",
            textAlign: "center",
          }}
        >
          Gửi báo cáo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  error: {
    padding: 10,
    borderRadius: 16,
    backgroundColor: Colors.Gray100,
    color: Colors.grey,
  },
  selectedError: {
    backgroundColor: Colors.blue,
    color: Colors.light,
  },
  header: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.grey,
    marginBottom: 10,
    marginTop: 24,
  },
  input: {
    backgroundColor: Colors.Gray100,
    color: Colors.grey,
  },
});
