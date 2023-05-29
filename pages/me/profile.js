import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import axios from "axios"

import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { toast } from 'react-toastify'

export default function Profile() {
    const router = useRouter();

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    const { name, email, password } = user

    const [avatar, setAvatar] = useState('');
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');

    async function LoadUser() {
        try {
            return await axios.get('http://localhost:3000/api/me')
        } catch (error) {
            toast.error(error)

        }
    }

    async function Update(userData, config) {
        try {
            return await axios.put('http://localhost:3000/api/me/update', userData, config)
        } catch (error) {
            toast.error(error)

        }
    }


    useEffect(() => {
        LoadUser().then(function (result) {
            const data = result.data
            if (data.success) {
                setUser({
                    name: data.user.name,
                    email: data.user.email
                })
                setAvatarPreview(data.user.avatar.url)
            }
        })
    }, []);


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const userData = { name, email, password, avatar }
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            Update(userData, config).then(function (success) {
                if (success) {
                    router.push('/')
                }
            })
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
                    <div className="col-md-12">
                        <div className="section-header text-center pb-5">
                            <h2>Update Profile</h2>
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
                                            id="name_field"
                                            className="form-control"
                                            name='name'
                                            defaultValue={name}
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
                                            defaultValue={email}
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
                                            defaultValue={password}
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
                                >UPDATE</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export async function getServerSideProps(context) {
    return {
        props: {
            session: await getServerSession(context.req, context.res, authOptions)
        }
    }
}