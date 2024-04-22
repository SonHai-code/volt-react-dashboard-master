import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
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
import { Link } from "react-router-dom";
import { Routes } from "../../routes";
import { Formik } from "formik";
import { forgotPassword } from "../../services/PasswordService";
import Preloader from "../../components/Preloader";

export default () => {
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const onSubmit = async (values) => {
    let response;
    try {
      response = await forgotPassword(values.email);
      setMessage(response.data);
      setSuccess(true);

      console.log(response.data);
    } catch (err) {
      const errMessage = err.response.data;
      setMessage(errMessage);
      setSuccess(false);
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => setLoaded(true), 1000);
  //   console.log(loaded);
  //   return () => clearTimeout(timer);
  // }, [loaded]);

  return (
    <div>
      {/* <Preloader show={loaded ? false : true} /> */}
      <main>
        <section className="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
          <Container>
            <Row className="justify-content-center">
              <p className="text-center">
                <Card.Link
                  as={Link}
                  to={Routes.Signin.path}
                  className="text-gray-700"
                >
                  <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Quay
                  lại đăng nhập
                </Card.Link>
              </p>
              <Col
                xs={12}
                className="d-flex align-items-center justify-content-center"
              >
                <div className="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                  <h3>Quên mật khẩu?</h3>

                  <p className="mb-4">
                    Nhập địa chỉ email của bạn, rồi mã xác nhận sẽ được gửi tới
                    địa chỉ email của bạn.
                  </p>

                  <Formik
                    onSubmit={onSubmit}
                    initialValues={{
                      email: "",
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
                      <div>
                        {message && success ? (
                          <Alert variant="success">{message}</Alert>
                        ) : (
                          <Form onSubmit={handleSubmit}>
                            <div className="mb-4">
                              <Form.Label htmlFor="email">Email</Form.Label>
                              <InputGroup id="email">
                                <Form.Control
                                  required
                                  autoFocus
                                  type="email"
                                  name="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  placeholder="example@company.com"
                                />
                              </InputGroup>
                            </div>
                            {message && !success && (
                              <Alert variant="warning">{message}</Alert>
                            )}
                            <Button
                              variant="primary"
                              type="submit"
                              className="w-100"
                            >
                              Khôi phục mật khẩu
                            </Button>
                          </Form>
                        )}
                      </div>
                    )}
                  </Formik>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </main>
    </div>
  );
};
