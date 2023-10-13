import { useEffect, useState } from "react";
import useSWR from "swr";

import PlaceFeatures from "../place/PlaceFeatures";
import BookingWidget from "../BookingWidget";
import NewReview from "../review/NewReview";
import ListReviews from "../review/ListReviews";
import ContactAgent from "../../components/contactAgent/ContactAgent";

function PlaceContent({ place, initialReviews }) {

    const [reviews, setReviews] = useState(initialReviews.reviews);

    const { data, error } = useSWR(`/api/reviews?id=${place._id}`,
        (url) => fetch(url).then((res) => res.json()));

    useEffect(() => {
        if (data) {
            setReviews(data.reviews)
        }
    }, [data])

    return (
        <div className="row">
            <div className="col col-lg-8 col-sm-12">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <h4>{place.name}</h4>
                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item">{place.guestCapacity} guests</li>
                            <li className="list-group-item">{place.numOfBeds} beds</li>
                        </ul>
                    </li>
                    <li className="list-group-item">
                        <h6>Description</h6>
                        <p>{place.description}</p>
                    </li>
                    <li className="list-group-item">
                        <PlaceFeatures place={place} />
                    </li>
                    <li className="list-group-item">
                        <h6>What you should know</h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">Check-in after {place.checkIn} PM</li>
                            <li className="list-group-item">Checkout before {place.checkOut} AM</li>
                            <li className="list-group-item">Maximum {place.guestCapacity} guests</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <BookingWidget place={place} />
            <NewReview />
            {reviews && reviews.length > 0 ?
                <ListReviews reviews={reviews} />
                :
                <p><b>No Reviews on this place</b></p>
            }
            <ContactAgent />
        </div>
    )
}
export default PlaceContent;