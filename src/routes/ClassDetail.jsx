import { Row, Tabs, Tab, Card } from "react-bootstrap";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import NotificationTabContent from "../components/NotificationTabContent";
import StudentTabContent from "../components/StudentTabContent";
import ScheduleTabContent from "../components/ScheduleTabContent";
import AssignmentTabContent from "../components/AssignmentTabContent";
import SessionTabContent from "../components/SessionTabContent";

export default function ClassDetail() {
  const tabs = [
    {
      key: "noti",
      title: "Notification",
      children: <NotificationTabContent />,
    },
    {
      key: "students",
      title: "Students",
      children: <StudentTabContent />,
    },
    {
      key: "schedule",
      title: "Schedule",
      children: <ScheduleTabContent />,
    },
    {
      key: "assignment",
      title: "Assignment",
      children: <AssignmentTabContent />,
    },
    {
      key: "session",
      title: "Session",
      children: <SessionTabContent />,
    },
    {
      key: "resource",
      title: "Resource",
      children: (
        <iframe
          src="https://drive.google.com/embeddedfolderview?id=1vbGvSNIdE4NMV17PnR8VDSwOBJqmKIxq#grid"
          className="w-100 vh-100"
        />
      ),
    },
  ];

  return (
    <Card borser="light" className="shadow-sm">
      <Card.Body className="p-4">
        <Tabs defaultActiveKey="assignment" id="profile-tabs" className="mb-4">
          {tabs.map(({ key, title, children }) => (
            <Tab eventKey={key} title={title}>
              {children}
            </Tab>
          ))}
        </Tabs>

        <Row className="justify-content-center"></Row>
      </Card.Body>
    </Card>
  );
}
