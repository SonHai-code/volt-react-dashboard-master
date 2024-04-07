import React from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

const events = [{ title: "Meeting", start: new Date() }];

export const Calendars = () => {
  return (
    <div>
      <FullCalendar
        eventContent={renderEventContent}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        weekNumbers
        locales="vi"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
        }}
      />
    </div>
  );
};
