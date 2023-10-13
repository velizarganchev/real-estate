import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]"

import useSWR, { mutate } from "swr";

import { useState } from "react"
import axios from 'axios';

import { Table } from "react-bootstrap"
import { toast } from 'react-toastify'

const AllReviews = () => {

    const [placeId, setPlaceId] = useState('')
    const [isDeleteReviewLoading, setIsDeleteReviewLoading] = useState(false);

    const { data: allReviews, error } = useSWR(`/api/reviews?id=${placeId}`,
        (url) => fetch(url).then((res) => res.json()));

    const deleteReviewHandler = async (reviewId, placeId) => {
        try {
            if (!placeId) {
                return;
            }

            setIsDeleteReviewLoading(true);

            const response = await axios.delete(`/api/reviews?id=${reviewId}&placeId=${placeId}`);

            if (response.data.success) {
                setIsDeleteReviewLoading(false);
                mutate(`/api/reviews?id=${placeId}`);
            }
        } catch (error) {
            toast.error('Error deleting review:', error)
            setIsDeleteReviewLoading(false);
        }
    };

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
            {allReviews && allReviews.success && allReviews.reviews.length !== 0 ?
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
                                        <button
                                            type="button"
                                            className="btn btn-danger mx-2"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#r${review._id}`}>
                                            {isDeleteReviewLoading
                                                ?
                                                <div className="spinner-border spinner-border-sm" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div> :
                                                <i className="fa fa-trash"></i>}
                                        </button>
                                        <div className="modal fade" id={"r" + review._id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to delete {review._id}!</h1>
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
                                                            onClick={() => deleteReviewHandler(review._id, placeId)}
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