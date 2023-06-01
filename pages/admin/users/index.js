import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import { useGetAllUsersQuery } from "../../../redux/userApiSlice"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

import Link from "next/link"
import { Table } from "react-bootstrap"

import axios from "axios"
import { toast } from 'react-toastify'
import Loader from "../../../components/layout/Loader"

const AllUsers = () => {

    const router = useRouter()

    const { data: allUsers, error, isLoading } = useGetAllUsersQuery();

    const deleteUserHandler = async (userId) => {
        try {
            try {
                const { data } = await axios.delete(`/api/admin/users/${userId}`)

                if (data.success) {
                    router.push('/admin/users')
                    toast.success(`User ${data.user.name} is deleted.`)
                }

            } catch (error) {
                toast.error(error)

            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='container container-fluid'>
            {
                isLoading ? <Loader /> :
                    <>
                        <h1 className='text-center my-5'>All Users</h1>
                        {allUsers && allUsers.users.length !== 0 ?
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >User ID</th>
                                        <th >Name</th>
                                        <th >Email</th>
                                        <th >Role</th>
                                        <th >Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index}</td>
                                            <td>{user._id}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                <Link className="btn btn-primary" href={`/admin/users/${user._id}`}>
                                                    <i className="fa fa-pencil"></i>
                                                </Link>
                                                <button className="btn btn-danger mx-2" onClick={() => deleteUserHandler(user._id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table> :
                            <div className="text-center fs-1"> No Bookings</div>
                        }
                    </>
            }
        </div >


    )
}

export async function getServerSideProps({ req, res }) {

    const session = await getServerSession(req, res, authOptions)

    if (!session || session.user._doc.role !== 'admin') {
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    return {
        props: {
        }
    }

}
export default AllUsers