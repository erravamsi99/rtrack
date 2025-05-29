import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

export const UnauthenticatedHeader = () => {
  const url = window.location.href;
  const page = url.split('/').pop();

  return (
    <Navbar fixed="top" bg="dark" data-bs-theme="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/home">RighTrack.ai</Navbar.Brand>
        {page !== 'login' ? (
          <>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ml-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : null}
      </Container>
    </Navbar>
  );
};