import Loader from '../../../components/layout/Loader';
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import { useGetAllReviewsQuery, useDeleteReviewMutation } from "../../../redux/reviewApiSlice"
import { useState } from "react"

import { Table } from "react-bootstrap"

import { toast } from 'react-toastify'

const AllReviews = () => {

    const [placeId, setPlaceId] = useState('')

    const { data: allReviews, error } = useGetAllReviewsQuery(placeId);

    const [deleteReview, { isLoading }] = useDeleteReviewMutation();

    const deleteReviewHandler = async (id) => {
        if (placeId) {
            deleteReview({ id, placeId })
            if (error) {
                toast.error(error)
            }
        }
    }

    return (
        <>
            <div className='container container-fluid'>
                <div className="row justify-content-center mt-5">
                    <div className="col-5">
                        <form>
                            <div className="form-group">
                                <label htmlFor="roomId_field">Enter Place ID</label>
                                <input
                                    type="email"
                                    id="roomId_field"
                                    className="form-control"
                                    value={placeId}
                                    onChange={(e) => setPlaceId(e.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {allReviews && allReviews.reviews.length !== 0 ?
                <>
                    <h1 className='text-center my-5'>All Reviews</h1>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th >Review ID</th>
                                <th >Rating</th>
                                <th >Comment</th>
                                <th >User</th>
                                <th >Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allReviews.reviews.map((review, index) => (
                                <tr key={index}>
                                    <td>{index}</td>
                                    <td>{review._id}</td>
                                    <td>{review.rating}</td>
                                    <td>{review.comment}</td>
                                    <td>{review.name}</td>
                                    <td className="d-flex">
                                        <button className="btn btn-danger mx-2" onClick={() => deleteReviewHandler(review._id)}>
                                            <i className="fa fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
                :
                <div className="text-center fs-1"> No Reviews</div>
            }
        </>

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
export default AllReviews