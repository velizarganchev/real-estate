import { useState } from "react";

import Loader from "../../../components/layout/Loader";
import Link from "next/link";

import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import useSWR, { mutate } from "swr";
import axios from "axios";

import { Table } from "react-bootstrap"
import { toast } from "react-toastify";

const AllUsers = () => {
    const [isDeleteUserLoading, setIsDeleteUserLoading] = useState(false);

    const { data: allUsers, error, isLoading } = useSWR(`/api/admin/users`,
        (url) => fetch(url).then((res) => res.json()));

    const deleteUserHandler = async (userId) => {
        try {
            if (!userId) {
                return;
            }

            setIsDeleteUserLoading(true);

            const response = await axios.delete(`/api/admin/users/${userId}`);
            
            if (response.data.success) {
                setIsDeleteUserLoading(false);
                mutate(`/api/admin/users`);
            }
        } catch (error) {
            console.log(error);
            toast.error('Error deleting User:', error)
            setIsDeleteUserLoading(false);
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
                                            <td className="d-flex">
                                                <Link className="btn btn-primary" href={`/admin/users/${user._id}`}>
                                                    <i className="fa fa-pencil"></i>
                                                </Link>
                                                {/* <button className="btn btn-danger mx-2" onClick={() => deleteUserHandler(user._id)}>
                                                    <i className="fa fa-trash"></i>
                                                </button> */}
                                                <button
                                                    type="button"
                                                    className="btn btn-danger mx-2"
                                                    data-bs-toggle="modal"
                                                    data-bs-target={`#u${user._id}`}>
                                                    {isDeleteUserLoading
                                                        ?
                                                        <div className="spinner-border spinner-border-sm" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div> :
                                                        <i className="fa fa-trash"></i>}
                                                </button>
                                                <div className="modal fade" id={"u" + user._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete {user._id}!</h1>
                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-dark" data-bs-dismiss="modal">
                                                                    Close
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-outline-danger mx-2"
                                                                    onClick={() => deleteUserHandler(user._id)}
                                                                    data-bs-dismiss="modal">
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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
export default AllUsers