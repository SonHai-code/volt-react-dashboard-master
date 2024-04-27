import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb, Col, Form, Row } from "@themesberg/react-bootstrap";

import { Calendars } from "../components/Calendars";

import { listDepartmentNames } from "../services/DepartmentService";

export default () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");

  const retrieveData = async () => {
    try {
      let response = await listDepartmentNames();
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(retrieveData, []);

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
            <Breadcrumb.Item active>
              Quản lý lịch làm việc phòng ban
            </Breadcrumb.Item>
          </Breadcrumb>
          <h4>Lịch làm việc phòng ban </h4>
        </div>
      </div>

      <Form>
        <Row>
          <Col md={3} className="mb-3">
            <Form.Group id="department">
              <Form.Select
                name="department"
                defaultValue="null"
                onChange={(e) => setName(e.target.value)}
              >
                <option value="">Chọn phòng ban</option>

                {data.map((opt) => (
                  <option value={opt}>{opt}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={2} className="mb-3">
            <Form.Group id="year">
              <Form.Select name="year" defaultValue="null">
                <option value="2024">Chọn năm</option>
                <option value="VP01">2024</option>
                <option value="VP02">2023</option>
                <option value="VP03">2022</option>
                <option value="VP04">2021</option>
                <option value="VP05">2020</option>
                <option value="VP06">2019</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      {name ? (
        <Calendars name={name} />
      ) : (
        // <Calendars name={name} />
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <p className="text-sm">
            Vui lòng lựa chọn phòng ban để xem lịch làm việc
          </p>
        </div>
      )}
      {/* <ShiftTable />
      <DepartmentTable /> */}
    </>
  );
};
