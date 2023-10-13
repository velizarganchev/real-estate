import Image from "next/image";
import { Col } from "react-bootstrap";

function ImageItem({ image, name }) {
    return (
        <Col xs={12} md={6} xl={4} >
            <Image
                className="img-fluid h-100" src={image.url} width={500} height={500} alt={name}
            />
        </Col>
    )
}
export default ImageItem;