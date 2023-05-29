import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { toast } from 'react-toastify'
import ButtonLoader from '../../components/layout/ButtonLoader'
import Link from 'next/link'

const Register = () => {

    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
    const [loading, setLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email, password, avatar }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            setLoading(true);

            const { data } = await axios.post('/api/auth/register', userData, config)

            setLoading(false);

            if (data.success) {
                router.push('/auth/login') 
            }

        } catch (error) {
            toast.error(error)
        }
    }

    const onChange = (e) => {

        if (e.target.name === 'avatar') {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatar(reader.result);
                    setAvatarPreview(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0])

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
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
                            <h2>Register</h2>
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
                                            type="text"
                                            id="name_field"
                                            className="form-control"
                                            name='name'
                                            value={name}
                                            onChange={onChange}
                                            placeholder='Full Name'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <input
                                            type="email"
                                            id="email_field"
                                            className="form-control"
                                            name='email'
                                            value={email}
                                            onChange={onChange}
                                            placeholder='Email'
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-3">
                                        <input
                                            type="password"
                                            id="password_field"
                                            className="form-control"
                                            name='password'
                                            value={password}
                                            onChange={onChange}
                                            placeholder='Password'
                                        />
                                    </div>
                                </div>
                                <div className='form-group text-center'>
                                    <label htmlFor='avatar_upload'>Avatar</label>
                                    <div className='d-flex align-items-center justify-content-center'>
                                        <div>
                                            <figure className='avatar mr-3 item-rtl'>
                                                <img
                                                    src={avatarPreview}
                                                    className='rounded-circle'
                                                    alt='image'
                                                />
                                            </figure>
                                        </div>
                                        <div>
                                            <input
                                                type='file'
                                                name='avatar'
                                                className='form-control'
                                                id='customFile'
                                                accept='images/*'
                                                onChange={onChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    id="login_button"
                                    type="submit"
                                    className="btn btn-outline-dark btn-lg btn-block mt-3"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <ButtonLoader /> : 'REGISTER'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register