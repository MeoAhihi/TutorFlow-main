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
        {[1, 2, 3].map((i) => (
          <AssignmentCard
            key={i}
            title={"Title"}
            dueDate={new Date()}
            postDate={new Date("2024-10-30")}
            description={
              "Lorem ipsum dolor sit amet consectetur, adipisicing elit. " +
              "Consequatur nam reprehenderit amet quis error temporibus " +
              "debitis quae delectus corrupti ullam? Soluta explicabo totam " +
              "fuga eos quam, iure ab asperiores alias."
            }
            files={[1, 2]}
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
      <Card.Text>Due on {dueDate.toISOString().substring(0, 10)}</Card.Text>
    </Card.Header>
    <Card.Body>
      <Card.Text style={{ fontSize: "smaller", color: "#555", margin: 0 }}>
        Posted on {postDate.toISOString().substring(0, 10)}
      </Card.Text>
      <Card.Text>{description}</Card.Text>
      <Row>
        {files.map((i) => (
          <AssignmentFile
            key={i}
            fileName={"File name"}
            fileType={"File type"}
            fileThumbnailUrl={
              "/public/assets/1Screenshot 2024-09-26 161431.png"
            }
          />
        ))}
      </Row>
    </Card.Body>
  </Card>
);
