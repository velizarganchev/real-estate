import ButtonLoader from '../../../components/layout/ButtonLoader';

import { useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import { toast } from 'react-toastify'

export default function ResetPassword() {

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            const userData = { password, confirmPassword }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            setLoading(true);

            const { data } = await axios.put(`/api/password/reset/${router.query.token}`, userData, config)

            setLoading(false);

            if (data.success) {
                router.push('/auth/login')
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
                    <div className="col-md-12">
                        <div className="section-header text-center pb-5">
                            <h2>New Password</h2>
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
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder='Password' />
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            id="confirm_password_field"
                                            className="form-control"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder='Confirm Password' />
                                    </div>
                                </div>
                                <button
                                    id="new-password-button"
                                    type="submit"
                                    className="btn btn-outline-dark btn-lg btn-block mt-3"
                                    disabled={loading ? true : false}
                                >{loading ? <ButtonLoader /> : 'Set Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

