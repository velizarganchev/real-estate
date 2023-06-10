import Link from 'next/link';
import Image from 'next/image';
import { Navbar, Nav } from 'react-bootstrap'

export default function Footer() {

    const year = new Date().getFullYear()

    return (
        <footer className="text-center text-lg-start  bg-dark text-muted">
            <div className="container text-center text-md-start mt-5">
                <div className="row mt-3 p-4">
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                        <h6 className="text-uppercase fw-bold mb-4 text-light">Contact</h6>
                        <p className='text-light'>
                            <i className="fas fa-envelope me-3"></i>
                            info@example.com
                        </p>
                        <p className='text-light'><i className="fas fa-phone me-3"></i> + 01 234 567 88</p>
                        <Link className="me-2 text-light " style={{ fontSize: '20px' }} href="https://www.facebook.com/sierrah.scarpine/"><i className="fa-brands fa-facebook"></i></Link>
                        <Link className="mx-2 text-light" style={{ fontSize: '20px' }} href="https://www.instagram.com/sierrahscarpine/"><i className="fa-brands fa-instagram"></i></Link>
                        <Link className="mx-2 text-light" style={{ fontSize: '20px' }} href="https://www.linkedin.com/in/sierrah-scarpine-113b2b154/"><i className="fa-brands fa-linkedin"></i></Link>

                    </div>
                    <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                        <h6 className="text-uppercase text-light fw-bold mb-4">
                            We Accept
                        </h6>
                        <div className="credit-cards">
                            <Image className='mx-1 bg-light' width={25} height={25} alt='card_american_express' src="https://shoplineimg.com/assets/footer/card_amex.png" />
                            <Image className='mx-1 bg-light' width={25} height={25} alt='card_visa' src="https://shoplineimg.com/assets/footer/card_visa.png" />
                            <Image className='mx-1 bg-light' width={25} height={25} alt='card_master' src="https://shoplineimg.com/assets/footer/card_master.png" />
                            <Image className='mx-1 bg-light' width={25} height={25} alt='card_paypal' src="https://shoplineimg.com/assets/footer/card_paypal.png" />
                        </div>
                    </div>
                </div>
            </div>
            <Navbar className="justify-content-center " bg="dark" expand="lg">
                <Nav className="justify-content-center" variant="tabs">
                    <Link className='nav-link text-light' href="/">Home</Link>
                    <Link className='nav-link text-light' href="/places">Apartments & Homes</Link>
                </Nav>
            </Navbar>
            <div className="text-center text-light p-4">
                © {year} Copyright by Sierrah Scarpine
            </div>
        </footer>
    )
}
