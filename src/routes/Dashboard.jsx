import React from "react";
import Avatar from "react-avatar";
import { Card, Button, Stack } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const { tutorName, avatarUrl } = useLoaderData();
  return (
    <>
      <Card className="shadow-sm">
        <Card.Body>
          <Stack direction="horizontal">
            <Card.Text className="display-6 fw-bold m-0">
              Welcome back, {tutorName}
            </Card.Text>
            <Button variant="none" className="ms-auto">
              feature 1
            </Button>
            <Button variant="none">feature 2</Button>
            <Avatar name="Phong" size="30" src={avatarUrl} round />
          </Stack>
        </Card.Body>
      </Card>

      <Card className="shadow-sm mt-2">
        <Card.Body>{/* <HomeTabContent /> */}</Card.Body>
      </Card>
    </>
  );
}
