import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewWeek } from "@schedule-x/calendar";

import "@schedule-x/theme-default/dist/index.css";

const defaultFn = (e) => console.log(e.target.value);

export default function ScheduleTabContent() {
  const [classes, setClasses] = useState([
    {
      id: 1,
      title: "Day 1",
    },
    {
      id: 2,
      title: "Day 2",
    },
    {
      id: 3,
      title: "Day 3",
    },
  ]);

  const handleChangeDay = (newDay) =>
    setClasses(
      classes.map((c) => {
        if (c.id !== newDay.id) {
          return c;
        }
        return { ...c, day: newDay.value };
      })
    );

  const handleChangeStartTime = (newStartTime) =>
    setClasses(
      classes.map((c) => {
        if (c.id !== newStartTime.id) {
          return c;
        }
        return { ...c, start: newStartTime.value };
      })
    );

  const handleChangeEndTime = (newEndTime) =>
    setClasses(
      classes.map((c) => {
        if (c.id !== newEndTime.id) {
          return c;
        }
        return { ...c, end: newEndTime.value };
      })
    );

  const calendar = useCalendarApp({
    views: [createViewWeek()],
    events: [
      {
        id: 1,
        title: "Day 1",
        start: "2024-10-29 12:13",
        end: "2024-10-29 14:13",
      },
      {
        id: 2,
        title: "Day 2",
        start: "2024-10-29 17:13",
        end: "2024-10-29 18:13",
      },
      {
        id: 3,
        title: "Day 3",
        start: "2024-11-01 12:13",
        end: "2024-11-01 12:19",
      },
    ],
    dayBoundaries: {
      start: "06:00",
      end: "22:00",
    },
    weekOptions: {
      gridHeight: 800,
    },
  });

  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        {JSON.stringify(classes)}
        <hr />
        {JSON.stringify(
          classes.map((c) => {
            return {
              id: c.id,
              title: c.title,
              start: c.day + " " + c.start,
              end: c.day + " " + c.end,
            };
          })
        )}
        <Form>
          {[1, 2, 3].map((i) => (
            <Row key={i} className="mb-4">
              <Form.Label>Day {i}</Form.Label>
              <Col xs={3}>
                <Form.Select
                  aria-label="Select day"
                  onChange={(e) =>
                    handleChangeDay({ id: i, value: e.target.value })
                  }
                >
                  <option value="2024-10-28">Monday</option>
                  <option value="2024-10-29">Tueday</option>
                  <option value="2024-10-30">Wednesday</option>
                  <option value="2024-10-31">Thursday</option>
                  <option value="2024-11-01">Friday</option>
                  <option value="2024-11-02">Saturday</option>
                  <option value="2024-11-03">Sunday</option>
                </Form.Select>
              </Col>
              :
              <Col xs={3}>
                <Form.Control
                  onChange={(e) =>
                    handleChangeStartTime({ id: i, value: e.target.value })
                  }
                  type="time"
                />
              </Col>
              -
              <Col xs={3}>
                <Form.Control
                  type="time"
                  onChange={(e) =>
                    handleChangeEndTime({ id: i, value: e.target.value })
                  }
                />
              </Col>
            </Row>
          ))}
        </Form>
        {/* <div
          style={{
            height: 600,
            overflow: "scroll",
          }}
        > */}
        <ScheduleXCalendar calendarApp={calendar} />
        {/* </div> */}
      </Col>
    </Row>
  );
}