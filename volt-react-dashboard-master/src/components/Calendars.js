import React, { startTransition, useEffect, useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { AddEventsCalendarModal } from "./Modals";
import { listAllShiftsByDepartmentName } from "../services/DepartmentService";

function renderEventContent(eventInfo) {
  return (
    <div className="bg-blue text-white p-3 w-100">
      <b>{eventInfo.timeText}</b>

      <i>{eventInfo.event.title} </i>
    </div>
  );
}

// Rendered in Calendars PAGE
export const Calendars = ({ name }) => {
  const [events, setEvents] = useState([]);
  const [datas, setDatas] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const retrieveDatas = () => {
    listAllShiftsByDepartmentName(name)
      .then((response) => {
        setDatas(response.data);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(retrieveDatas, [name]);

  useEffect(() => {
    const eventDatas = [];

    datas.forEach((data) => {
      data.dates.forEach((date) => {
        eventDatas.push({
          title: data.code,
          start: date + "T" + data.startedTime,
          end: date + "T" + data.finishedTime,
        });
      });
    });

    setEvents(eventDatas);
  }, [datas]);

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        locales="vi"
        headerToolbar={{
          left: "prev,next today addEventButton",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
        events={events}
        eventContent={renderEventContent}
        customButtons={{
          addEventButton: {
            text: "Thêm ca làm việc",
            click: () => {
              setModalShow(true);
              // setEvents([
              //   ...events,
              //   {
              //     title: "event",
              //     start: new Date(),
              //   },
              // ]);
            },
          },
        }}
      />

      <AddEventsCalendarModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        name={name}
      />
    </>
  );
};
