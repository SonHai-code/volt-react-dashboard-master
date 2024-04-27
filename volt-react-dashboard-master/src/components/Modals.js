import { Button, Modal } from "@themesberg/react-bootstrap";
import React, { useEffect, useState } from "react";
import { EventCalendarForm } from "./Forms";
import {
  listAllShiftCodesDistinct,
  listShiftsSorted,
} from "../services/ShiftService";

export const AddEventsCalendarModal = (props) => {
  const [datas, setDatas] = useState([]);

  const retrieveDatas = async () => {
    try {
      let response = await listAllShiftCodesDistinct();

      setDatas(response.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(retrieveDatas, []);

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <EventCalendarForm data={datas} name={props.name} />
      </Modal.Body>
    </Modal>
  );
};
