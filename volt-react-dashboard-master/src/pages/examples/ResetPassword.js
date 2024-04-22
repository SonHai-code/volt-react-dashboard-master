import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faEnvelope,
  faUnlockAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Container,
  InputGroup,
  Alert,
} from "@themesberg/react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Routes } from "../../routes";

import { resetPasswordSchema } from "../../schemas/index";
import { Formik } from "formik";
import { resetPassword } from "../../services/PasswordService";
import { toBeEmpty } from "@testing-library/jest-dom";

export default () => {
  const history = useHistory();
  const [message, setMessage] = useState("");

  const token = history.location.search.split("=")[1];

  const getRequestParams = (token) => {
    let params = {};
    if (token) {
      params["token"] = token;
    }
    return params;
  };

  const onSubmit = async (values) => {
    const params = getRequestParams(token);

    try {
      resetPassword(values.email, values.password, params);
      history.push(Routes.Signin.path);
    } catch (err) {
      console.log(err);

      setMessage(err);
    }
  };

  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <Row className="justify-content-center">
            <p className="text-center">
              <Card.Link
                as={Link}
                to={Routes.Signin.path}
                className="text-gray-700"
              >
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Quay lại
                đăng nhập
              </Card.Link>
            </p>
            <Col
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Đặt lại mật khẩu</h3>
                <Formik
                  onSubmit={onSubmit}
                  validationSchema={resetPasswordSchema}
                  initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
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
                    <Form onSubmit={handleSubmit}>
                      <Form.Group
                        id="email"
                        className="mb-4"
                        controlId="validationFormikEmail"
                      >
                        <Form.Label>Địa chỉ Email</Form.Label>
                        <InputGroup>
                          <InputGroup.Text id="inputGroupEnvelope">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </InputGroup.Text>
                          <Form.Control
                            aria-describedby="inputGroupEnvelope"
                            autoFocus
                            required
                            type="email"
                            placeholder="example@company.com"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
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
                        <InputGroup>
                          <InputGroup.Text id="inputGroupUnlockAlt">
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control
                            aria-describedby="inputGroupUnlockAlt"
                            required
                            type="password"
                            placeholder="*****"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.password}
                            isValid={!errors.password && touched.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      <Form.Group
                        id="confirmPassword"
                        className="mb-4"
                        controlId="validationFormikConfirmPassword"
                      >
                        <Form.Label>Xác nhận lại mật khẩu</Form.Label>
                        <InputGroup>
                          <InputGroup.Text id="inputGroupUnlockAlt_2">
                            <FontAwesomeIcon icon={faUnlockAlt} />
                          </InputGroup.Text>
                          <Form.Control
                            aria-describedby="inputGroupUnlockAlt_2"
                            required
                            type="password"
                            placeholder="*****"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.confirmPassword}
                            isValid={
                              !errors.confirmPassword && touched.confirmPassword
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.confirmPassword}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Form.Group>
                      {message && <Alert variant="warning">{message}</Alert>}
                      <Button variant="primary" type="submit" className="w-100">
                        Đặt lại mật khẩu
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};
