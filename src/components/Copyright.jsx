import { Facebook, Twitter, Google, Linkedin } from "react-bootstrap-icons";

export default function Copyright() {
  return (
    <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
      <div className="text-white mb-3 mb-md-0">
        Copyright © 2025. All rights reserved.
      </div>
      <div>
        <a href="#!" className="text-white me-4">
          <Facebook />
        </a>
        <a href="#!" className="text-white me-4">
          <Twitter />
        </a>
        <a href="#!" className="text-white me-4">
          <Google />
        </a>
        <a href="#!" className="text-white">
          <Linkedin />
        </a>
      </div>
    </div>
  );
}
