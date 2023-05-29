import React, { useState } from 'react'

import { useRouter } from 'next/router';

import { useCheckAvailabilityQuery } from '../../redux/reviewApiSlice';

import { toast } from 'react-toastify'
import axios from 'axios';

export default function NewReview() {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [show, setShow] = useState(false);

    const router = useRouter();
    const { id } = router.query;

    const { data: reviewAvailable, error, isLoading } = useCheckAvailabilityQuery(id)

    const submitHandler = async () => {
        try {
            const reviewData = {
                rating, comment, placeId: id
            }

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.put('/api/reviews', reviewData, config)

            if (data.success) {
                toast.success('Review is posted.')
            }

        } catch (error) {
            toast.error(error)
        }
    }

    function setUserRatings() {

        const stars = document.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.starValue = index + 1;

            ['click', 'mouseover', 'mouseout'].forEach(function (e) {
                star.addEventListener(e, showRatings)
            })
        })

        function showRatings(e) {
            stars.forEach((star, index) => {
                if (e.type === 'click') {
                    if (index < this.starValue) {
                        star.classList.add('black')

                        setRating(this.starValue)
                    } else {
                        star.classList.remove('black')
                    }

                }

                if (e.type === 'mouseover') {
                    if (index < this.starValue) {
                        star.classList.add('light-black')

                    } else {
                        star.classList.remove('light-black')
                    }

                }

                if (e.type === 'mouseout') {
                    star.classList.remove('light-black')
                }
            })
        }
    }

    return (
        <>
            {isLoading ? '' :
                reviewAvailable.isReviewAvailable &&
                <button onClick={setUserRatings} type="button" className='btn btn-outline-dark btn-lg btn-block m-2' data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Submit Your Review
                </button>
            }
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Submit Review</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="stars">
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                                <li className="star"><i className="fa fa-star"></i></li>
                            </ul>

                            <textarea name="review" id="review" className="form-control mt-3"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>

                            <button
                                className="btn btn-outline-dark my-3 float-right  px-4 "
                                data-dismiss="modal"
                                aria-label="Close"
                                data-bs-dismiss="modal"
                                onClick={submitHandler}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
