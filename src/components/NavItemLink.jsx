import { NavItem, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavItemLink({ to, eventKey, label }) {
  return (
    <NavItem>
      <NavLink as={Link} to={to} eventKey={eventKey}>
        {label}
      </NavLink>
    </NavItem>
  );
}
