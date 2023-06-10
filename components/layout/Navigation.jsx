import Link from 'next/link';
import Image from 'next/image';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { NavDropdown } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {

  const { data: session, status } = useSession()

  return (
    <Navbar collapseOnSelect bg="light" expand="lg">
      <Container>
        <Link className='navbar-brand' href="/"><Image width={60} height={60} src={'/SierrahScarpineLogo.png'} alt='Logo' /></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Link className='nav-link' href="/sierrahScarpine">Sierrah Scarpin</Link> */}
            {
              status === "loading" ?
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                :
                session ?
                  <NavDropdown title={session.user ?
                    <Image className="rounded-circle" width={26} height={26} alt='avatar' src={session.user.user.avatar.url}></Image>
                    :
                    ''
                  } id="basic-nav-dropdown">
                    {session.user.user.role === 'admin' &&
                      <>
                        <Link className='dropdown-item' href="/admin/places">All Places</Link>
                        <Link className='dropdown-item' href="/admin/bookings">All Bookings</Link>
                        <Link className='dropdown-item' href="/admin/users">All Users</Link>
                        <Link className='dropdown-item' href="/admin/reviews">All Reviews</Link>
                        <hr />
                      </>
                    }
                    <Link className='dropdown-item' href="/me/profile">Profile</Link>
                    <Link className='dropdown-item' href="/bookings/me">My Bookings</Link>
                    <Link className='dropdown-item' href="/  " onClick={() => signOut()}>Logout</Link>
                  </NavDropdown>
                  :
                  <Link className='nav-link' href="/auth/login">Login</Link>
            }
            {/* <Link className='nav-link' href="/contact">Contact Us</Link> */}
            <Link className='nav-link ms-2 rounded-pill text-light bg-dark text-center' id='book_now_btn' href="/places">Book Now</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
