import { Card, Row, Col } from "react-bootstrap"
import Link from "next/link"
import { useSelector } from "react-redux"

export default function PlacesList() {

    const { allPlaces } = useSelector(state => state)
    const places = allPlaces.places
    //console.log(allPlaces.places)
    return (
        <div>
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
