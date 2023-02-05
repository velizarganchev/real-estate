import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router"
import { useState } from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import jsondb from "../../jsondb/places"

export default function Place() {

    const router = useRouter();
    const { url } = router.query;
    const [ShowAllFotos, setShowAllFotos] = useState(false);
    const [showImg, setShowImg] = useState(false);

    const place = jsondb.places.find((p) => p.url === url);

    if (!place) {
        return (
            <div>
                <h2 className="text-center">Plece not found!</h2>
            </div>
        )
    }
    // if (showImg) {
    //     return (
    //         <Container>
    //             <Image></Image>
    //         </Container>
    //     )
    // }
    if (ShowAllFotos) {
        return (
            <>
                <Button onClick={() => setShowAllFotos(false)} variant="outline-link" size="sm">
                    ←  Back
                </Button>
                <Container className="bg-light">
                    <Row className="g-1">
                        {place.images.map((i) => (
                            <Col key={i.toString()} xs={12} md={6} xl={4} >
                                <Image
                                    // onClick={() => setShowImg(true)} 
                                    className="img-fluid h-100" src={i} width={500} height={500} alt={place.title} />
                            </Col>
                        ))}
                    </Row>
                </Container>
            </>
        )
    }

    return (
        <div className="container">
            <div className="mb-3">
                <Link className="text-dark" href={"/"}>← back to Home</Link>
            </div>

            <div>
                <div className="position-relative">
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
                    <div className="m-2 position-absolute bottom-0 end-0">
                        <Button onClick={() => setShowAllFotos(true)} variant="dark"><i className="fa-solid fa-eye"></i> Show all photos</Button>
                    </div>
                </div>
                <div className="row">
                    <div className="col col-lg-8 col-sm-12">
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <h4>{place.title}</h4>
                                <ul className="d-flex">
                                    <li className="mx-5">{place.maxGuests} guests</li>
                                    <li className="mx-5">{place.beds} beds</li>
                                </ul>
                            </li>
                            <li className="list-group-item">
                                <h6>Description</h6>
                                <p>{place.description}</p>
                            </li>
                            <li className="list-group-item">
                                <h6 className="mb-4">This is what this accommodation offers you</h6>
                                <ul className="d-sm-flex list-unstyled">
                                    {place.amenities.map((a) => (
                                        <li className="px-2" key={Object.keys(a)}>{Object.values(a)} - {Object.keys(a)}</li>
                                    ))}
                                </ul>
                            </li>
                            <li className="list-group-item">
                                <h6>What you should know</h6>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Check-in after {place.checkIn} PM</li>
                                    <li className="list-group-item">Checkout before {place.checkOut} AM</li>
                                    <li className="list-group-item">Maximum {place.maxGuests} guests</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="col col-lg-4 col-sm-12 shadow p-3 my-5 bg-body rounded" style={{ height: "400px" }}>
                        <div className="mt-3">
                            <div className="d-flex justify-content-between">
                                <span className="text-uppercase p-2">Add dates for prices</span>
                                <span className="p-2"><i className="fa-solid fa-star"></i> 5.0-12 revies</span>
                            </div>
                            <div className="input-group mb-0 input-group-lg my-3">
                                <input type="date" className="form-control border-bottom-0" style={{ borderBottomLeftRadius: "unset" }} />
                                <input type="date" className="form-control border-bottom-0" style={{ borderBottomRightRadius: "unset" }} />
                            </div>
                            <div className="form-floating">
                                <select className="form-select" id="floatingSelectGrid" style={{ borderTopLeftRadius: "unset", borderTopRightRadius: "unset" }}>
                                    <option defaultValue={"1"}>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <label htmlFor="floatingSelectGrid">Works with selects</label>
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                <button className="btn btn-primary btn-lg" type="button">Button</button>
                            </div>
                            <div className="mt-4">
                                <p className="">Enter your travel dates to see the total price per night.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </div>

    )
}
