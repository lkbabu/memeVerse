import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../util/authorization";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const header = user ? (
    <Menu stackable size="huge" color="green">
      <Menu.Item header>MemeVerse</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name={user.username} active as={Link} to="/">
          {user.username}
        </Menu.Item>

        <Menu.Item name="Logout" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu stackable size="huge" color="green">
      <Menu.Item header>MemeVerse</Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        >
          Home
        </Menu.Item>

        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        >
          Login
        </Menu.Item>

        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        >
          Register
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  return header;
};

export default Header;
