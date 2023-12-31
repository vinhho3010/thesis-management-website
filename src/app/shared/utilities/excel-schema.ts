  //mapping format for excel file
  export const inputStudentSchema = {
    STT: {
      prop: "stt",
      type: String,
    },
    "HO VA TEN": {
      prop: "fullName",
      type: String,
      required: true,
    },
    MSSV: {
      prop: "code",
      type: String,
      required: true,
    },
  };

  export const inputAccountSchema = {
    STT: {
      prop: "stt",
      type: String,
    },
    "role": {
      prop: "role",
      type: String,
      required: true,
    },
    "HO VA TEN": {
      prop: "fullName",
      type: String,
      required: true,
    },
    MSSV: {
      prop: "code",
      type: String,
    },
    MSCB: {
      prop: "code",
      type: String,
    },
    "DIA CHI": {
      prop: "address",
      type: String,
    },
    "GIOI TINH": {
      prop: "gender",
      type: String,
    },
    "SDT": {
      prop: "phoneNumber",
      type: String
    },
    "NGANH": {
      prop: "major",
      type: String
    },
    "LOP": {
      prop: "class",
      type: String
    },
    "MAT KHAU": {
      prop: "password",
      type: String
    },
    "EMAIL": {
      prop: "email",
      type: String
    }

  }

  export const studentListHeader = [
    'STT',  'MSSV', 'Họ và tên', 'Ngành', 'Lớp', 'Đề tài', 'Đề tài (tiếng Anh)'
  ]

export const councilListHeader = [
  'STT', 'MSSV', 'Họ và tên', 'Ngành', 'Đề tài', 'GVHD', 'Thời gian', 'Phòng', 'Chủ tịch', 'Ủy viên', 'Thư ký', 'Điểm TB'
]
