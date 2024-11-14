import React, { useState } from "react";
import { Image, Modal, Button } from "react-bootstrap";

export default function Feedback({
  feedbackType,
  time,
  content,
  attachedImgUrl,
}) {
  const [modalShow, setModalShow] = useState(false);
  return (
    <div className="d-flex flex-row justify-content-between">
      <div>
        <p className="fw-bold mb-0">{feedbackType}</p>
        <p className="text-muted">{time}</p>
        <p>{content}</p>
      </div>
      {attachedImgUrl && (
        <FeedbackImage
          show={modalShow}
          setModalShow={setModalShow}
          src={attachedImgUrl}
        />
      )}
    </div>
  );
}

function FeedbackImage({ show, setModalShow, src }) {
  return (
    <>
      <Image
        style={{
          objectFit: "cover",
          aspectRatio: "1 / 1",
          height: "10em",
          cursor: "pointer",
        }}
        src={src}
        thumbnail
        className="ms-5"
        onClick={() => {
          setModalShow(true);
        }}
      />
      <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={() => setModalShow(false)}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-truncate"
          >
            {src}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src={src} className="w-100" />
        </Modal.Body>
      </Modal>
    </>
  );
}
