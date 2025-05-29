import React from "react";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { useSelector } from "react-redux";
import {Subject} from "../types/subject";
import useFetch from "../hooks/useFetch";
import {setAllSubject} from "../redux/actions/actions";
import {appService} from "../services/appService";
import {authService} from "../services/authService";
import {AxiosResponse} from "axios";

export const Header = () => {
  const subjects = useSelector((state: any) => state.app.subjects);
  useFetch(appService.getAllSubjects, setAllSubject, (state) => state.app.subjects);

  const handleLogout = () => {
    authService.logout().then((response: AxiosResponse<any>) => {
      window.location.href = '/home?message=' + response.data.message;
    });
  };

  return (
    <Navbar fixed="top" bg="dark" data-bs-theme="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">RighTrack.ai</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            {subjects?.length ? (
              <NavDropdown title="Subject" id="navbarScrollingDropdown">
                {subjects.map((subject: Subject) => (
                  <NavDropdown.Item key={subject.id} href={`/subject/${subject.subjectCode}`}>
                    {subject.name}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            ) : null}

          </Nav>
          <Nav>
            <Button onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};