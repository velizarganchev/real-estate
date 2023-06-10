import Link from 'next/link';

import { Card, Row, Col } from "react-bootstrap"

export default function PlacesList({ places }) {
    return (
        <div>
            <Row xs={1} md={2} className="g-4 mt-3">
                {places.map((place) => (
                    <Col key={place._id}>
                        <Card className="h-100">
                            <Link href={`/place/${place._id}`}>
                                <Card.Img variant="top" src={place.images[0].url} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{place.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{place.address}</Card.Subtitle>
                                <Card.Text className="fs-3">$ <strong>{place.pricePerNight}</strong> night</Card.Text>
                                <div className="ratings mt-auto mb-3">
                                    <div className="rating-outer">
                                        <div
                                            className="rating-inner"
                                            style={{ width: `${(place.ratings / 5) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span id="no_of_reviews">({place.numOfReviews} Reviews)</span>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <br></br>
            <br></br>
        </div>
    )
}
