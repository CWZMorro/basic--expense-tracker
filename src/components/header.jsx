import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
  return (
    <Navbar expand="lg" className="bg-secondary body-tertiary">
      <Container>
        <Navbar.Brand >MORRO'S EXPENSE TRACKER APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav>Created by: Morro Granger Chase</Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};