export default function PlaceFeatures({ place }) {
    return (
        <>
            <h6 className="mb-4">This is what this accommodation offers you</h6>
            <ul className="list-inline">
                <li className="list-inline-item ms-2"><i className="fa-solid fa-utensils"></i> - Kitchen -
                    <i
                        className={place.kitchen ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
                <li className="list-inline-item ms-2"><i className="fa-solid fa-wifi"></i> - Wifi -
                    <i
                        className={place.internet ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
                <li className="list-inline-item ms-2"><i className="fa-solid fa-square-parking"></i> - Parking -
                    <i
                        className={place.parking ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
                <li className="list-inline-item ms-2"><i className="fa-solid fa-tv"></i> - TV -
                    <i
                        className={place.entertainment ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
                <li className="list-inline-item ms-2"><i className="fa-solid fa-fan"></i> - Air conditioning -
                    <i
                        className={place.airConditioned ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
                <li className="list-inline-item ms-2"><i className="fa-solid fa-paw"></i> - Pets Allowed -
                    <i
                        className={place.petsAllowed ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
                <li className="list-inline-item ms-2"><i className="fa-solid fa-soap"></i> - Washer -
                    <i
                        className={place.washer ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
                <li className="list-inline-item ms-2"><i className="fa-solid fa-temperature-high"></i> - Dryer -
                    <i
                        className={place.dryer ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
                <li className="list-inline-item ms-2"><i className="fa-solid fa-snowflake"></i> - Refrigerator -
                    <i
                        className={place.refrigerator ? 'fa fa-check text-success ms-1' : 'fa fa-times text-danger ms-1'}
                        aria-hidden="true"
                    ></i></li>
            </ul>
        </>
    )
}
