import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"
import { Col, Row, Button } from "react-bootstrap";
import jsondb from "../../jsondb/places"

export default function Place() {

    const router = useRouter();
    const { url } = router.query;

    const place = jsondb.places.find((p) => p.url === url);

    if (!place) {
        return (
            <div>
                <h2 className="text-center">Plece not found!</h2>
            </div>
        )
    }
    return (
        <div className="container">
            <div className="mb-3">
                <Link className="text-dark" href={"/"}>← back to Home</Link>
            </div>
            <div>
                <h1>{place.title}</h1>
                <h5>{place.address}</h5>
                {/* <div className="row row-cols-2 mt-2">
                    <Image className="rounded-3 img-fluid" src={place.images[1]} alt={place.title} width={600} height={600}/>
                </div> */}
                <Row className="g-1">
                    <Col sm={7}>
                        <Image className="img-fluid h-100" src={place.images[1]} alt={place.title} width={800} height={600} />
                    </Col>
                    <Col sm={5} >
                        <div className="d-block">
                            <Image className="img-fluid" src={place.images[0]} width={500} height={600} alt={place.title} />
                            <Image className="img-fluid" src={place.images[2]} width={500} height={600} alt={place.title} />
                        </div>

                    </Col>
                </Row>
            </div>
            <div><Button variant="outline-dark"><i class="fa-solid fa-eye"></i> Show all photos</Button></div>
            <br></br>
            <br></br>
        </div>

    )
}
