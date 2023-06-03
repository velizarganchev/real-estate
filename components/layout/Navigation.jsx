import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

import { Button, NavDropdown } from 'react-bootstrap';
import { signOut } from 'next-auth/react';

import Image from 'next/image';

export default function Navigation() {

  const { data: session, status } = useSession()

  const [user, setUser] = useState()

  async function loadUser() {
    return await axios.get('http://localhost:3000/api/me')
  }
  useEffect(() => {
    if (status === "authenticated") {
      loadUser().then(function (result) {
        setUser(result.data.user)
      })
    }

  }, [status]);

  return (
    <Navbar collapseOnSelect bg="light" expand="lg">
      <Container>
        <Link className='navbar-brand' href="/"><Image width={60} height={60} src={'/SierrahScarpineLogo.png'} alt='Logo' /></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* <Link className='nav-link' href="/sierrahScarpine">Sierrah Scarpin</Link> */}
            {user ?
              <NavDropdown title={user ? <Image className="rounded-circle" width={26} height={26} alt='avatar' src={user.avatar.url}></Image> : ''} id="basic-nav-dropdown">
                {user.role === 'admin' &&
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
              </NavDropdown> :
              <Link className='nav-link' href="/auth/login">Login</Link>
            }
            {/* <Link className='nav-link' href="/contact">Contact Us</Link> */}
            <Link className='nav-link border border-dark rounded-pill text-light bg-dark bg-gradient' id='book_now_btn' href="/me/profile">Book Now</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
