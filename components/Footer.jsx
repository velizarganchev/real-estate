import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <Link href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                    Sierrah Scarpine
                    </Link>
                    <span className="mb-3 mb-md-0 text-muted">© 2022 Company, Inc</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><Link className="text-muted" href="https://www.facebook.com/sierrah.scarpine/"><i className="fa-brands fa-facebook"></i></Link></li>
                    <li className="ms-3"><Link className="text-muted" href="https://www.instagram.com/sierrahscarpine/"><i className="fa-brands fa-instagram"></i></Link></li>
                    <li className="ms-3"><Link className="text-muted" href="https://www.linkedin.com/in/sierrah-scarpine-113b2b154/"><i className="fa-brands fa-linkedin"></i></Link></li>
                </ul>
            </footer>
        </div>
    )
}
