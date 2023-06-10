import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Col, Row, Button, Container } from "react-bootstrap";

import absoluteUrl from "next-absolute-url";
import axios, { all } from "axios";

import PlaceFeatures from '../../components/PlaceFeatures';
import BookingWidget from '../../components/BookingWidget';
import NewReview from '../../components/review/NewReview';
import ListReviews from '../../components/review/ListReviews';

import { useGetAllReviewsQuery } from '../../redux/reviewApiSlice';


export default function PlacePage({ place }) {

    const [ShowAllFotos, setShowAllFotos] = useState(false);

    const { data: allReviews, error, isLoading } = useGetAllReviewsQuery(place._id);

    if (!place) {
        return (
            <div>
                <h2 className="text-center">Plece not found!</h2>
            </div>
        )
    }
    if (ShowAllFotos) {
        return (
            <>
                <Button onClick={() => setShowAllFotos(false)} variant="outline-link" size="sm">
                    ←  Back
                </Button>
                <Container className="bg-light">
                    <Row className="g-1">
                        {place.images.map((i) => (
                            <Col key={i.url} xs={12} md={6} xl={4} >
                                <Image
                                    className="img-fluid h-100" src={i.url} width={500} height={500} alt={place.name}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </>
        )
    }
    return (
        <div className="container pt-4">
            <div className="mb-3">
                <Link className="text-dark" href={"/"}>← back to Home</Link>
            </div>
            <div>
                <div className="position-relative">
                    <h1>{place.name}</h1>
                    <h5>{place.address}</h5>
                    <div className="ratings mt-auto mb-3">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(place.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({place.numOfReviews} Reviews)</span>
                    </div>
                    <Row className="g-sm-1">
                        <Col sm={7}>
                            <Image className="img-fluid h-100 p-1" src={place.images[0].url} alt={place.name} width={800} height={600} />
                        </Col>
                        <Col sm={5} >
                            <div className="d-block">
                                <Image className="img-fluid p-1" src={place.images[1].url} width={500} height={600} alt={place.name} />
                                <Image className="img-fluid p-1" src={place.images[2].url} width={500} height={600} alt={place.name} />
                            </div>

                        </Col>
                    </Row>
                    <div className="m-2 position-absolute bottom-0 end-0">
                        <Button onClick={() => setShowAllFotos(true)} variant="dark"><i className="fa-solid fa-eye"></i> Show all photos</Button>
                    </div>
                </div>
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
                    {allReviews && allReviews.reviews.length > 0 ?
                        <ListReviews reviews={allReviews.reviews} />
                        :
                        <p><b>No Reviews on this place</b></p>
                    }
                </div>
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {

    const id = context.params.id;
    const { origin } = absoluteUrl(context.req)
    const { data } = await axios.get(`${origin}/api/places/${id}`)

    return {
        props: {
            place: JSON.parse(JSON.stringify(data.place))
        }
    }
}