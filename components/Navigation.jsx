import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Link className='navbar-brand' href="/">Sierrah Scarpine</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className='nav-link' href="/">Home</Link>
            <Link className='nav-link' href="/specialties">Specialties</Link>
            <Link className='nav-link' href="/sierrahScarpine">Sierrah Scarpin</Link>
            <Link className='nav-link' href="/contact">Contact Us</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
