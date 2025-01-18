import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { EditorState } from "draft-js";
import { useState } from "react";
import { Button, Card, Col, Modal, Row, Table } from "react-bootstrap";
import { ChevronDown, ChevronUp, PencilSquare } from "react-bootstrap-icons";
import { Editor } from "react-draft-wysiwyg";
import { useLoaderData } from "react-router-dom";

import { getClassId } from "../api/classes.api";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";

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
  const [publicId, setPublicId] = useState("");

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
              publicId={publicId}
              setPublicId={setPublicId}
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

function UpdateWallpaperModal({ show, handleClose, publicId, setPublicId }) {
  // Configuration
  const cloudName = "hzxyensd5";
  const uploadPreset = "aoh4fpwm";

  // Cloudinary configuration
  const cld = new Cloudinary({
    cloud: {
      cloudName,
    },
  });

  // Upload Widget Configuration
  const uwConfig = {
    cloudName,
    uploadPreset,
    // Uncomment and modify as needed:
    // cropping: true,
    // showAdvancedOptions: true,
    // sources: ['local', 'url'],
    // multiple: false,
    // folder: 'user_images',
    // tags: ['users', 'profile'],
    // context: { alt: 'user_uploaded' },
    // clientAllowedFormats: ['images'],
    // maxImageFileSize: 2000000,
    // maxImageWidth: 2000,
    // theme: 'purple',
  };

  const img = cld
    .image("cld-sample-5")
    .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

  // return <AdvancedImage cldImg={img} />;
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update Wallpaper Image</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
        {/* Preview image  */}
        <AdvancedImage
          style={{ maxWidth: "100%" }}
          cldImg={cld.image(publicId)}
          plugins={[responsive(), placeholder()]}
        />
      </Modal.Body>
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
