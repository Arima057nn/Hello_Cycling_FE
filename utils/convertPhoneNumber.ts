export function formatPhoneNumber (phoneNumber: string){
  // Kiểm tra nếu số điện thoại bắt đầu bằng số 0
  if (phoneNumber.startsWith('0')) {
    // Thay thế số 0 đầu tiên bằng "+84"
    return `+84${phoneNumber.slice(1)}`;
  } else {
    // Nếu không bắt đầu bằng số 0, trả về số điện thoại không thay đổi
    return phoneNumber;
  }
};