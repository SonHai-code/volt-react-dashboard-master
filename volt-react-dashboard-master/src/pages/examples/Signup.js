import React, { Component, useRef, useState } from "react";
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
} from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import AuthService from "../../services/auth.service";
import { basicSchema } from "../../schemas";
import { Formik } from "formik";
import * as yup from "yup";

const Signup = () => {
  const history = useHistory();
  const onSubmit = async (values) => {
    let response;

    try {
      response = await AuthService.register(
        values.username,
        values.email,
        values.password
      );

      // alert(JSON.stringify(values, null, 2));
      alert(response);
      history.push(Routes.Signin.path);
    } catch (e) {
      console.log(e);
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
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Quay lại
              trang chủ
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
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Tạo tài khoản mới</h3>
                </div>

                <Formik
                  validationSchema={basicSchema}
                  onSubmit={onSubmit}
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    terms: false,
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
                        // id="username"
                        className="mb-4"
                        controlId="validationFormikUsername"
                      >
                        <Form.Label>Tên tài khoản</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text id="inputGroupPrependUser">
                            <FontAwesomeIcon icon={faUser} />
                          </InputGroup.Text>
                          <Form.Control
                            type="text"
                            placeholder="Tên tài khoản"
                            aria-describedby="inputGroupPrependUser"
                            name="username"
                            value={values.username}
                            onChange={handleChange}
                            autoFocus
                            required
                            onBlur={handleBlur}
                            isInvalid={!!errors.username}
                            isValid={touched.username && !errors.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group
                        id="email"
                        className="mb-4"
                        controlId="validationFormikEmail"
                      >
                        <Form.Label>Email</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text id="inputGroupPrependEmail">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control
                            type="email"
                            name="email"
                            aria-describedby="inputGroupPrependEmail"
                            placeholder="Email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            autoFocus
                            required
                            isInvalid={!!errors.email}
                            isValid={touched.email && !errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group
                        id="password"
                        className="mb-4"
                        controlId="validationFormikPassword"
                      >
                        <Form.Label>Mật khẩu</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text id="inputGroupPrependPassword">
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control
                            aria-describedby="inputGroupPrependPassword"
                            required
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.password}
                            isValid={touched.password && !errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <Form.Group
                        id="confirmPassword"
                        className="mb-4"
                        controlId="validationFormikResetPassword"
                      >
                        <Form.Label>Xác nhận Mật Khẩu</Form.Label>
                        <InputGroup hasValidation>
                          <InputGroup.Text id="inputGroupPrependConfirmPassword">
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control
                            aria-describedby="inputGroupPrependConfirmPassword"
                            required
                            type="password"
                            placeholder="Mật khẩu"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.confirmPassword}
                            isValid={
                              touched.confirmPassword && !errors.confirmPassword
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>

                      <FormGroup
                        controlIdid="validationFormik0"
                        className="d-flex mb-4"
                      >
                        <FormCheck
                          required
                          type="checkbox"
                          // isInvalid={!!errors.terms}
                          // name="terms"
                          // type="checkbox"
                          // label="Tôi đồng ý với mọi điều khoản dịch vụ."
                          // onChange={handleChange}
                          // isInvalid={!!errors.terms}
                          // feedback={errors.terms}
                          // value={values.terms}
                          // feedbackType="invalid"
                          // id="validationFormik0"
                          // controlId="validationFormikTerms"
                        >
                          <FormCheck.Input
                            type="checkbox"
                            id="terms"
                            name="terms"
                            className="me-2"
                            onChange={handleChange}
                            isInvalid={!!errors.terms && touched.terms}
                            value={values.terms}
                          />

                          <FormCheck.Label htmlFor="terms">
                            Tôi đồng ý{" "}
                            <Card.Link>với mọi điều khoản.</Card.Link>
                          </FormCheck.Label>

                          <Form.Control.Feedback type="invalid">
                            {errors.terms}
                          </Form.Control.Feedback>
                        </FormCheck>
                      </FormGroup>

                      <Button
                        variant="primary"
                        type="submit"
                        className="w-100"
                        disabled={isSubmitting}
                      >
                        Đăng ký
                      </Button>
                    </Form>
                  )}
                </Formik>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">hoặc</span>
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
                    Đã có tài khoản?
                    <Card.Link
                      as={Link}
                      to={Routes.Signin.path}
                      className="fw-bold"
                    >
                      {` Đăng nhập ở đây `}
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
export default Signup;
