import { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { Card, Table, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { ChevronUp, ChevronDown, PencilSquare } from "react-bootstrap-icons";
import { useLoaderData } from "react-router-dom";
import { getClassId } from "../api/classes.api";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

// require("dotenv").config();
import { config } from "dotenv";
config();
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
//   api_key: import.meta.env.CLOUDINARY_API_KEY,
//   api_secret: import.meta.env.CLOUDINARY_API_SECRET,
// });

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
  const cld = new Cloudinary({ cloud: { cloudName: "devdv6ceh" } });

  const img = cld
    .image("cld-sample-5")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  const { name, createdAt, subject, description, type } = useLoaderData();
  const [showInfo, setShowInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const toggleShowInfo = () => setShowInfo(!showInfo);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const handleShowModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  return (
    <Row className="justify-content-center">
      <Col xs={10}>
        <Card className="mb-4">
          <AdvancedImage cldImg={img} />;
          <Card.Img
            src="http://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg"
            style={{
              height: "12rem",
              objectFit: "cover",
            }}
          />
          <Card.ImgOverlay>
            <Button
              variant="light"
              className="pt-1 pb-2"
              onClick={handleShowModal}
            >
              <PencilSquare />
            </Button>
            <UpdateWallpaperModal
              show={showModal}
              handleClose={handleClose}
              handleSave={console.log}
            />
          </Card.ImgOverlay>
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

function UpdateWallpaperModal({ show, handleClose, handleSave }) {
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.CLOUDINARY_CLOUD_NAME },
  });
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSave(imageUrl);
  };

  const img = cld
    .image("cld-sample-5")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  // return <AdvancedImage cldImg={img} />;
  return (
    <Modal show={show} onHide={handleClose}>
      <AdvancedImage cldImg={img} />
    </Modal>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Update Wallpaper Image</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Group controlId="formImageUrl" className="mb-3">
    //         <Form.Label className="mb-3">Image URL</Form.Label>
    //         <Form.Control
    //           type="file"
    //           label="Choose file"
    //           className="mb-3"
    //           onChange={(e) => {
    //             const file = e.target.files[0];
    //             if (file) {
    //               const reader = new FileReader();
    //               reader.onloadend = () => {
    //                 setImageUrl(reader.result);
    //               };
    //               reader.readAsDataURL(file);
    //             }
    //           }}
    //         />
    //       </Form.Group>
    //       <Button variant="primary" type="submit">
    //         Save Changes
    //       </Button>
    //     </Form>
    //   </Modal.Body>
    // </Modal>
  );
}
