import React, { useState } from 'react'
import Link from 'next/link'
import router from 'next/router'

import { signIn } from 'next-auth/react'

import { toast } from 'react-toastify'

import ButtonLoader from '../../components/layout/ButtonLoader'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            email: email,
            password: password,
            redirect: false,

        })

        if (result.error) {
            toast.error(result.error);
        } else {
            router.push('/')
        }

    }
    return (
        <div id="contact" className="contact section-padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-header text-center pb-5">
                            <h2>Login</h2>
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
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            placeholder='Password'
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Link href="/password/forgot" className="float-right mb-4">Forgot Password?</Link>

                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-outline-dark btn-lg btn-block mt-3"
                                    disabled={loading ? true : false}
                                >{loading ? <ButtonLoader /> : 'LOGIN'}
                                </button>
                                <Link href="/auth/register" className="float-right mt-3">New User?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login