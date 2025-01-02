import { Col } from "react-bootstrap";
export default function OverviewTabContent() {
  return (
    <>
      <h5 className="mb-3">Biography</h5>
      <p className="lead mb-3">
        Ethan Leo is a seasoned and results-driven Project Manager who brings
        experience and expertise to project management. With a proven track
        record of successfully delivering complex projects on time and within
        budget, Ethan Leo is the go-to professional for organizations seeking
        efficient and effective project leadership.
      </p>
      <h5 className="mb-3">Basic Information</h5>
      <div className="row g-0 mb-3">
        <TabularRow field="First Name" value="Ethan" />
        <TabularRow field="Last Name" value="Leo" />
        <TabularRow field="Address" value="Mountain View, California" />
        <TabularRow field="Country" value="Vietnam" />
        <TabularRow field="Phone" value="+1 (248) 679-8745" />
        <TabularRow field="Email" value="leo@example.com" />
      </div>

      <h5 className="mb-3">Professional Information</h5>
      <div className="row g-0">
        <TabularRow field="Education" value="M.S Computer Science" />
        <TabularRow field="Subject of Specialized" value="Mathematics" />
        <TabularRow
          field="Grade Levels Taught"
          value="Middle school, High school"
        />
      </div>
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
