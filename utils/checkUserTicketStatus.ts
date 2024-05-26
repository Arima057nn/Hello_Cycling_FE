import { USER_TICKET_STATUS } from "@/constants/Status";

const userTicketStatus = [
  { id: USER_TICKET_STATUS.READY, name: "Sẵn sàng" },
  { id: USER_TICKET_STATUS.ACTIVE, name: "Trong chuyến" },
  { id: USER_TICKET_STATUS.KEEPING, name: "Giữ xe" },
];

export function checkUserTicketStatus(status: number) {
  const result = userTicketStatus.find(
    (item: { id: number; name: String }) => item.id === status
  );
  return result && result.name;
}
