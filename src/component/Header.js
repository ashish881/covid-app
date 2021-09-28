import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../action/userAction";

function Header(props) {
  const user = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const { userInfo } = user;

  console.log("11111111111111111111", userInfo);
  const logoutHandler = () => {
    dispatch(userLogout());
    // props.history.push("/login");
  };
  return (
    <div className="navbar1">
      <Container>
        <Navbar expand="lg">
          <LinkContainer to="/">
            <Navbar.Brand>Covid App</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {/* Dropdown Menu*/}
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user">Login</i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}

export default Header;
