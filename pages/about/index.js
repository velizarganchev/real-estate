import Link from 'next/link';
import Image from 'next/image';

export default function About() {
    return (
        <section id="about" className="about section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-12 col-12 d-flex align-items-center mb-4">
                        <Image src="/images/aboutImg.jpg" alt="" className="img-fluid" width={400} height={300} />
                    </div>
                    <div className="col-lg-8 col-md-12 col-12 ps-lg-2">
                        <div className="about-text">
                            <h2>About Us</h2>
                            <p>
                                We offer a wide range of fully furnished and serviced apartments, condominiums, and houses
                                in various locations. We work with property owners and managers to ensure that our
                                accommodations meet the highest comfort, convenience, and security standards.<br />
                                Our team is committed to providing exceptional customer service and personalized attention
                                to each client. Whether you need a short-term rental for a business trip, a nice getaway,
                                or a long-term housing solution for a corporate relocation, we are here to help you find the
                                perfect accommodation to meet your needs.<br />
                                We also understand the importance of staying connected while you are away from home. That is
                                why we provide high-speed internet, Smart TVs, and other modern amenities to ensure that you
                                can stay connected with your work, family, and friends.<br />
                                We take pride in our attention to detail and strive to make your stay as comfortable and
                                stress-free as possible. From the moment you contact us to the day you check out; we are
                                committed to providing you with exceptional service and support. Thank you for considering
                                us for your housing needs.
                                We look forward to serving you and ensuring that your stay with us is a pleasant and
                                memorable experience.
                            </p>
                            <Link href="/contact" className="btn btn-outline-dark">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
