import { USER_GENDER } from "@/constants/Status";

export function convertGender(gender: number | undefined) {
  switch (gender) {
    case USER_GENDER.MALE:
      return "Nam";
    case USER_GENDER.FEMALE:
      return "Nữ";
    case USER_GENDER.OTHER:
      return "Khác";
    default:
      return "Không xác định";
  }
}
