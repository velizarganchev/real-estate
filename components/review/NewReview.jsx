import { useEffect, useState } from 'react'

import { useRouter } from 'next/router';

import axios from 'axios';
import useSWR, { mutate } from "swr";

export default function NewReview() {

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [origin, setOrigin] = useState('');

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const { origin } = window.location;
        setOrigin(origin);
    }, []);

    const { data, error } = useSWR(`/api/reviews/check_review_availability?placeId=${id}`,
        (url) => fetch(url).then((res) => res.json())
    );

    const submitHandler = async () => {

        const reviewData = {
            rating, comment, placeId: id
        }

        axios.put(`${origin}/api/reviews`, reviewData).then((response) => {
            if (response.data.success) {
                mutate(`/api/reviews?id=${id}`);
            }
        });
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
        <div className='d-grid gap-2 mt-2 mb-4'>
            {data && data.isReviewAvailable &&
                <button onClick={setUserRatings} type="button" className='btn btn-outline-dark btn-lg btn-block p-2' data-bs-toggle="modal" data-bs-target="#exampleModal">
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
        </div>
    )
}


