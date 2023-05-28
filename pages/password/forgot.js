import React, { useState, useEffect } from 'react'
import Link from 'next/link'

import axios from 'axios'

import { toast } from 'react-toastify'
import ButtonLoader from '../../components/layout/ButtonLoader'

export default function ForgotPassword() {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const userData = { email }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            setLoading(true);

            const { data } = await axios.post('/api/password/forgot', userData, config)

            setLoading(false);
            if (data.success) {
                toast.success(data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message)
            setLoading(false);
        }
    }

    return (
        <div id="contact" className="contact section-padding">
            <div className="container">
                <div className="row">
                    <div className="mb-3">
                        <Link className="text-dark" href={"/auth/login"}>← back to Login</Link>
                    </div>
                    <div className="col-md-12">
                        <div className="section-header text-center pb-5">
                            <h2>Forgot Password</h2>
                        </div>
                    </div>
                </div>
                <div className="row m-0">
                    <div className="col-md-8 m-auto p-0 pt-4 p-4 pb-4">
                        <form onSubmit={submitHandler} className="bg-light p-4 m-auto">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            id="    "
                                            className="form-control"
                                            value={email}
                                            placeholder='Email'
                                            onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <button
                                    id="forgot-password-button"
                                    type="submit"
                                    className="btn btn-outline-dark btn-lg btn-block mt-3"
                                    disabled={loading ? true : false}
                                >{loading ? <ButtonLoader /> : 'Send Email'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

