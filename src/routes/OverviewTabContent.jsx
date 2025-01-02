import React from "react";
import { Col } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
export default function OverviewTabContent() {
  const { student, profile } = useLoaderData();
  console.log("OverviewTabContent", student, profile);
  return (
    <>
      <h5 className="mb-3">Biography</h5>
      <p className="lead mb-3">{student.biography}</p>
      <h5 className="mb-3">Basic Information</h5>
      <div className="row g-0 mb-3">
        <TabularRow field="First Name" value={student.firstName} />
        <TabularRow field="Last Name" value={student.lastName} />
        <TabularRow field="Address" value={student.address} />
        <TabularRow field="Country" value={student.country} />
        <TabularRow field="Phone" value={student.phoneNumber} />
        <TabularRow field="Email" value={student.email} />
      </div>

      {/* <h5 className="mb-3">Professional Information</h5>
      <div className="row g-0">
        <TabularRow field="Education" value="M.S Computer Science" />
        <TabularRow field="Subject of Specialized" value="Mathematics" />
        <TabularRow
          field="Grade Levels Taught"
          value="Middle school, High school"
        />
      </div> */}
    </>
  );
}

function TabularRow({ field, value }) {
  return (
    <>
      <Col
        xs={5}
        md={3}
        className="bg-light border-bottom border-white border-3"
      >
        <div className="p-2">{field}</div>
      </Col>
      <Col
        xs={7}
        md={9}
        className="bg-light border-start border-bottom border-white border-3"
      >
        <div className="p-2">{value}</div>
      </Col>
    </>
  );
}
