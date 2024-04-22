import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const basicSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Tên đăng nhập nên có độ dài tối thiểu là 3 ký tự.")
    .max(20, "Tên đăng nhập nên có độ dài tối đa là 20 ký tự.")
    .required("Vui lòng điền trường này."),
  email: yup
    .string()
    .email("Vui lòng sử dụng email hợp lệ.")
    .required("Vui lòng điền trường này."),

  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Vui lòng sử dụng mật khẩu mạnh hơn." })
    .required("Vui lòng điền trường này."),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Vui lòng điền trường này."),

  terms: yup
    .boolean()
    .required()
    .oneOf([true], "Bạn cần đồng ý với điều khoản dịch vụ"),
  // interests: yup
  //   .array()
  //   .min(1, "Select at least one interest")
  //   .required("Select at least one interest"),
});

export const shiftSchema = yup.object().shape({
  code: yup
    .string()
    .uppercase("Mã phiên nên sử dụng ký hiệu in hoa.")
    .required("Vui lòng điền vào trường này!")
    .min(4, "Mã phiên nên chứa ít nhất là 4 ký tự.")
    .max(7, "Mã phiên nên chứa nhiều nhất là 7 ký tự"),

  // isOvernight: yup.boolean(),

  name: yup.string().required("Vui lòng điền vào trường này!"),

  // day: yup.string().datetime(),

  startedTime: yup.string().required("Giờ vào làm có định dạng: HH:MM"),

  finishedTime: yup.string().required("Giờ tan làm có định dạng: HH:MM"),

  clockInEarlyMinutes: yup
    .number("Trường chỉ nhận giá trị với định dạng số")
    .positive("Vui lòng điền một giá trị không âm.")
    .required("Vui lòng điền vào trường này!"),

  clockInLateMinutes: yup
    .number("Trường chỉ nhận giá trị với định dạng số")
    .required("Vui lòng điền vào trường này!")
    .positive("Vui lòng điền một giá trị không âm."),
  clockOutEarlyMinutes: yup
    .number("Trường chỉ nhận giá trị với định dạng số")
    .positive("Vui lòng điền một giá trị không âm.")
    .required("Vui lòng điền vào trường này!"),

  clockOutLateMinutes: yup
    .number("Trường chỉ nhận giá trị với định dạng số")
    .positive("Vui lòng điền một giá trị không âm.")
    .required("Vui lòng điền vào trường này!"),

  totalWorkedHours: yup
    .number("Trường chỉ nhận giá trị với định dạng số")
    .positive("Vui lòng điền một giá trị không âm.")
    .required("Vui lòng điền vào trường này!"),
});

export const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Vui lòng sử dụng email hợp lệ.")
    .required("Vui lòng điền trường này."),

  password: yup
    .string()
    .min(5, "Mật khẩu phải có ít nhất 5 ký tự.")
    .matches(passwordRules, { message: "Vui lòng sử dụng mật khẩu mạnh hơn." })
    .required("Vui lòng điền trường này."),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không trùng khớp.")
    .required("Vui lòng điền trường này."),
});

export const logInSchema = yup.object().shape({
  username: yup
    .string()
    .email("Vui lòng nhập định dạng phù hợp")
    .required("Vui lòng điền trường này"),
  password: yup.string().required("Vui lòng điền vào trường này"),
});
