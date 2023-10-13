import { useState } from "react";
import axios from "axios";

import { useRouter } from 'next/router';

function ContactForm() {

    const router = useRouter();

    const [form, setForm] = useState({
        fname: '',
        lname: '',
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

        const data = {
            fullName: form.fname + " " + form.lname,
            email: form.email,
            message: form.message,
        }
        axios.post(`/api/contact/send_email`, data).then((response) => {

            if (response.data.success) {
                router.push('/');
            }
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="row form-outline mb-4">
                <div className="col">
                    <label className="form-label" htmlFor="user_phone">First name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fname"
                        value={form.fname}
                        onChange={handleChange}
                        placeholder="First name"
                        aria-label="First name" />
                </div>
                <div className="col">
                    <label className="form-label" htmlFor="user_phone">Last name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="lname"
                        value={form.lname}
                        onChange={handleChange}
                        placeholder="Last name"
                        aria-label="Last name" />
                </div>
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="email">Email *</label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-control"
                    required />
            </div>

            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="message">Write a message</label>
                <textarea
                    className="form-control"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    required></textarea>
            </div>
            <button type="submit" className="btn btn-outline-dark btn-block mb-4">Submit</button>
        </form>
    )
}
export default ContactForm;