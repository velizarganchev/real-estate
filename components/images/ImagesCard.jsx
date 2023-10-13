import { Row } from "react-bootstrap";
import ImageItem from "./ImageItem";

function ImagesCard({ images, placeName }) {
    return (
        <Row className="g-1">
            {images.map((image) => (
                <ImageItem key={image.url} image={image} name={placeName} />
            ))}
        </Row>
    )
}
export default ImagesCard