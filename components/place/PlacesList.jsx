import { Fragment } from "react";
import { Row } from "react-bootstrap";

import PlaceItem from "./PlaceItem";

function PlacesList({ places }) {
    return (
        <Fragment>
                <Row xs={1} md={2} className="g-4 mt-3">
                    {places.map((place) => (
                        <PlaceItem key={place._id} place={place} />
                    ))}
                </Row>
        </Fragment>
    )
}
export default PlacesList;