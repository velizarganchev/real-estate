import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify';
import Loader from '../../../components/layout/Loader';

import axios from 'axios';

import { useGetUserDetailsQuery } from '../../../redux/userApiSlice';

const UpdateUser = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const router = useRouter()
    const userId = router.query.id;

    const { data, error, isLoading } = useGetUserDetailsQuery(userId);

    useEffect(() => {

        if (data) {
            setName(data.user.name)
            setEmail(data.user.email)
            setRole(data.user.role)
        }
        if (error) {
            toast.error(error);
        }
    }, [data, error])


    async function Update(userId, userData, config) {
        try {
            return await axios.put(`/api/admin/users/${userId}`, userData, config)
        } catch (error) {
            toast.error(error)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        try {

            const userData = {
                name, email, role
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            Update(userId, userData, config).then(function (success) {
                if (success) {
                    router.push('/admin/users')
                }
            })

        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <div className="container container-fluid">
            {
                isLoading ? <Loader /> :
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Update User</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select id="role_field" className="form-control" name="role"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}

                                    >

                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-outline-dark btn-lg btn-block mt-3">
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
            }
        </div>
    )
}

export default UpdateUser