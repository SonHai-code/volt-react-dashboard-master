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
