import React, { useEffect, useState } from "react";
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

import { DetailWorkingShiftTable } from "../components/Tables";
import { Link } from "react-router-dom";
import { Routes } from "../routes";

export default () => {
  const [search, setSearch] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [size, setSize] = useState(10);

  // const [data, setData] = useState([]);

  const pageSizes = [5, 10, 15];

  const onChangeSearchPersonName = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (e) => {
    setSize(e.target.value);
  };

  // const retrieveData = async () => {
  //   let response;

  //   try {
  //     // Example userId = 13

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   async function fetchData() {
  //     let response = await getDetailWorkingShifts(13);
  //     console.log(response.data);
  //     setData(response.data);
  //   }
  //   fetchData();
  // }, []);

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
            <Breadcrumb.Item
              active
              as={Link}
              to={Routes.GeneralWorkingShifts.path}
            >
              Tổng hợp công
            </Breadcrumb.Item>
            <Breadcrumb.Item active>Chi tiết công</Breadcrumb.Item>
          </Breadcrumb>

          <h4>Chi tiết công</h4>
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
      <DetailWorkingShiftTable size={size} searchTitle={search} />
    </>
  );
};
