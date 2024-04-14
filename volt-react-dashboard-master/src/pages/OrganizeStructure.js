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
} from "../components/Tables";
import { useSyncExternalStore } from "react";
import Calendars from "../components/Calendars";

export default () => {
  const [search, setSearch] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [size, setSize] = useState(5);

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
      </div>

      <p>organize structure section</p>
      <OrganizeStructureTable />
    </>
  );
};
