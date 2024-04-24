import { Button, Modal } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { EventCalendarForm } from "./Forms";
import { listShiftsSorted } from "../services/ShiftService";

export const AddEventsCalendarModal = (props) => {
  const [datas, setDatas] = useState([]);

  const getRequestParams = (sort) => {
    let params = {};

    if (sort) {
      params["sort"] = sort;
    }
    return params;
  };

  const retrieveDatas = async () => {
    const params = getRequestParams("code,asc");
    try {
      let response = await listShiftsSorted(params);

      setDatas(response.data);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(retrieveDatas, []);

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <EventCalendarForm data={datas} />
      </Modal.Body>
    </Modal>
  );
};
