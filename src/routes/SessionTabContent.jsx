import { Table } from "react-bootstrap";

export default function SessionTabContent() {
  return (
    <>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Time</th>
            <th>Topics</th>
            <th>Performance</th>
            <th>Behavior</th>
            <th>Emotion</th>
            <th>Motivation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <div className="p-0 text-center">09/10/2024</div>
            <div className="p-0 text-center">16:07:02</div>
          </tr>
        </tbody>
      </Table>
    </>
  );
}
