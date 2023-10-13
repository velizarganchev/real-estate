import Loader from '../../../components/layout/Loader';
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { toast } from 'react-toastify';

import useSWR, { mutate } from "swr";
import axios from 'axios';

const UpdateUser = () => {

    const [user, setUser] = useState(
        {
            userId: '',
            name: '',
            email: '',
            role: ''
        });
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);

    const router = useRouter();
    const userId = router.query.id;

    const { data, error, isLoading } = useSWR(`/api/admin/users/${userId}`,
        (url) => fetch(url).then((res) => res.json()));

    useEffect(() => {

        if (data) {
            setUser({
                ...user,
                userId: userId,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role
            });
        }
        if (error) {
            toast.error(error);
        }
    }, [data, error]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setIsUpdateLoading(true);
            const response = await axios.put(`/api/admin/users/${userId}`, user);

            if (response.data.success) {
                mutate(`/api/admin/users/${userId}`);
                router.push('/admin/users');
            } else {
                console.error('Update failed:', response);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setIsUpdateLoading(false);
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
                                        value={user.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">Email</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name="email"
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select id="role_field" className="form-control" name="role"
                                        value={user.role}
                                        onChange={handleChange}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-outline-dark btn-lg btn-block mt-3">
                                    {isUpdateLoading ?
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> :
                                        "Update"}
                                </button>
                            </form>
                        </div>
                    </div>
            }
        </div>
    )
}

export async function getServerSideProps({ req, res }) {

    const session = await getServerSession(req, res, authOptions)

    if (!session || session.user.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            session
        }
    }

}

export default UpdateUser