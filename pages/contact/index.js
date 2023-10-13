import { useState } from "react";
import axios from "axios";

import { useRouter } from 'next/router';

export default function Contact() {

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
        <div id="contact" className="contact section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header text-center pb-5">
                            <h2>Contact Us</h2>
                            <p>today to learn more about how we can help you find <br /> the perfect housing solution for your needs!
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-12 p-0 pt-4 p-4 pb-4">
                        <form onSubmit={submitHandler} className="bg-light p-4 m-auto">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={form.fullName}
                                            onChange={handleChange}
                                            className="form-control"
                                            required placeholder="Your Full name" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            className="form-control"
                                            required placeholder="Your Email address" />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            rows="3"
                                            required
                                            className="form-control"
                                            placeholder="Your Query Here"></textarea>
                                    </div>
                                </div>
                                <button className="btn btn-outline-dark btn-lg btn-block mt-3">Send Now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
