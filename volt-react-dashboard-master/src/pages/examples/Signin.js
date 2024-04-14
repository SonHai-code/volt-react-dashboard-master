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

const Signin = () => {
  let history = useHistory();
  const form = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* Form Validation */
  const [validated, setValidated] = useState(false);

  /* Notificate the invalid authentication */
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    /*When the user fill all two fields*/
    if (form.current.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    AuthService.login(username, password)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          history.push(Routes.DashboardOverview.path);
          window.location.reload();
          console.log(localStorage.getItem("user"));
        }
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setValidated(true);
        setMessage(resMessage);
        history.push(Routes.ServerError.path);
      });
    setValidated(true);
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

                <Form
                  ref={form}
                  className="mt-4"
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Tên đăng nhập</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUser} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Tên đăng nhập"
                        required
                        autoFocus
                        value={username}
                        onChange={onChangeUsername}
                      />
                      <Form.Control.Feedback type="invalid">
                        Trường này không thể bỏ trống!
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Mật khẩu</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control
                          required
                          type="password"
                          placeholder="Mật khẩu"
                          value={password}
                          onChange={onChangePassword}
                        />

                        <Form.Control.Feedback type="invalid">
                          Trường này không được bỏ trống
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Form.Group>

                    {message && <Alert variant="warning">{message}</Alert>}

                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input id="defaultCheck5" className="me-2" />
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
