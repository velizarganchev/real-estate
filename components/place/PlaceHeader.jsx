import Image from "next/image";
import { Col, Row, Button, Container } from "react-bootstrap";


function PlaceHeader(props) {

    const place = props.place;

    return (
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
                <Button onClick={props.OnShow} variant="dark"><i className="fa-solid fa-eye"></i> Show all photos</Button>
            </div>
        </div>
    )
}
export default PlaceHeader;