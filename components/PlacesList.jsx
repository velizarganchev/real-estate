import { Card, Row, Col } from "react-bootstrap"
import Link from "next/link"

export default function PlacesList({ places }) {
    return (
        <div>
            <div className="section-header text-center pb-5">
                <h1>Our Places</h1>
            </div>
            <Row xs={1} md={2} className="g-4 mt-3">
                {places.map((place) => (
                    <Col key={place._id}>
                        <Card className="h-100">
                            <Link href={`/place/${place._id}`}>
                                <Card.Img variant="top" src={place.images[0]} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{place.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{place.address}</Card.Subtitle>
                                <Card.Text>$ <strong>{place.pricePerNight}</strong> night</Card.Text>
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
