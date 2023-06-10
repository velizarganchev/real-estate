import Loader from '../../../components/layout/Loader';
import Link from 'next/link';
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import { useGetAllAdminUsersQuery, useDeleteAdminUserMutation } from "../../../redux/adminApiSlice"

import { useRouter } from "next/router"

import { Table } from "react-bootstrap"

const AllUsers = () => {

    const router = useRouter()

    const { data: allUsers, error, isLoading } = useGetAllAdminUsersQuery();
    const [deleteAdminUser, { isLoading: isDeleteUserLoading }] = useDeleteAdminUserMutation();

    const deleteUserHandler = (userId) => {

        deleteAdminUser(userId).then(function (res) {
            if (res.data.success) {
                router.push('/admin/users')
            }
        })
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