import { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import { createViewWeek } from "@schedule-x/calendar";
import { useLoaderData } from "react-router-dom";

import "@schedule-x/theme-default/dist/index.css";
import {
  getClassId,
  getSchedulesDefault,
  getSchedulesOffset,
} from "../api/classes.api";
import { day2Date } from "../utils/formatDate";

const to2digits = (number) => ("0" + number).slice(-2);
const toEventDate = (date) =>
  `${date.getFullYear()}-${to2digits(date.getMonth() + 1)}-${to2digits(
    date.getDate()
  )}`;
const toEventTime = (time) =>
  `${to2digits(date.getHours())}:${to2digits(date.getMinutes())}`;

export async function loader({ params }) {
  try {
    const classInfo = await getClassId(params.classId);
    const defaultSchedules = await getSchedulesDefault(params.classId);
    const offsetSchedules = await getSchedulesOffset(params.classId);
    return {
      startDate: day2Date("mon"),
      endDate: day2Date("sun"),
      classInfo: classInfo.data.class,
      defaultSchedules: defaultSchedules.data.DefaultSchedules.map(
        ({ id, day, startTime, endTime }) => ({
          id,
          startTime,
          endTime,
          date: day2Date(day),
        })
      ),
      offsetSchedules: offsetSchedules.data.OffsetSchedules,
    };
  } catch (error) {
    console.log(error);
  }
}

export default function ScheduleTabContent() {
  const { defaultSchedules, offsetSchedules, classInfo, startDate, endDate } =
    useLoaderData();
  console.log(
    "default",
    defaultSchedules
      .toSorted((ds1, ds2) => ds1.date - ds2.date)
      .map(({ id, startTime, endTime, date }, i) => ({
        id,
        title: "Day " + (i + 1),
        start: toEventDate(date) + " " + startTime,
        end: toEventDate(date) + " " + endTime,
      }))
  );
  const [classes, setClasses] = useState();

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
    events: defaultSchedules
      .toSorted((ds1, ds2) => ds1.date - ds2.date)
      .map(({ id, startTime, endTime, date }, i) => ({
        id,
        title: "Day " + (i + 1),
        start: toEventDate(date) + " " + startTime,
        end: toEventDate(date) + " " + endTime,
      })),
    dayBoundaries: {
      start: "06:00",
      end: "22:00",
    },
    weekOptions: {
      gridHeight: 800,
    },
    minDate: toEventDate(startDate),
    maxDate: toEventDate(endDate),
  });

  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        {JSON.stringify(classes)}
        <hr />
        {}
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
