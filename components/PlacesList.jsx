import { Card, Row, Col } from "react-bootstrap"
import Link from "next/link"

export default function PlacesList({ places }) {

    return (
        <div>
            <Row xs={1} md={3} className="g-4 mt-3">
                {places.map((place) => (
                    <Col key={place.url}>
                        <Card className="h-100">
                            <Link href={`/place/${place.url}`}>
                                <Card.Img variant="top" src={place.images[0]} />
                            </Link>
                            <Card.Body>
                                <Card.Title>{place.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{place.address}</Card.Subtitle>
                                <Card.Text>$ <strong>{place.price}</strong> night</Card.Text>
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
