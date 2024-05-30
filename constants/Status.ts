export const CYCLING_STATUS = {
  READY: 0,
  ACTIVE: 1,
  KEEPING: 2,
};

export const BOOKING_STATUS = {
  KEEPING: 0,
  ACTIVE: 1,
  CLOSED: 2,
};

export const CYCLING_TYPE = [
  {
    type: 0,
    name: "All",
  },
  {
    type: 1,
    name: "Xe đạp",
  },
  {
    type: 2,
    name: "Xe đạp điện",
  },
];

export const TICKET_TYPE = {
  DEFAULT: 0,
  DAY: 1,
  MONTHLY: 2,
};
export const TRANSACTION_TYPE = {
  ADD: 0,
  MINUS: 1,
};
export const TRANSACTION_STATUS = {
  PENDING: 0,
  SUCCESS: 1,
  FAILED: 2,
};

export const USER_TICKET_STATUS = {
  READY: 0,
  ACTIVE: 1,
  KEEPING: 2,
};

export const USER_GENDER = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
};

export const REPORT_TYPE = [
  {
    id: 0,
    name: "Khác",
  },
  {
    id: 1,
    name: "Xe hỏng",
  },
  {
    id: 2,
    name: "Mã QR",
  },
  {
    id: 3,
    name: "Bị phá hoại",
  },
  {
    id: 4,
    name: "Không nạp được điểm",
  },
  {
    id: 5,
    name: "Lỗi trả xe",
  },
];

export const FINISH_DISTANCE = 100;
