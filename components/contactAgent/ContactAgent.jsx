import { useState } from "react";
import axios from "axios";

import { useRouter } from 'next/router';

import classes from "./ContactAgent.module.css";
import Link from "next/link";

function ContactAgent() {

    const router = useRouter();

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        message: '',
    });

    function handleChange(e) {
        setForm((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    };

    function submitHandler(e) {
        e.preventDefault();

        axios.post(`/api/contact/send_email`, form).then((response) => {

            if (response.data.success) {
                router.push('/');
            }
        });
    };

    return (
        <section className="property-single">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className={`row ${classes.section_t3}`}>
                            <div className="col-sm-12">
                                <div className={classes.title_box_d}>
                                    <h2 className={classes.title_d}>Contact Agent</h2>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">
                                <img src="/images/sierrahScarpin.jpg" alt="" className="img-fluid" />
                            </div>
                            <div className="col-md-6 col-lg-4">
                                <div className={classes.property_agent}>
                                    <h4 className={classes.title_agent}>Sierrah Scarpine</h4>
                                    <p>
                                        Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                                        dui. Quisque velit nisi,
                                        pretium ut lacinia in, elementum id enim.
                                    </p>
                                    <ul className="list-unstyled">
                                        <li className="d-flex justify-content-between">
                                            <strong>Phone:</strong>
                                            <span>+ 714-858-0201</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong>Mobile:</strong>
                                            <span>+ 714-858-0201</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong>Email:</strong>
                                            <span>sierrah.scarpine@aspectrep.com</span>
                                        </li>
                                        <li className="d-flex justify-content-between">
                                            <strong>Skype:</strong>
                                            <span>sierrah.scarpine</span>
                                        </li>
                                    </ul>
                                    <div className="socials-a">
                                        <ul className="list-inline">
                                            <li className="list-inline-item">
                                                <Link className="text-dark" style={{ fontSize: '30px', }} href="https://www.facebook.com/sierrah.scarpine/"><i className="fa-brands fa-facebook"></i></Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link className="text-dark " style={{ fontSize: '30px' }} href="https://www.instagram.com/sierrahscarpine/"><i className="fa-brands fa-instagram"></i></Link>
                                            </li>
                                            <li className="list-inline-item">
                                                <Link className="text-dark " style={{ fontSize: '30px' }} href="https://www.linkedin.com/in/sierrah-scarpine-113b2b154/"><i className="fa-brands fa-linkedin"></i></Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 col-lg-4">
                                <div className="property-contact">
                                    <form className={classes.form_a} onSubmit={submitHandler} >
                                        <div className="row">
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="fullName"
                                                        value={form.fullName}
                                                        onChange={handleChange}
                                                        className="form-control form-control-lg form-control-a"
                                                        id="inputName"
                                                        placeholder="Full name *"
                                                        required />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={form.email}
                                                        onChange={handleChange}
                                                        className="form-control form-control-lg form-control-a"
                                                        id="inputEmail1"
                                                        placeholder="Email *"
                                                        required />
                                                </div>
                                            </div>
                                            <div className="col-md-12 mb-2">
                                                <div className="form-group">
                                                    <textarea
                                                        id="textMessage"
                                                        name="message"
                                                        value={form.message}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="Message *"
                                                        cols="45"
                                                        rows="8"
                                                        required></textarea>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <button type="submit" className="btn btn-outline-dark">Send Message</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactAgent;