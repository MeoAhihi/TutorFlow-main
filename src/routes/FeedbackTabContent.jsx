import React from "react";
import moment from "moment";
import { Stack } from "react-bootstrap";

import Feedback from "../components/Feedback";
import FeedbackForm from "../components/FeedbackForm";

export default function FeedbackTabContent({ feedbackData }) {
  return (
    <>
      <h2>Add Feedback</h2>
      <FeedbackForm />
      <hr className="mb-5 mt-3" />
      <h2>Feedbacks</h2>
      <Stack className="gap-5 mx-5">
        {feedbackData && feedbackData.length
          ? feedbackData.map((fb) => (
              <Feedback
                key={fb.time}
                feedbackType={fb.type}
                time={moment(fb.time).fromNow()}
                content={fb.content}
                attachedImgUrl={fb.imgUrl}
              />
            ))
          : "No feedbacks"}
      </Stack>
    </>
  );
}
