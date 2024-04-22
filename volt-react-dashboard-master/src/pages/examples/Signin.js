import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  FormCheck,
  Container,
  InputGroup,
  FormGroup,
  Alert,
} from "@themesberg/react-bootstrap";

import { Link, useHistory } from "react-router-dom";
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import AuthService from "../../services/auth.service";
import { Formik } from "formik";
import { logInSchema } from "../../schemas/index";

const Signin = () => {
  let history = useHistory();
  const [message, setMessage] = useState("");

  // const onSubmit =  () => {
  //   AuthService.login(username, password)
  //     .then((response) => {
  //       if (response.data.token) {
  //         localStorage.setItem("user", JSON.stringify(response.data));
  //         history.push(Routes.DashboardOverview.path);
  //         window.location.reload();
  //         console.log(localStorage.getItem("user"));
  //       }
  //     })
  //     .catch((error) => {
  //       const resMessage =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();

  //       setValidated(true);
  //       setMessage(resMessage);
  //       history.push(Routes.ServerError.path);
  //     });
  //   setValidated(true);
  // };

  const onSubmit = async (values) => {
    let response;

    try {
      response = await AuthService.login(values.username, values.password);
      console.log(response);

      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        history.push(Routes.DashboardOverview.path);
        window.location.reload();
        console.log(localStorage.getItem("user"));
      }
    } catch (error) {
      const resMessage = error.response.data.message;
      setMessage(resMessage);
      console.log(error);
      // history.push(Routes.ServerError.path);
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link
              as={Link}
              to={Routes.Presentation.path}
              className="text-gray-700"
            >
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Quay trở
              lại trang chính
            </Card.Link>
          </p>
          <Row
            className="justify-content-center form-bg-image"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Đăng nhập vào hệ thống</h3>
                </div>

                <Formik
                  onSubmit={onSubmit}
                  validationSchema={logInSchema}
                  initialValues={{
                    username: "",
                    password: "",
                  }}
                >
                  {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    errors,
                    isSubmitting,
                  }) => (
                    <Form className="mt-4" noValidate onSubmit={handleSubmit}>
                      <Form.Group
                        id="username"
                        className="mb-4"
                        controlId="validationFormikUsername"
                      >
                        <Form.Label>Tên đăng nhập</Form.Label>
                        <InputGroup>
                          <InputGroup.Text id="inputGroupPrependUser">
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Tên đăng nhập"
                            aria-describedby="inputGroupPrependUser"
                            required
                            autoFocus
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.username}
                            isValid={!errors.username && touched.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group>
                        <Form.Group
                          id="password"
                          className="mb-4"
                          controlId="validationFormikPassword"
                        >
                          <Form.Label>Mật khẩu</Form.Label>
                          <InputGroup>
                            <InputGroup.Text id="inputGroupUnlockAlt">
                              <FontAwesomeIcon icon={faUnlockAlt} />
                            </InputGroup.Text>
                            <Form.Control
                              required
                              aria-disabled="inputGroupUnlockAlt"
                              type="password"
                              placeholder="Mật khẩu"
                              name="password"
                              value={values.password}
                              onChange={handleChange}
                              isInvalid={!!errors.password}
                              isValid={!errors.password && touched.password}
                            />
                            <Form.Control.Feedback type="invalid">
                              {errors.password}
                            </Form.Control.Feedback>
                          </InputGroup>
                        </Form.Group>

                        {message && <Alert variant="warning">{message}</Alert>}

                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <Form.Check type="checkbox">
                            <FormCheck.Input
                              id="defaultCheck5"
                              className="me-2"
                            />
                            <FormCheck.Label
                              htmlFor="defaultCheck5"
                              className="mb-0"
                            >
                              Ghi nhớ
                            </FormCheck.Label>
                          </Form.Check>
                          <Card.Link
                            as={Link}
                            to={Routes.ForgotPassword.path}
                            className="small text-end"
                          >
                            Quên mật khẩu?
                          </Card.Link>
                        </div>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="w-100">
                        Đăng nhập
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">hoặc đăng nhập với</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-facebook me-2"
                  >
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pill text-twitter me-2"
                  >
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button
                    variant="outline-light"
                    className="btn-icon-only btn-pil text-dark"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                    Chưa đăng ký?
                    <Card.Link
                      as={Link}
                      to={Routes.Signup.path}
                      className="fw-bold"
                    >
                      {` Tạo tài khoản `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Signin;
