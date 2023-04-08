import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Sierrah Scarpine</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="specialties">Specialties</Nav.Link>
            <Nav.Link href="sierrahScarpine">Sierrah Scarpin</Nav.Link>
            <Nav.Link href="#">Contact Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


// import Link from 'next/link';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function Navigation() {
//     return (
        
        // <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between p-3 mb-4 border-bottom fixed-top bg-light">
        //     <Link href="/" id='brand' className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
        //     Sierrah Scarpine
        //     </Link>

        //     <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        //         <li><Link href="/" className="nav-link px-2 link-dark">Home</Link></li>
        //         <li><Link href="/specialties" className="nav-link px-2 link-dark">Specialties</Link></li>
        //         <li><Link href="/sierrahScarpine" className="nav-link px-2 link-dark">Sierrah Scarpine</Link></li>
        //     </ul>

        //     <div className="col-md-3 text-end">
        //         <button type="button" className="btn btn-outline-dark btn-sm me-2">Contact Us</button>
        //     </div>
        // </header>
        // <Navbar bg="light" expand="lg" >
        //     <Container fluid>
        //         <Navbar.Brand href="#" classNameName='mx-3'>Real-Estate</Navbar.Brand>
        //         <Navbar.Toggle aria-controls="navbarScroll" />
        //         <Navbar.Collapse id="navbarScroll">
        //             <Nav
        //                 classNameName="me-auto my-2 my-lg-0"
        //                 style={{ maxHeight: '100px' }}
        //                 navbarScroll
        //             >
        //             </Nav>
        //             <Nav classNameName='mx-3'>
        //                 <Nav.Link href="#action1">All</Nav.Link>
        //                 <Nav.Link href="#action1">About</Nav.Link>
        //             </Nav>
        //         </Navbar.Collapse>
        //     </Container>
        // </Navbar>
//     );
// }

// export default Navigation;