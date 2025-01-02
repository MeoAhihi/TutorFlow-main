import React from "react";
import { Col, Row, Button, Card, Image } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";

export default function AssignmentTabContent() {
  const { assignments } = useLoaderData();
  console.log(assignments);
  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <Button>
          <PlusCircle /> Create
        </Button>
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            title={assignment.title}
            dueDate={assignment.dueDate ? new Date(assignment.dueDate) : null}
            postDate={new Date(assignment.createdAt)}
            description={assignment.content}
            files={JSON.parse(assignment.attachedFiles)}
          />
        ))}
      </Col>
    </Row>
  );
}

const AssignmentFile = ({ fileName, fileType, fileThumbnailUrl }) => (
  <Col xs={3}>
    <Card className="p-0 mb-2 d-flex flex-row">
      <Image
        src={fileThumbnailUrl}
        style={{ width: 100, height: 100, objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Text>{fileName}</Card.Text>
        <Card.Text>{fileType}</Card.Text>
      </Card.Body>
    </Card>
  </Col>
);

const AssignmentCard = ({ title, dueDate, postDate, description, files }) => (
  <Card className="my-3">
    <Card.Header className="d-flex justify-content-between">
      <Card.Title>{title}</Card.Title>

      <Card.Text>
        {dueDate ? "Due on " + dueDate.toISOString().substring(0, 10) : ""}
      </Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text style={{ fontSize: "smaller", color: "#555", margin: 0 }}>
        Posted on {postDate.toISOString().substring(0, 10)}
      </Card.Text>
      <Card.Text dangerouslySetInnerHTML={{ __html: description }}></Card.Text>
      <Row>
        {files
          ? files.map(({ name, type, thumbnailUrl }, i) => (
              <AssignmentFile
                key={i}
                fileName={name}
                fileType={type}
                fileThumbnailUrl={thumbnailUrl}
              />
            ))
          : null}
      </Row>
    </Card.Body>
  </Card>
);
