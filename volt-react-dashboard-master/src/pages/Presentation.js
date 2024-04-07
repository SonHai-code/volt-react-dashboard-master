import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faExternalLinkAlt,
  faTimesCircle,
  faCheckCircle,
  faCalendarAlt,
  faCodeBranch,
  faShoppingCart,
  faFolder,
  faMapMarkedAlt,
  faPager,
  faFileCode,
  faDownload,
  faCamera,
  faCameraRetro,
  faShieldAlt,
  faTable,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBootstrap,
  faGithub,
  faJs,
  faReact,
  faSass,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  Container,
  ListGroup,
  Tooltip,
  OverlayTrigger,
  Form,
  Navbar,
  Nav,
  Badge,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import Code from "../components/CodeEditor";
import GitHubButton from "react-github-btn";

import { Routes } from "../routes";
import ThemesbergLogoIcon from "../assets/img/themesberg.svg";
import ThemesbergLogo from "../assets/img/themesberg-logo.svg";
import MockupPresentation from "../assets/img/mockup-presentation.png";
import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import MapboxImg from "../assets/img/mockup-map-presentation.png";
import CalendarImg from "../assets/img/mockup-calendar-presentation.png";
import ReactMockupImg from "../assets/img/react-mockup.png";
import BS5IllustrationsImg from "../assets/img/illustrations/bs5-illustrations.svg";
import BS5Logo from "../assets/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "../assets/img/technologies/react-logo.svg";
import pages from "../data/pages";
import features from "../data/features";

export default () => {
  return (
    <>
      <section
        className="section-header overflow-hidden pt-5 pt-lg-6 pb-9 pb-lg-12 bg-primary text-white"
        id="home"
      >
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <div className="react-big-icon d-none d-lg-block">
                <span className="fab fa-react"></span>
              </div>
              <h1 className="fw-bolder text-secondary">
                Hệ thống quản lý nhân viên
              </h1>
              <p className="text-muted fw-light mb-5 h5">
                Nhanh chóng, thuận tiện hơn bao giờ hết cùng với việc tích hợp
                sử dụng Al Camera.
              </p>
            </Col>
          </Row>
          <figure className="position-absolute bottom-0 left-0 w-100 d-none d-md-block mb-n2">
            <svg
              className="fill-soft"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 3000 185.4"
            >
              <path d="M3000,0v185.4H0V0c496.4,115.6,996.4,173.4,1500,173.4S2503.6,115.6,3000,0z" />
            </svg>
          </figure>

          <div className="d-flex align-items-center justify-content-center mb-5">
            <Button
              variant="secondary"
              as={Link}
              to={Routes.Signin.path}
              className="text-dark me-3"
            >
              Bắt đầu sử dụng{" "}
              <FontAwesomeIcon
                icon={faExternalLinkAlt}
                className="d-none d-sm-inline ms-1"
              />
            </Button>
          </div>
        </Container>
      </section>
      <div className="section pt-0">
        <Container className="mt-n10 mt-lg-n12 z-2">
          <Row className="justify-content-center">
            <Col xs={12}>
              <Image src={MockupPresentation} alt="Mockup presentation" />
            </Col>
          </Row>
          <Row className="justify-content-center mt-5 mt-lg-6">
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faShieldAlt} />
              </div>
              <h3 className="fw-bolder">Bảo mật</h3>
              <p className="text-gray">Authentication Token</p>
            </Col>
            <Col xs={6} md={3} className="text-center mb-4">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faCameraRetro} />
              </div>
              <h3 className="fw-bolder">Al Camera</h3>
              <p className="text-gray">
                Xử lý ảnh chính xác và các góc độ khác nhau của khuôn mặt
              </p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faTable} />
              </div>
              <h3 className="fw-bolder">Tables</h3>
              <p className="text-gray">Quản lý nhân viên thông qua các bảng</p>
            </Col>
            <Col xs={6} md={3} className="text-center">
              <div className="icon icon-shape icon-lg bg-white shadow-lg border-light rounded-circle mb-4">
                <FontAwesomeIcon icon={faSeedling} />
              </div>
              <h3 className="fw-bolder">Giao diện</h3>
              <p className="text-gray">Thân thiện với người sử dụng</p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
