import { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import { getClassId } from "../api/classes.api";

export async function loader({ params }) {
  try {
    const classInfo = await getClassId(params.classId);
    return {
      name: classInfo.data.class.name,
      createdAt: Date(classInfo.data.class.createdAt),
      description: classInfo.data.class.description,
      subject: classInfo.data.class.subject,
      type: classInfo.data.class.type,
    };
  } catch (error) {
    console.log(error);
  }
}

export default function NotificationTabContent() {
  const { name, createdAt, subject, description, type } = useLoaderData();
  const [showInfo, setShowInfo] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <Card className="mb-4">
          <Card.Img
            src="/public/assets/books-bookstore-book-reading-159711.jpeg"
            style={{
              height: "12rem",
              objectFit: "cover",
            }}
          />
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <div>{name}</div>
              <Button onClick={toggleShowInfo} variant="light">
                {showInfo ? <ChevronDown /> : <ChevronUp />}
              </Button>
            </Card.Title>
            {showInfo && (
              <Table>
                <tr>
                  <th width="20%">Created at</th>
                  <td>{createdAt}</td>
                </tr>
                <tr>
                  <th>Subject</th>
                  <td>{subject}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{description}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{type}</td>
                </tr>
              </Table>
            )}
          </Card.Body>
        </Card>
        <Row>
          <Col xs={2}>Side</Col>
          <Col xs={10}>
            <Card>
              <Card.Body>
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  placeholder="Add your notification for student"
                  onEditorStateChange={onEditorStateChange}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
