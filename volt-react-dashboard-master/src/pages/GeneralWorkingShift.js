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
  OrganizeStructureTable,
  GeneralWorkingShiftTable,
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
            <Breadcrumb.Item active>Tổng hợp công</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Tổng hợp công</h4>
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
        <Row className="justify-content-between">
          <Col xs={2.4} md={2} lg={1} xl={4} sm={0.5}>
            <Form.Select
              aria-label="Default select example"
              aria-labelledby="Chọn năm"
            >
              <option disabled>Năm</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </Form.Select>
          </Col>

          <Col xs={2.4} md={2} lg={1} xl={4} sm={0.5}>
            <Form.Select
              aria-label="Default select example"
              aria-labelledby="Chọn tháng"
            >
              <option disabled>Chọn tháng</option>
              <option value="1">Tháng 1</option>
              <option value="2">Tháng 2</option>
              <option value="3">Tháng 3</option>
              <option value="4">Tháng 4</option>
              <option value="5">Tháng 5</option>
              <option value="6">Tháng 6</option>
              <option value="7">Tháng 7</option>
              <option value="8">Tháng 8</option>
              <option value="9">Tháng 9</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </Form.Select>
          </Col>

          <Col xs={2.4} md={2} lg={1} xl={4} sm={0.5}>
            <Form.Select
              aria-label="Default select example"
              aria-labelledby="Chọn tháng"
            >
              <option disabled>Chọn phòng ban</option>
              <option value="1">Phòng ban 1</option>
              <option value="2">Phòng ban 2</option>
              <option value="3">Phòng ban 3</option>
            </Form.Select>
          </Col>

          <Col xs={2.4} md={2} lg={1} xl={4}>
            <InputGroup>
              <InputGroup.Text>
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Tìm kiếm"
                onChange={onChangeSearchPersonName}
                value={search}
                name="search"
              />
            </InputGroup>
          </Col>

          <Col xs={3.6} md={4} lg={3} xl={1} className="ps-md-0 text-end">
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
      <p>General Working Shift Structure section</p>
      <GeneralWorkingShiftTable />
    </>
  );
};
