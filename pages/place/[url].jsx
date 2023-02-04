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
                    <Button variant="dark"><i className="fa-solid fa-eye"></i> Show all photos</Button>
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
                            <h6>This is what this accommodation offers you</h6>
                            <ul class="d-sm-flex list-unstyled">
                                {place.amenities.map((a, index) => (
                                    <li className="px-2" key={index}>{Object.values(a)} - {Object.keys(a)}</li>
                                ))}
                            </ul>
                        </li>
                        <li className="list-group-item">
                            <h6>What you should know</h6>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Check-in after {place.checkIn} PM</li>
                                <li class="list-group-item">Checkout before {place.checkOut} AM</li>
                                <li class="list-group-item">Maximum {place.maxGuests} guests</li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="col col-lg-4 col-sm-12 shadow p-3 my-5 bg-body rounded" style={{ height: "350px" }}>
                    <div className="mt-3">
                        <div className="d-flex justify-content-between">
                            <span className="text-uppercase p-2">Add dates for prices</span>
                            <span className="p-2"><i class="fa-solid fa-star"></i> 5.0-12 revies</span>
                        </div>
                        <div class="input-group mb-0 input-group-lg my-3">
                            <input type="date" class="form-control border-bottom-0" style={{ borderBottomLeftRadius: "unset" }} />
                            <input type="date" class="form-control border-bottom-0" style={{ borderBottomRightRadius: "unset" }} />
                        </div>
                        <div class="form-floating">
                            <select class="form-select" id="floatingSelectGrid" style={{ borderTopLeftRadius: "unset", borderTopRightRadius: "unset" }}>
                                <option selected>Open this select menu</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <label for="floatingSelectGrid">Works with selects</label>
                        </div>
                        <div className="d-grid gap-2 mt-5">
                            <button class="btn btn-primary btn-lg" type="button">Button</button>
                        </div>
                        <div className="mt-4">
                            <p className="">Enter your travel dates to see the total price per night.</p>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </div>

    )
}
