import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCog,
  faHome,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
} from "@themesberg/react-bootstrap";

import {
  TransactionsTable,
  CheckInLogTable,
  ShiftTable,
} from "../components/Tables";
import { useSyncExternalStore } from "react";
import Calendars from "../components/Calendars";

export default () => {
  const [search, setSearch] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [size, setSize] = useState(10);

  const pageSizes = [5, 10, 15];

  const onChangeSearchPersonName = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    setSize(e.target.value);
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-md-0">
          <Breadcrumb
            className="d-none d-md-inline-block"
            listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}
          >
            <Breadcrumb.Item>
              <FontAwesomeIcon icon={faHome} />
            </Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
            <Breadcrumb.Item active>Quản lý ca làm việc</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Ca làm việc</h4>
        </div>
        <div className="btn-toolbar mb-2 mb-md-0">
          <ButtonGroup>
            <Button variant="outline-primary" size="sm">
              Share
            </Button>
            <Button variant="outline-primary" size="sm">
              Export
            </Button>
          </ButtonGroup>
        </div>
      </div>

      <div className="table-settings mb-4">
        <Row className="justify-content-between align-items-center">
          <Col xs={8} md={6} lg={3} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm theo tên"
                onChange={onChangeSearchPersonName}
                value={search}
                name="search"
              />
            </InputGroup>
          </Col>

          <Col xs={4} md={2} xl={1} className="ps-md-0 text-end">
            <Dropdown as={ButtonGroup}>
              <Dropdown.Toggle
                split
                as={Button}
                variant="link"
                className="text-dark m-0 p-0"
              >
                <span className="icon icon-sm icon-gray">
                  <FontAwesomeIcon icon={faCog} />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="dropdown-menu-xs dropdown-menu-right"
                onClick={handleSelect}
                value={pageSizes}
              >
                {pageSizes.map((size, index) => {
                  return (
                    <Dropdown.Item
                      className="fw-bold"
                      key={size}
                      as="button"
                      value={size}
                      onClick={() => setCurrentIndex(index)}
                    >
                      {size}
                      {index === currentIndex && (
                        <span className="icon icon-small ms-auto">
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                      )}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </div>
      <ShiftTable searchTitle={search} size={size} />
      {/* <Calendars /> */}
    </>
  );
};
