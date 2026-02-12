import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import "./Sidebarnavigation.css";

function Sidebarnavigation({ to, label, Icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `sidebar-nav-link${isActive ? " is-active" : ""}`
      }
    >
      {Icon ? <Icon /> : null}
      <h2 className="navigation-text">{label}</h2>
    </NavLink>
  );
}

Sidebarnavigation.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.elementType,
  onClick: PropTypes.func,
};

export default Sidebarnavigation;