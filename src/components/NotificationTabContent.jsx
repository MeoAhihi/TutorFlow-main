import React, { useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import { ChevronUp, ChevronDown } from "react-bootstrap-icons";

export default function NotificationTabContent() {
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
            src="/books-bookstore-book-reading-159711.jpeg"
            style={{
              height: "12rem",
              objectFit: "cover",
            }}
          />
          <Card.Body>
            <Card.Title className="d-flex justify-content-between">
              <div>Advance Vector Calculus</div>
              <Button onClick={toggleShowInfo} variant="light">
                {showInfo ? <ChevronDown /> : <ChevronUp />}
              </Button>
            </Card.Title>
            {showInfo && (
              <Table>
                <tr>
                  <th width="20%">Created at</th>
                  <td>18/10/2024 15:44:56</td>
                </tr>
                <tr>
                  <th>Subject</th>
                  <td>Mathematics</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolorum consectetur quidem ipsam, non quibusdam omnis
                    laboriosam porro cumque nemo consequatur ipsum quis sapiente
                    illum nesciunt esse vel rem, fugiat ea?
                  </td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>Offline</td>
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
